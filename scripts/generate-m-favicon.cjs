const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Clean geometric M path or clean vector svg with dark squircle
// In a 512x512 canvas, let's draw a super clean, mathematically balanced, bold geometric 'M'
// Left pillar: x=100..164, diagonal down to center (256, 320), diagonal up to (348..412)
const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <rect width="512" height="512" rx="112" fill="#000000"/>
  <rect x="6" y="6" width="500" height="500" rx="106" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="12"/>
  <path d="M 112 396 L 112 120 L 192 120 L 256 264 L 320 120 L 400 120 L 400 396 L 332 396 L 332 232 L 278 348 L 234 348 L 180 232 L 180 396 Z" fill="#ffffff"/>
</svg>`;

async function generateAll() {
  const buf = Buffer.from(svg);
  
  // 1. Next.js App Router root icons
  fs.writeFileSync(path.join(__dirname, '../src/app/icon.svg'), svg);
  fs.writeFileSync(path.join(__dirname, '../public/favicon.svg'), svg);
  
  // 2. PNG sizes
  await sharp(buf).resize(512, 512).png().toFile(path.join(__dirname, '../public/icon-512.png'));
  await sharp(buf).resize(192, 192).png().toFile(path.join(__dirname, '../public/icon-192.png'));
  await sharp(buf).resize(32, 32).png().toFile(path.join(__dirname, '../public/favicon.ico'));
  await sharp(buf).resize(32, 32).png().toFile(path.join(__dirname, '../src/app/favicon.ico'));

  // 3. Update existing Framer icon references in public/images/icons/
  const iconsDir = path.join(__dirname, '../public/images/icons');
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  // Light & Dark icons
  await sharp(buf).resize(64, 64).png().toFile(path.join(iconsDir, 'InmV8zs6TpFKUGdN3OeeQf60oIc.png'));
  await sharp(buf).resize(64, 64).png().toFile(path.join(iconsDir, 'liZlkr66syBeQlBokhdrHsRgXss.png'));
  await sharp(buf).resize(630, 630).png().toFile(path.join(iconsDir, 'TsQgtMigLZDvUbZSdD8m70svgpQ.png'));
  
  console.log('✓ Successfully generated all favicon and icon assets with "M" lettermark!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
