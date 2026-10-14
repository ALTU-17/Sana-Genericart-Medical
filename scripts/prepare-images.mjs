/**
 * Image pipeline for the Sana Medical site.
 *
 * Reads the original store photos from `assets-src/` and produces:
 *   - src/assets/images/*.webp   optimised photos used by next/image
 *   - public/og-cover.jpg        1200x630 social share card
 *   - src/app/icon.png           512x512 favicon / app icon
 *   - src/app/apple-icon.png     180x180 Apple touch icon
 *
 * Run with:  npm run images
 */
import { mkdir, readFile, writeFile, rm } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const SRC = path.join(root, "assets-src");
const OUT_IMAGES = path.join(root, "src", "assets", "images");
const OUT_PUBLIC = path.join(root, "public");
const OUT_APP = path.join(root, "src", "app");

const BRAND = "#0E8A93";
const BRAND_DEEP = "#083F45";

/** Photos that end up in the gallery / hero. */
const PHOTOS = [
  { from: "store-front.png", to: "store-front.webp", width: 1400 },
  { from: "interior-1.jpg", to: "interior-1.webp", width: 1600 },
  { from: "interior-2.png", to: "interior-2.webp", width: 1600 },
];

const display = (p) => path.relative(root, p).replaceAll("\\", "/");

async function convertPhotos() {
  await mkdir(OUT_IMAGES, { recursive: true });
  for (const photo of PHOTOS) {
    const input = path.join(SRC, photo.from);
    const output = path.join(OUT_IMAGES, photo.to);
    const info = await sharp(input)
      .resize({ width: photo.width, withoutEnlargement: true })
      .webp({ quality: 82, effort: 6 })
      .toFile(output);
    console.log(`  ${display(output)}  ${info.width}x${info.height}  ${kb(info.size)}`);
  }
}

/** 1200x630 social card: storefront photo under a teal wash with the shop details. */
async function buildOgCover() {
  const width = 1200;
  const height = 630;
  const background = await sharp(path.join(SRC, "store-front.png"))
    .resize(width, height, { fit: "cover", position: "top" })
    .modulate({ brightness: 0.55, saturation: 0.9 })
    .toBuffer();

  const overlay = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">
    <defs>
      <linearGradient id="wash" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="${BRAND_DEEP}" stop-opacity="0.94"/>
        <stop offset="55%" stop-color="${BRAND}" stop-opacity="0.80"/>
        <stop offset="100%" stop-color="#12B3B8" stop-opacity="0.62"/>
      </linearGradient>
      <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="#8FE6DF"/>
        <stop offset="100%" stop-color="#F5A524"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#wash)"/>
    <g transform="translate(84,118)">
      <rect x="0" y="0" width="76" height="76" rx="22" fill="#ffffff" fill-opacity="0.16"/>
      <path d="M33 14h10v19h19v10H43v19H33V43H14V33h19z" fill="#ffffff"/>
      <text x="104" y="56" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="52"
            font-weight="700" fill="#ffffff" letter-spacing="-1">SANA MEDICAL</text>
    </g>
    <text x="84" y="266" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="34"
          font-weight="600" fill="#CFF6F2">Swast Aushadi Seva &#183; Generic Medicine Stores</text>
    <rect x="84" y="304" width="150" height="6" rx="3" fill="url(#accent)"/>
    <text x="84" y="392" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="62"
          font-weight="700" fill="#ffffff">30% to 70% OFF</text>
    <text x="84" y="450" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="30"
          fill="#EAFBF9">Generic medicines &#183; Baby care &#183; Surgicals &#183; Free home delivery</text>
    <text x="84" y="530" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="28"
          font-weight="600" fill="#ffffff">97666 63011 &#183; 099213 72011</text>
    <text x="84" y="572" font-family="Segoe UI, Inter, Arial, sans-serif" font-size="24"
          fill="#CFF6F2">Chelipura, Naralibag, Chhatrapati Sambhajinagar (Aurangabad) 431001 &#183; Open 10 am - 12 am</text>
  </svg>`;

  const output = path.join(OUT_PUBLIC, "og-cover.jpg");
  const info = await sharp(background)
    .composite([{ input: Buffer.from(overlay), top: 0, left: 0 }])
    .jpeg({ quality: 88, progressive: true })
    .toFile(output);
  console.log(`  ${display(output)}  ${info.width}x${info.height}  ${kb(info.size)}`);
}

/** App mark: teal gradient tile with a white medical cross and a mint capsule. */
function markSvg(size) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
    <defs>
      <linearGradient id="tile" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#12B3B8"/>
        <stop offset="55%" stop-color="${BRAND}"/>
        <stop offset="100%" stop-color="${BRAND_DEEP}"/>
      </linearGradient>
    </defs>
    <rect width="512" height="512" rx="112" fill="url(#tile)"/>
    <circle cx="150" cy="132" r="150" fill="#ffffff" fill-opacity="0.10"/>
    <path d="M221 118h70v103h103v70H291v103h-70V291H118v-70h103z" fill="#ffffff"/>
    <g transform="rotate(-32 256 256)">
      <rect x="150" y="360" width="212" height="66" rx="33" fill="#8FE6DF" fill-opacity="0.95"/>
      <rect x="150" y="360" width="106" height="66" rx="33" fill="#ffffff" fill-opacity="0.9"/>
    </g>
  </svg>`;
}

async function buildIcons() {
  const icon = path.join(OUT_APP, "icon.png");
  const apple = path.join(OUT_APP, "apple-icon.png");
  await sharp(Buffer.from(markSvg(512))).png().toFile(icon);
  await sharp(Buffer.from(markSvg(180))).png().toFile(apple);
  console.log(`  ${display(icon)}  512x512`);
  console.log(`  ${display(apple)}  180x180`);
  // The scaffold's default favicon would win over icon.png - drop it.
  await rm(path.join(OUT_APP, "favicon.ico"), { force: true });
}

const kb = (bytes) => `${(bytes / 1024).toFixed(0)} KB`;

async function main() {
  // Fail fast with a helpful message if the sources are missing.
  for (const photo of PHOTOS) {
    try {
      await readFile(path.join(SRC, photo.from));
    } catch {
      console.error(`Missing source photo: assets-src/${photo.from}`);
      process.exitCode = 1;
      return;
    }
  }
  console.log("Generating web images...");
  await convertPhotos();
  console.log("\nGenerating social cover...");
  await buildOgCover();
  console.log("\nGenerating app icons...");
  await buildIcons();
  const stamp = path.join(OUT_IMAGES, ".prepared");
  await writeFile(stamp, new Date().toISOString());
  console.log("\nDone.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
