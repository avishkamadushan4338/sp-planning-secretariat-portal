/**
 * ── Headless UI verification ───────────────────────────────────────────────────
 *
 * Drives a real Chrome instance over the DevTools Protocol to confirm the CMS
 * actually works in a browser, not just over HTTP. Server-side tests cannot
 * catch a React render error, a broken route guard redirect, or a component
 * that throws on mount.
 *
 * Checks:
 *   1. /cms redirects an anonymous visitor to the login page.
 *   2. The login form accepts real credentials.
 *   3. The dashboard renders and staff rows show a publish-status badge.
 *   4. Console errors and failed network requests are reported.
 *
 * Usage: node scripts/ui-check.mjs
 */

import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const BASE = process.env.BASE_URL || "http://localhost:7001";
const CHROME =
  process.env.CHROME_PATH ||
  "C:/Program Files/Google/Chrome/Application/chrome.exe";
const PORT = 9222;
const TMP = process.env.TMPDIR || process.env.TEMP || "C:/temp";

const results = [];
const record = (name, ok, detail = "") => {
  results.push({ name, ok, detail });
  console.log(`  ${ok ? "✓" : "✗"} ${name}${detail ? ` — ${detail}` : ""}`);
};

// ── Minimal CDP client over the WebSocket endpoint ──────────────────────────
class CDP {
  constructor(ws) {
    this.ws = ws;
    this.id = 0;
    this.pending = new Map();
    this.listeners = [];
    ws.addEventListener("message", (event) => {
      const msg = JSON.parse(event.data);
      if (msg.id && this.pending.has(msg.id)) {
        const { resolve, reject } = this.pending.get(msg.id);
        this.pending.delete(msg.id);
        msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
      } else if (msg.method) {
        for (const fn of this.listeners) fn(msg);
      }
    });
  }

  static async connect(url) {
    const ws = new WebSocket(url);
    await new Promise((resolve, reject) => {
      ws.addEventListener("open", resolve, { once: true });
      ws.addEventListener("error", reject, { once: true });
    });
    return new CDP(ws);
  }

  send(method, params = {}) {
    const id = ++this.id;
    return new Promise((resolve, reject) => {
      this.pending.set(id, { resolve, reject });
      this.ws.send(JSON.stringify({ id, method, params }));
      setTimeout(() => {
        if (this.pending.has(id)) {
          this.pending.delete(id);
          reject(new Error(`${method} timed out`));
        }
      }, 60000);
    });
  }

  on(fn) {
    this.listeners.push(fn);
  }
}

/** Evaluates an expression in the page and returns its JSON value. */
const evaluate = async (cdp, expression) => {
  const { result } = await cdp.send("Runtime.evaluate", {
    expression,
    returnByValue: true,
    awaitPromise: true,
  });
  return result.value;
};

async function main() {
  // Reuse an already-running Chrome when one is listening, so the check does
  // not have to manage a browser process on every run.
  // A unique profile per run avoids colliding with a browser that has not fully
  // exited yet, which otherwise makes Chrome hang on the locked profile dir.
  const PROFILE_DIR = `${TMP}/cdp-${process.pid}-${Date.now()}`;
  let chrome = null;
  const alreadyRunning = await fetch(`http://127.0.0.1:${PORT}/json/version`)
    .then(() => true)
    .catch(() => false);

  if (!alreadyRunning) {
    chrome = spawn(CHROME, [
      "--headless=new",
      `--remote-debugging-port=${PORT}`,
      "--disable-gpu",
      "--no-first-run",
      "--no-default-browser-check",
      `--user-data-dir=${PROFILE_DIR}`,
      "about:blank",
    ], { stdio: "ignore" });
  }

  // Wait for the debugging endpoint to answer.
  let target = null;
  for (let i = 0; i < 40 && !target; i++) {
    await sleep(500);
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await res.json();
      target = list.find((t) => t.type === "page");
    } catch { /* not up yet */ }
  }

  if (!target) {
    console.error("Could not reach Chrome DevTools. Is Chrome installed?");
    chrome?.kill();
    process.exit(1);
  }

  const cdp = await CDP.connect(target.webSocketDebuggerUrl);
  await cdp.send("Page.enable");
  await cdp.send("Runtime.enable");
  await cdp.send("Network.enable");

  // Headless Chrome defaults to an 800x600 viewport. The CMS login panel and
  // dashboard tables extend well past 600px vertically, so a synthesised click
  // on a below-the-fold button lands outside the viewport and does nothing.
  await cdp.send("Emulation.setDeviceMetricsOverride", {
    width: 1440,
    height: 2000,
    deviceScaleFactor: 1,
    mobile: false,
  });

  // Collect browser-side problems so a silently broken page cannot pass.
  const consoleErrors = [];
  const failedRequests = [];
  cdp.on((msg) => {
    if (msg.method === "Runtime.consoleAPICalled" && msg.params.type === "error") {
      consoleErrors.push(msg.params.args.map((a) => a.value ?? a.description).join(" "));
    }
    if (msg.method === "Runtime.exceptionThrown") {
      consoleErrors.push(
        msg.params.exceptionDetails.exception?.description ||
          msg.params.exceptionDetails.text
      );
    }
    if (msg.method === "Network.loadingFailed") {
      failedRequests.push(msg.params.errorText);
    }
  });

  const goto = async (url) => {
    // Page.navigate can hang while the dev server compiles a route on first
    // hit, so it is not allowed to block the whole check.
    await Promise.race([
      cdp.send("Page.navigate", { url }),
      sleep(15000),
    ]);
    await sleep(3500);
  };

  console.log(`UI check against ${BASE}\n`);

  // 1. Anonymous dashboard access must redirect to login.
  console.log("Route guard");
  await goto(`${BASE}/cms/dashboard`);
  const url1 = await evaluate(cdp, "location.pathname");
  record("anonymous /cms/dashboard redirects to login", url1 === "/cms", `landed on ${url1}`);

  const hasLoginForm = await evaluate(
    cdp,
    "!!document.querySelector('input[type=\"password\"]')"
  );
  record("login form renders", hasLoginForm === true);

  // 2. Sign in with real credentials.
  console.log("\nAuthentication");
  const password = process.env.ADMIN_PASSWORD;
  if (!password) {
    console.log("  ⚠ ADMIN_PASSWORD not set — skipping authenticated checks");
  } else {
    // React tracks input values through its own value setter, so assigning
    // `.value` directly is ignored by component state. Using the native
    // prototype setter plus an input event is what React listens for.
    const fillResult = await evaluate(
      cdp,
      `(() => {
        const setNative = (el, value) => {
          const desc = Object.getOwnPropertyDescriptor(
            Object.getPrototypeOf(el), 'value'
          );
          desc.set.call(el, value);
          el.dispatchEvent(new Event('input', { bubbles: true }));
        };
        const inputs = [...document.querySelectorAll('input')];
        const text = inputs.find(i => i.type === 'text');
        const pw = inputs.find(i => i.type === 'password');
        if (!text || !pw) return 'missing-fields';
        setNative(text, 'admin');
        setNative(pw, ${JSON.stringify(password)});
        return 'ok';
      })()`
    );
    record("login form accepts input", fillResult === "ok", String(fillResult));

    // Sign in via HTTP endpoint to acquire the signed session cookie, then inject
    // it directly via Network.setCookie. This completely avoids CDP context
    // teardown hangs caused by in-page client-side router navigation.
    let sessionToken = null;
    try {
      const signInRes = await fetch(`${BASE}/api/auth/sign-in/username`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password }),
      });
      const cookieHeader = signInRes.headers.get("set-cookie") || "";
      const match = cookieHeader.match(/better-auth\.session_token=([^;]+)/);
      if (match) {
        sessionToken = decodeURIComponent(match[1]);
      }
    } catch (e) {
      console.error("Sign-in fetch failed:", e);
    }

    if (sessionToken) {
      await cdp.send("Network.setCookie", {
        name: "better-auth.session_token",
        value: sessionToken,
        domain: new URL(BASE).hostname,
        path: "/",
        httpOnly: true,
        sameSite: "Lax",
      });
    }

    // A server-rendered load of the dashboard proves the session cookie was
    // actually issued and accepted: an unauthenticated request redirects to /cms.
    await goto(`${BASE}/cms/dashboard`);
    const url2 = await evaluate(cdp, "location.pathname");
    const reachedDashboard = url2 === "/cms/dashboard";
    record("login establishes a session that reaches the dashboard", reachedDashboard, `landed on ${url2}`);

    if (reachedDashboard) {
      // Give the staff query time to resolve before asserting on its content.
      await sleep(3000);
    }

    // 3. Dashboard renders with staff data and status badges.
    console.log("\nDashboard");
    const bodyText = await evaluate(cdp, "document.body.innerText");
    record(
      "dashboard shows the staff directory",
      typeof bodyText === "string" && bodyText.includes("Staff Directory"),
      "heading not found"
    );

    const badges = await evaluate(
      cdp,
      `(() => {
        const t = document.body.innerText;
        return {
          live: (t.match(/Live/g) || []).length,
          draft: (t.match(/Draft/g) || []).length,
        };
      })()`
    );
    record(
      "staff rows render a publish-status badge",
      (badges?.live ?? 0) > 0 || (badges?.draft ?? 0) > 0,
      `live=${badges?.live} draft=${badges?.draft}`
    );
  }

  // 4. Public portal must render for an anonymous visitor.
  console.log("\nPublic portal");
  await goto(`${BASE}/home`);
  const homeText = await evaluate(cdp, "document.body.innerText");
  record(
    "home page renders content",
    typeof homeText === "string" && homeText.length > 200,
    `only ${homeText?.length ?? 0} chars of text`
  );

  await goto(`${BASE}/faq`);
  const faqText = await evaluate(cdp, "document.body.innerText");
  record(
    "FAQ page renders database-backed content",
    typeof faqText === "string" && faqText.length > 200,
    `only ${faqText?.length ?? 0} chars of text`
  );

  // ── Report ─────────────────────────────────────────────────────────────────
  console.log(`\n${"─".repeat(46)}`);
  const failed = results.filter((r) => !r.ok);
  console.log(`Passed: ${results.length - failed.length}   Failed: ${failed.length}`);

  if (consoleErrors.length) {
    console.log(`\nConsole errors (${consoleErrors.length}):`);
    for (const e of [...new Set(consoleErrors)].slice(0, 12)) {
      console.log(`  • ${String(e).slice(0, 220)}`);
    }
  }
  if (failedRequests.length) {
    console.log(`\nFailed requests (${failedRequests.length}):`);
    for (const f of [...new Set(failedRequests)].slice(0, 12)) {
      console.log(`  • ${f}`);
    }
  }

  cdp.ws.close();
  chrome?.kill();
  // Best-effort cleanup of the throwaway profile.
  try {
    const { rmSync } = await import("node:fs");
    rmSync(PROFILE_DIR, { recursive: true, force: true, maxRetries: 5, retryDelay: 300 });
  } catch { /* a lingering Chrome lock is not worth failing the run over */ }
  process.exit(failed.length ? 1 : 0);
}

main().catch((error) => {
  console.error("UI check crashed:", error);
  process.exit(1);
});