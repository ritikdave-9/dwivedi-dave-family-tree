import puppeteer from "puppeteer-core";
import { spawn } from "child_process";
import { existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const siteDir = join(__dirname, "..");
const outPath = join(siteDir, "family-tree-poster.png");
const port = 8766;
const url = `http://127.0.0.1:${port}/index.html?poster=1`;

const chromePaths = [
  "/usr/bin/google-chrome-stable",
  "/usr/bin/google-chrome",
  "/home/ritik-dave/.local/bin/google-chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  process.env.CHROME_PATH,
].filter(Boolean);

const executablePath = chromePaths.find((p) => existsSync(p));
if (!executablePath) {
  console.error("Chrome/Chromium not found for poster export.");
  process.exit(1);
}

function startStaticServer() {
  return new Promise((resolve, reject) => {
    const child = spawn("/usr/bin/python3", ["-m", "http.server", String(port)], {
      cwd: siteDir,
      stdio: "ignore",
    });
    child.on("error", reject);
    setTimeout(() => resolve(child), 400);
  });
}

const server = await startStaticServer();

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
});

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 4961, height: 3508, deviceScaleFactor: 1 });
  await page.goto(url, { waitUntil: "networkidle0", timeout: 120000 });
  await page.waitForFunction(
    () => document.documentElement.dataset.posterReady === "1",
    { timeout: 120000 }
  );
  await page.evaluate(() => new Promise((r) => setTimeout(r, 250)));

  const capture = await page.$("#poster-capture");
  if (!capture) {
    throw new Error("poster-capture element not found");
  }

  await capture.screenshot({
    path: outPath,
    type: "png",
    omitBackground: false,
  });

  const stats = await page.evaluate(() => ({
    scale: document.documentElement.dataset.posterScale || "1",
    photo: document.documentElement.dataset.posterPhotoSize || "?",
    w: document.getElementById("poster-content")?.scrollWidth,
    h: document.getElementById("poster-content")?.scrollHeight,
  }));
  console.log("Wrote", outPath);
  console.log("Poster size: 4961 × 3508 px (A3 landscape @ ~300 DPI)");
  console.log("Photo size (px):", stats.photo);
  console.log("Content (px):", stats.w, "×", stats.h);
  console.log("Content scale:", stats.scale);
} finally {
  await browser.close();
  server.kill("SIGTERM");
}