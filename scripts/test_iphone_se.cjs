const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/laptop-mobile-view');
const outputDir = path.resolve(__dirname, '../public/device_mockups/iphone');

if (!fs.existsSync(outputDir)) {
  require('fs').mkdirSync(outputDir, { recursive: true });
}

// Helper to crop snipping border
async function autoCropMobile(filePath) {
  const { data, info } = await sharp(filePath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width, h = info.height;
  function getPx(x, y) {
    const idx = (y * w + x) * info.channels;
    return [data[idx], data[idx + 1], data[idx + 2]];
  }

  let left = 0, right = w - 1;
  const midY = Math.round(h / 2);
  for (let x = 0; x < w; x++) {
    const [r, g, b] = getPx(x, midY);
    const isDark = (r < 65 && g < 75 && b < 85);
    if (!isDark && left === 0) left = x;
    if (!isDark) right = x;
  }

  let top = 0, bottom = h - 1;
  const midX = Math.round(w / 2);
  for (let y = 0; y < h; y++) {
    const [r, g, b] = getPx(midX, y);
    const isDark = (r < 65 && g < 75 && b < 85);
    if (!isDark && top === 0) top = y;
    if (!isDark) bottom = y;
  }

  if (right <= left || bottom <= top) {
    return sharp(filePath).toBuffer();
  }

  const cropW = right - left + 1;
  const cropH = bottom - top + 1;

  return sharp(filePath)
    .extract({ left, top, width: cropW, height: cropH })
    .toBuffer();
}

async function renderIPhoneSE({ mobileFile, projectKey, customMobileBuffer = null }) {
  const canvasW = 1600;
  const canvasH = 1200;

  // Phone geometry:
  // Center: x = 800, y = 590
  const phoneW = 490;
  const phoneH = 990;
  const phoneX = Math.round((canvasW - phoneW) / 2); // 555
  const phoneY = Math.round((canvasH - phoneH) / 2) - 10; // 95

  // Screen inside Phone:
  // iPhone SE has side bezel = 18px
  // Top bezel = 120px
  // Bottom bezel = 120px
  // Active screen width = 490 - (18 * 2) = 454px
  // Active screen height = 990 - 240 = 750px
  const screenW = 454;
  const screenH = 750;
  const screenX = phoneX + 18; // 573
  const screenY = phoneY + 120; // 215

  // 1. Process Mobile screenshot
  let mobileBuf;
  if (customMobileBuffer) {
    mobileBuf = customMobileBuffer;
  } else {
    mobileBuf = await autoCropMobile(path.join(inputDir, mobileFile));
  }

  // Sample top/bottom colors
  const croppedMeta = await sharp(mobileBuf).metadata();
  const topPx = await sharp(mobileBuf)
    .extract({ left: Math.min(10, croppedMeta.width - 1), top: Math.min(10, croppedMeta.height - 1), width: 1, height: 1 })
    .raw()
    .toBuffer();
  const botPx = await sharp(mobileBuf)
    .extract({ left: Math.min(10, croppedMeta.width - 1), top: Math.max(0, croppedMeta.height - 10), width: 1, height: 1 })
    .raw()
    .toBuffer();

  const isLightHeader = (topPx[0] + topPx[1] + topPx[2] > 380);
  const statusIconColor = isLightHeader ? '#1a1a1a' : '#ffffff';

  // Resize content to fit screenW
  const resizedContent = await sharp(mobileBuf)
    .resize({ width: screenW, fit: 'inside', kernel: 'lanczos3' })
    .toBuffer();

  const resizedMeta = await sharp(resizedContent).metadata();
  const contentH = Math.min(resizedMeta.height, screenH - 28); // leave 28px for status bar

  // Composite active screen content
  const screenCanvas = await sharp({
    create: {
      width: screenW,
      height: screenH,
      channels: 4,
      background: { r: botPx[0], g: botPx[1], b: botPx[2], alpha: 1 }
    }
  })
    .composite([
      // Header background extension
      {
        input: await sharp({
          create: {
            width: screenW,
            height: 40,
            channels: 4,
            background: { r: topPx[0], g: topPx[1], b: topPx[2], alpha: 1 }
          }
        }).png().toBuffer(),
        left: 0,
        top: 0
      },
      // Screenshot content
      {
        input: await sharp(resizedContent)
          .extract({ left: 0, top: 0, width: screenW, height: contentH })
          .toBuffer(),
        left: 0,
        top: 24
      }
    ])
    .png()
    .toBuffer();

  // 2. Hardware Frame & Bezel SVG (iPhone SE 2nd/3rd Gen Midnight / Space Gray)
  const homeBtnY = phoneY + phoneH - 60; // 60px from bottom
  const homeBtnX = 800;
  const earpieceY = phoneY + 58;
  const earpieceX = 800;
  const cameraX = earpieceX - 52;
  const cameraY = earpieceY;

  const phoneSvg = `
    <svg width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Studio floor drop shadow -->
        <filter id="phoneShadow" x="-30%" y="-20%" width="160%" height="160%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#050810" flood-opacity="0.32" />
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#050810" flood-opacity="0.18" />
        </filter>
        <!-- Metallic outer edge gradient -->
        <linearGradient id="aluminumEdge" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#4a4f56" />
          <stop offset="25%" stop-color="#24272c" />
          <stop offset="50%" stop-color="#181a1d" />
          <stop offset="75%" stop-color="#2c3036" />
          <stop offset="100%" stop-color="#3e434a" />
        </linearGradient>
        <!-- Touch ID Ring Gradient -->
        <linearGradient id="touchIdRing" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#606670" />
          <stop offset="35%" stop-color="#282a2e" />
          <stop offset="70%" stop-color="#454a52" />
          <stop offset="100%" stop-color="#727a85" />
        </linearGradient>
      </defs>

      <!-- Background Studio Floor -->
      <rect width="100%" height="100%" fill="#d2d4d8" />

      <!-- Shadow & Phone Chassis -->
      <g filter="url(#phoneShadow)">
        <!-- Outer Aluminum Chassis -->
        <rect x="${phoneX}" y="${phoneY}" width="${phoneW}" height="${phoneH}" rx="66" ry="66" fill="url(#aluminumEdge)" />
        <!-- Subtle chamfer inner line -->
        <rect x="${phoneX + 2}" y="${phoneY + 2}" width="${phoneW - 4}" height="${phoneH - 4}" rx="64" ry="64" fill="none" stroke="#5a606a" stroke-width="1.2" opacity="0.6" />
        <!-- Deep Black Front Glass -->
        <rect x="${phoneX + 5}" y="${phoneY + 5}" width="${phoneW - 10}" height="${phoneH - 10}" rx="62" ry="62" fill="#090a0c" />
      </g>

      <!-- Antenna Bands & Buttons Accents -->
      <rect x="${phoneX - 3}" y="${phoneY + 160}" width="3" height="52" rx="1.5" fill="#24272b" />
      <rect x="${phoneX - 3}" y="${phoneY + 230}" width="3" height="52" rx="1.5" fill="#24272b" />
      <rect x="${phoneX + phoneW}" y="${phoneY + 190}" width="3" height="65" rx="1.5" fill="#24272b" />

      <!-- TOP BEZEL HARDWARE: -->
      <!-- Speaker Earpiece Grill -->
      <rect x="${earpieceX - 32}" y="${earpieceY - 4}" width="64" height="8" rx="4" fill="#181a1d" stroke="#25282d" stroke-width="1" />
      <rect x="${earpieceX - 28}" y="${earpieceY - 2}" width="56" height="4" rx="2" fill="#0d0e10" opacity="0.8" />
      <!-- FaceTime HD Front Camera -->
      <circle cx="${cameraX}" cy="${cameraY}" r="6.5" fill="#0a0c0e" stroke="#1c1f24" stroke-width="1" />
      <circle cx="${cameraX}" cy="${cameraY}" r="3" fill="#05080c" />
      <circle cx="${cameraX - 1}" cy="${cameraY - 1}" r="1.4" fill="#1e324d" opacity="0.75" />
      <!-- Ambient light / proximity sensor -->
      <circle cx="${earpieceX}" cy="${earpieceY - 18}" r="2.5" fill="#111316" opacity="0.7" />

      <!-- BOTTOM BEZEL HARDWARE: Iconic Apple Touch ID Home Button -->
      <!-- Button Recess Outer Shadow -->
      <circle cx="${homeBtnX}" cy="${homeBtnY}" r="39" fill="#050608" opacity="0.8" />
      <!-- Metallic Capacitive Touch ID Ring -->
      <circle cx="${homeBtnX}" cy="${homeBtnY}" r="37.5" fill="none" stroke="url(#touchIdRing)" stroke-width="2.2" />
      <!-- Center Sapphire Crystal Button -->
      <circle cx="${homeBtnX}" cy="${homeBtnY}" r="36" fill="#0c0d0f" />
      <circle cx="${homeBtnX}" cy="${homeBtnY}" r="34" fill="#0f1114" />
      <!-- Touch ID subtle gloss reflection -->
      <path d="M ${homeBtnX - 25} ${homeBtnY - 18} Q ${homeBtnX} ${homeBtnY - 30} ${homeBtnX + 25} ${homeBtnY - 18}" stroke="#ffffff" stroke-width="1.2" opacity="0.12" fill="none" />
    </svg>
  `;

  // 3. Modern iOS Status Bar SVG overlay (for classic 16:9 screen)
  const statusSvg = `
    <svg width="${screenW}" height="28" xmlns="http://www.w3.org/2000/svg">
      <!-- Time -->
      <text x="18" y="19" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" font-size="13" font-weight="600" fill="${statusIconColor}">9:41</text>
      <!-- Signal Bars -->
      <g transform="translate(${screenW - 74}, 9)" fill="${statusIconColor}">
        <rect x="0" y="7" width="2.5" height="4" rx="0.6" />
        <rect x="4" y="5" width="2.5" height="6" rx="0.6" />
        <rect x="8" y="3" width="2.5" height="8" rx="0.6" />
        <rect x="12" y="0" width="2.5" height="11" rx="0.6" />
      </g>
      <!-- Wifi -->
      <g transform="translate(${screenW - 53}, 8)" fill="${statusIconColor}">
        <path d="M 7 11 A 1.5 1.5 0 1 1 7 8 A 1.5 1.5 0 0 1 7 11 Z" />
        <path d="M 3.5 6 C 5.5 4.5 8.5 4.5 10.5 6" stroke="${statusIconColor}" stroke-width="1.4" stroke-linecap="round" fill="none" />
        <path d="M 0.5 3 C 4.5 0 9.5 0 13.5 3" stroke="${statusIconColor}" stroke-width="1.4" stroke-linecap="round" fill="none" />
      </g>
      <!-- Battery -->
      <g transform="translate(${screenW - 32}, 8)">
        <rect x="0" y="0" width="20" height="11" rx="2.5" fill="none" stroke="${statusIconColor}" stroke-width="1" />
        <rect x="2" y="2" width="13" height="7" rx="1.5" fill="${statusIconColor}" />
        <path d="M 21 3.5 Q 22 3.5 22 4.5 V 6.5 Q 22 7.5 21 7.5 Z" fill="${statusIconColor}" />
      </g>
    </svg>
  `;

  const screenWithStatus = await sharp(screenCanvas)
    .composite([{ input: Buffer.from(statusSvg), left: 0, top: 0, blend: 'over' }])
    .png()
    .toBuffer();

  const finalImage = await sharp(Buffer.from(phoneSvg))
    .composite([
      { input: screenWithStatus, left: screenX, top: screenY, blend: 'over' }
    ])
    .png({ quality: 100 })
    .toBuffer();

  const outPath = path.join(outputDir, `${projectKey}-iphone-se-mockup.png`);
  await sharp(finalImage).toFile(outPath);
  console.log(`[Success] Saved iPhone SE Mockup: ${outPath}`);
}

async function main() {
  await renderIPhoneSE({
    mobileFile: 'crostini-mobile.png',
    projectKey: 'crostini'
  });
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
