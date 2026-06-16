import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);
await page.click('text=Tamil');
await page.waitForTimeout(3000);
await page.waitForSelector('.hero__glass', { timeout: 8000 });
await page.screenshot({ path: 'C:/Users/Avishka/AppData/Local/Temp/hero_tamil_line3.png', clip: { x: 0, y: 76, width: 750, height: 824 } });

// Check line3 height — should be ~1 line tall
const lineData = await page.evaluate(() => {
  const lines = document.querySelectorAll('.hero__line');
  return Array.from(lines).map(l => ({ text: l.textContent?.trim(), height: l.getBoundingClientRect().height }));
});
console.log(JSON.stringify(lineData, null, 2));
await browser.close();
