import React from "react";
import {
  Link as RouterLink,
  useNavigate as useRouterNavigate,
  useLocation as useRouterLocation,
  useParams as useRouterParams,
  Outlet as RouterOutlet,
} from "@tanstack/react-router";

export function getCurrentLang(): string {
  if (typeof window !== "undefined") {
    const segments = window.location.pathname.split("/").filter(Boolean);
    if (segments[0] && ["en", "si", "ta"].includes(segments[0])) {
      return segments[0];
    }
    const stored = localStorage.getItem("lang");
    if (stored && ["en", "si", "ta"].includes(stored)) return stored;
  }
  return "en";
}

export function localizePath(path: string, lang?: string): string {
  if (!path || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("mailto:") || path.startsWith("tel:") || path.startsWith("#")) {
    return path;
  }
  const currentLang = lang || getCurrentLang();
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  
  // Exclude CMS, SMP, API, and static assets from lang prefix
  if (
    cleanPath.startsWith("/cms") ||
    cleanPath.startsWith("/smp") ||
    cleanPath.startsWith("/api") ||
    cleanPath.startsWith("/branding") ||
    cleanPath.startsWith("/assets")
  ) {
    return cleanPath;
  }

  const segments = cleanPath.split("/").filter(Boolean);
  if (segments[0] && ["en", "si", "ta"].includes(segments[0])) {
    segments[0] = currentLang;
    return `/${segments.join("/")}`;
  }

  return `/${currentLang}${cleanPath === "/" ? "" : cleanPath}`;
}

// Link wrapper compatible with react-router-dom Link (to, className, children, onClick, etc.)
export const Link = React.forwardRef(function Link(props: any, ref: any) {
  const { to, href, children, ...rest } = props;
  const rawTarget = to || href || "/";
  const target = typeof rawTarget === "string" ? localizePath(rawTarget) : rawTarget;
  return (
    <RouterLink to={target} ref={ref} {...rest}>
      {children}
    </RouterLink>
  );
});

export const NavLink = Link;
export const Outlet = RouterOutlet;

export const useNavigate = () => {
  const navigate = useRouterNavigate();
  return (to: any, options?: any) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    const target = typeof to === "string" ? localizePath(to) : to;
    navigate({ to: target, replace: options?.replace });
  };
};

/**
 * Raw navigate — does NOT apply localizePath.
 * Use this when you have already computed the full localized target path
 * (e.g. in handleLangChange) to avoid the double-localization bug where
 * getCurrentLang() still reads the old URL at call time.
 */
export const useNavigateRaw = () => {
  const navigate = useRouterNavigate();
  return (to: string, options?: { replace?: boolean }) => {
    navigate({ to, replace: options?.replace });
  };
};

export const useLocation = () => {
  const location = useRouterLocation();
  // Strip lang prefix for internal legacy route comparisons
  let pathname = location.pathname;
  const segments = pathname.split("/").filter(Boolean);
  if (segments[0] && ["en", "si", "ta"].includes(segments[0])) {
    pathname = "/" + segments.slice(1).join("/");
    if (pathname === "") pathname = "/";
  }

  return {
    pathname,
    rawPathname: location.pathname,
    search: location.searchStr || "",
    hash: location.hash || "",
    state: (location as any).state || null,
    key: location.pathname,
  };
};

export const useParams = () => {
  const params: any = useRouterParams({ strict: false }) || {};
  if (!params.lang) {
    params.lang = getCurrentLang();
  }
  return params;
};

export const useSearchParams = () => {
  const location = useRouterLocation();
  const searchParams = new URLSearchParams(location.searchStr || "");
  const setSearchParams = (params: any) => {
    // optional updater
  };
  return [searchParams, setSearchParams] as const;
};

export const Navigate = ({ to, replace }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate();
  React.useEffect(() => {
    navigate(to, { replace });
  }, [to, replace]);
  return null;
};

// Simple Route & Routes shim for sub-page tab rendering
export const Routes = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const childArray = React.Children.toArray(children);
  for (const child of childArray) {
    if (React.isValidElement(child)) {
      const { path, element } = child.props as any;
      if (!path || path === "*" || location.pathname.endsWith(path) || location.pathname.includes(path)) {
        return element || null;
      }
    }
  }
  return null;
};

export const Route = ({ element }: { path?: string; element?: React.ReactNode }) => {
  return <>{element}</>;
};
