import sharp from "sharp";
import fs from "fs";
import path from "path";

const outDir = path.join(process.cwd(), "public", "icons");
fs.mkdirSync(outDir, { recursive: true });

async function makeIcon(size) {
  const svg = `
    <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" rx="${Math.round(size * 0.22)}" fill="#3730A3"/>
      <text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Arial, sans-serif" font-weight="700" font-size="${Math.round(size * 0.45)}" fill="#FFFFFF">A</text>
    </svg>`;
  await sharp(Buffer.from(svg)).png().toFile(path.join(outDir, `icon-${size}.png`));
}

await makeIcon(192);
await makeIcon(512);
console.log("Icons generated in public/icons");
