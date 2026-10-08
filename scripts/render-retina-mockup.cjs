const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function renderHighResMockup({ desktopPath, mobilePath, outputPath }) {
  const baseImgPath = path.join(__dirname, '../public/example_image/Screenshot_2.png');

  // Upscale base image to 2x (1782 x 1336) for crystal clear Retina sharpness
  const base2xMeta = { width: 1782, height: 1336 };
  const base2x = await sharp(baseImgPath)
    .resize(base2xMeta.width, base2xMeta.height, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  // 2x coordinates
  const scale = 2;
  const laptopX = 147 * scale; // 294
  const laptopY = 49 * scale;  // 98
  const laptopW = 602 * scale; // 1204
  const laptopH = 388 * scale; // 776

  // Laptop Notch (2x):
  // width: 73 * 2 = 146, height: 18 * 2 = 36
  const notchW = 146;
  const notchH = 36;
  const notchX = Math.round(laptopW / 2 - notchW / 2);

  // Laptop mask with rounded top corners AND notch cutout directly
  const laptopMaskSvg = `
    <svg width="${laptopW}" height="${laptopH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="screenClip">
          <path d="
            M 24 0
            H ${notchX}
            V ${notchH - 8}
            Q ${notchX} ${notchH} ${notchX + 8} ${notchH}
            H ${notchX + notchW - 8}
            Q ${notchX + notchW} ${notchH} ${notchX + notchW} ${notchH - 8}
            V 0
            H ${laptopW - 24}
            Q ${laptopW} 0 ${laptopW} 24
            V ${laptopH}
            H 0
            V 24
            Q 0 0 24 0
            Z
          " />
        </clipPath>
      </defs>
      <rect width="${laptopW}" height="${laptopH}" fill="white" clip-path="url(#screenClip)" />
    </svg>
  `;

  // Desktop screenshot covers full laptop screen seamlessly, NO artificial black bar!
  const resizedDesktop = await sharp(desktopPath)
    .resize(laptopW, laptopH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const maskedLaptopScreen = await sharp(resizedDesktop)
    .composite([
      { input: Buffer.from(laptopMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  // Phone dimensions (2x)
  const phoneScrW = 149 * scale; // 298
  const phoneScrH = 324 * scale; // 648
  const phoneScrX = 560 * scale; // 1120
  const phoneScrY = 270 * scale; // 540

  const phoneOuterX = 553 * scale; // 1106
  const phoneOuterY = 264 * scale; // 528
  const phoneOuterW = 163 * scale; // 326
  const phoneOuterH = 337 * scale; // 674

  // Phone inner screen mask:
  const phoneMaskSvg = `
    <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${phoneScrW}" height="${phoneScrH}" rx="44" ry="44" fill="white" />
    </svg>
  `;

  // Dynamic Island (2x):
  // Island width: 72, height: 22, rx: 11
  const islandW = 74;
  const islandH = 22;
  const islandX = Math.round(phoneScrW / 2 - islandW / 2);
  const islandY = 12;

  // Safe area top padding on phone so Dynamic Island doesn't cover website header!
  const safeAreaTop = 40; // 40px safe area
  const mobileContentH = phoneScrH - safeAreaTop;

  const resizedMobileContent = await sharp(mobilePath)
    .resize(phoneScrW, mobileContentH, { fit: 'cover', position: 'north' })
    .toBuffer();

  // Inspect the top color of mobile content to fill the safe area seamlessly
  const topPixel = await sharp(resizedMobileContent)
    .extract({ left: 10, top: 10, width: 1, height: 1 })
    .raw()
    .toBuffer();

  const bgR = topPixel[0], bgG = topPixel[1], bgB = topPixel[2];

  const fullPhoneScreen = await sharp({
    create: {
      width: phoneScrW,
      height: phoneScrH,
      channels: 4,
      background: { r: bgR, g: bgG, b: bgB, alpha: 1 }
    }
  })
    .composite([
      { input: resizedMobileContent, left: 0, top: safeAreaTop, blend: 'over' }
    ])
    .png()
    .toBuffer();

  const phoneUiOverlaySvg = `
    <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
      <!-- Status bar Time (9:41) -->
      <text x="36" y="28" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="14" font-weight="600" fill="${bgR + bgG + bgB > 380 ? '#000000' : '#ffffff'}" text-anchor="middle">9:41</text>
      <!-- Status bar Battery & Wifi Icons -->
      <g fill="${bgR + bgG + bgB > 380 ? '#000000' : '#ffffff'}">
        <path d="M ${phoneScrW - 36} 20 h 16 a 3 3 0 0 1 3 3 v 6 a 3 3 0 0 1 -3 3 h -16 a 3 3 0 0 1 -3 -3 v -6 a 3 3 0 0 1 3 -3 z" fill="none" stroke="${bgR + bgG + bgB > 380 ? '#000000' : '#ffffff'}" stroke-width="1.5" />
        <rect x="${phoneScrW - 34}" y="22" width="10" height="8" rx="1.5" />
      </g>
      <!-- Dynamic Island Pill -->
      <rect x="${islandX}" y="${islandY}" width="${islandW}" height="${islandH}" rx="11" ry="11" fill="#000000" />
      <circle cx="${islandX + islandW - 16}" cy="${islandY + islandH/2}" r="4.5" fill="#0d1117" />
      <circle cx="${islandX + islandW - 16}" cy="${islandY + islandH/2}" r="1.8" fill="#1e293b" opacity="0.6" />
      <!-- iOS Home Bar -->
      <rect x="${Math.round(phoneScrW / 2) - 44}" y="${phoneScrH - 16}" width="88" height="5" rx="2.5" ry="2.5" fill="${bgR + bgG + bgB > 380 ? '#000000' : '#ffffff'}" opacity="0.6" />
    </svg>
  `;

  const phoneScreenWithUi = await sharp(fullPhoneScreen)
    .composite([
      { input: Buffer.from(phoneUiOverlaySvg), blend: 'over' },
      { input: Buffer.from(phoneMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  // Extract phone body cutout from 2x base
  const phoneBodyMaskSvg = `
    <svg width="${base2xMeta.width}" height="${base2xMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="64" ry="64" fill="white" />
    </svg>
  `;

  const phoneBodyCutout = await sharp(base2x)
    .composite([{ input: Buffer.from(phoneBodyMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const completePhone = await sharp(phoneBodyCutout)
    .composite([
      { input: phoneScreenWithUi, left: phoneScrX, top: phoneScrY, blend: 'over' }
    ])
    .png()
    .toBuffer();

  // Soft ambient shadow behind phone
  const phoneShadowSvg = `
    <svg width="${base2xMeta.width}" height="${base2xMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow2x" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-8" dy="12" stdDeviation="12" flood-color="#000000" flood-opacity="0.3" />
        </filter>
      </defs>
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="64" ry="64" fill="#000000" filter="url(#phoneShadow2x)" opacity="0.35" />
    </svg>
  `;

  // Final Assembly (Downscale smoothly from 2x to 1600x1200 for ultra-sharp crispness)
  const assembled = await sharp(base2x)
    .composite([
      { input: maskedLaptopScreen, left: laptopX, top: laptopY, blend: 'over' },
      { input: Buffer.from(phoneShadowSvg), left: 0, top: 0, blend: 'over' },
      { input: completePhone, left: 0, top: 0, blend: 'over' }
    ])
    .png()
    .toBuffer();

  // Save at high quality 1600x1200
  await sharp(assembled)
    .resize(1600, 1200, { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(outputPath);

  console.log('[Done] Ultra high-res mockup saved to:', outputPath);
}

module.exports = { renderHighResMockup };
