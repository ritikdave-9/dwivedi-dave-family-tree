import puppeteer from "puppeteer-core";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, "..");
const outPath = join(siteDir, "Dwivedi-Dave-Family-Tree.pdf");
const url = "http://127.0.0.1:8766/index.html";

const chromePaths = [
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  process.env.CHROME_PATH,
].filter(Boolean);

const executablePath = chromePaths.find((p) => existsSync(p));
if (!executablePath) {
  console.error("Chrome/Chromium not found for PDF export.");
  process.exit(1);
}

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1400, height: 900, deviceScaleFactor: 2 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
  await page.evaluate(async () => {
    const imgs = [...document.querySelectorAll(".tree-wrap img")];
    await Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.onload = img.onerror = r;
            })
      )
    );
  });

  const dims = await page.evaluate(() => {
    const header = document.querySelector("header");
    const tree = document.querySelector(".tree");
    const pad = 48;
    const w = Math.ceil((tree?.scrollWidth || 1200) + pad);
    const h = Math.ceil(
      (header?.offsetHeight || 0) + (tree?.scrollHeight || 800) + pad + 40
    );
    return { w, h };
  });

  const widthIn = Math.max(dims.w, 1200) / 96;
  const heightIn = Math.max(dims.h, 600) / 96;

  await page.pdf({
    path: outPath,
    printBackground: true,
    width: `${widthIn}in`,
    height: `${heightIn}in`,
    margin: { top: "12mm", right: "12mm", bottom: "12mm", left: "12mm" },
    scale: 1,
  });

  console.log("Wrote", outPath);
  console.log(`Page size: ${widthIn.toFixed(1)}in × ${heightIn.toFixed(1)}in`);
} finally {
  await browser.close();
}