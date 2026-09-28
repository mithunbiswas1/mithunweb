const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const pathM = "M 14 46 L 14 18 L 22.5 18 L 32 35 L 41.5 18 L 50 18 L 50 46 L 43.5 46 L 43.5 25.5 L 34.5 41 L 29.5 41 L 20.5 25.5 L 20.5 46 Z";

// Scale path to 512x512 for high-res generation
// Scale factor: 512 / 64 = 8
// 14*8=112, 46*8=368, 18*8=144, 22.5*8=180, 32*8=256, 35*8=280, 41.5*8=332, 50*8=400, 43.5*8=348, 25.5*8=204, 34.5*8=276, 29.5*8=236, 20.5*8=164
const pathM512 = "M 112 368 L 112 144 L 180 144 L 256 280 L 332 144 L 400 144 L 400 368 L 348 368 L 348 204 L 276 328 L 236 328 L 164 204 L 164 368 Z";

function createCircleSvg(size, bgColor, fgColor) {
  const r = size / 2;
  const p = size === 512 ? pathM512 : pathM;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  <circle cx="${r}" cy="${r}" r="${r}" fill="${bgColor}"/>
  <path d="${p}" fill="${fgColor}"/>
</svg>`;
}

// Adaptive SVG with CSS media query for browser tabs
const adaptiveSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <style>
    .bg { fill: #000000; }
    .fg { fill: #ffffff; }
    @media (prefers-color-scheme: dark) {
      .bg { fill: #ffffff; }
      .fg { fill: #000000; }
    }
  </style>
  <circle class="bg" cx="32" cy="32" r="32"/>
  <path class="fg" d="${pathM}"/>
</svg>`;

async function run() {
  const root = path.join(__dirname, '..');
  const iconsDir = path.join(root, 'public/images/icons');
  if (!fs.existsSync(iconsDir)) fs.mkdirSync(iconsDir, { recursive: true });

  // 1. Adaptive SVG for Next.js app/icon.svg and public/favicon.svg
  fs.writeFileSync(path.join(root, 'src/app/icon.svg'), adaptiveSvg);
  fs.writeFileSync(path.join(root, 'public/favicon.svg'), adaptiveSvg);

  // 2. Light mode icon: Black circle with White M (InmV8zs6TpFKUGdN3OeeQf60oIc.png)
  const lightSvg = createCircleSvg(64, '#000000', '#ffffff');
  await sharp(Buffer.from(lightSvg)).png().toFile(path.join(iconsDir, 'InmV8zs6TpFKUGdN3OeeQf60oIc.png'));

  // 3. Dark mode icon: White circle with Black M (liZlkr66syBeQlBokhdrHsRgXss.png)
  const darkSvg = createCircleSvg(64, '#ffffff', '#000000');
  await sharp(Buffer.from(darkSvg)).png().toFile(path.join(iconsDir, 'liZlkr66syBeQlBokhdrHsRgXss.png'));

  // 4. Apple Touch Icon (TsQgtMigLZDvUbZSdD8m70svgpQ.png) 630x630
  // Previous one had 630x630 white bg with centered circular black badge
  const appleSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 630 630" width="630" height="630">
    <rect width="630" height="630" fill="#ffffff"/>
    <g transform="translate(59, 59)">
      <circle cx="256" cy="256" r="256" fill="#000000"/>
      <path d="${pathM512}" fill="#ffffff"/>
    </g>
  </svg>`;
  await sharp(Buffer.from(appleSvg)).png().toFile(path.join(iconsDir, 'TsQgtMigLZDvUbZSdD8m70svgpQ.png'));

  // 5. Favicon ICOs (32x32)
  const icoSvg = createCircleSvg(64, '#000000', '#ffffff');
  await sharp(Buffer.from(icoSvg)).resize(32, 32).png().toFile(path.join(root, 'public/favicon.ico'));
  await sharp(Buffer.from(icoSvg)).resize(32, 32).png().toFile(path.join(root, 'src/app/favicon.ico'));

  // 6. PWA / App icons
  const pwaSvg = createCircleSvg(512, '#000000', '#ffffff');
  await sharp(Buffer.from(pwaSvg)).resize(192, 192).png().toFile(path.join(root, 'public/icon-192.png'));
  await sharp(Buffer.from(pwaSvg)).resize(512, 512).png().toFile(path.join(root, 'public/icon-512.png'));

  console.log('✓ Successfully generated all circular favicon assets with "M" lettermark (preserving original design structure)!');
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
