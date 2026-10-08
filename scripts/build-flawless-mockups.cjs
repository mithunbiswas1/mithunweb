const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/laptop-mobile-view');
const outputDir = path.resolve(__dirname, '../public/generated_image');
const baseImgPath = path.resolve(__dirname, '../public/example_image/Screenshot_2.png');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Function to crop dark border (e.g. from Windows snipping tool) around mobile screenshot
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

async function renderMockup({ laptopFile, mobileFile, outName, customMobileBuffer = null }) {
  console.log(`\n========================================`);
  console.log(`Building Flawless Mockup: ${outName}`);

  // 1. Prepare 2X Base Canvas (1782 x 1336)
  const base2xMeta = { width: 1782, height: 1336 };

  // Blackout the entire old screen area on 2X base to eliminate ANY leftover wallpaper pixels
  const blackoutSvg = `
    <svg width="${base2xMeta.width}" height="${base2xMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 300 86
        H 1498
        Q 1518 86 1518 106
        L 1528 886
        H 272
        L 282 106
        Q 282 86 300 86
        Z
      " fill="#0b0b0d" />
    </svg>
  `;

  const base2xRaw = await sharp(baseImgPath)
    .resize(base2xMeta.width, base2xMeta.height, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const base2xClean = await sharp(base2xRaw)
    .composite([{ input: Buffer.from(blackoutSvg), blend: 'over' }])
    .png()
    .toBuffer();

  // 2. Exact Perspective Trapezoid Screen Coordinates (2X):
  // Top-Left: (300, 100), Top-Right: (1498, 100) -> Top width = 1198
  // Bottom-Left: (292, 874), Bottom-Right: (1508, 874) -> Bottom width = 1216
  // Height = 774 (ends at y=874, leaving exact 12px bottom bezel matching top bezel)
  const laptopX = 292;
  const laptopY = 100;
  const laptopW = 1216;
  const laptopH = 774;

  // Trapezoid mask relative to (laptopX, laptopY):
  // Top-left: x=8, y=0; Top-right: x=1206, y=0
  // Bottom-right: x=1216, y=774; Bottom-left: x=0, y=774
  const screenMaskSvg = `
    <svg width="${laptopW}" height="${laptopH}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 22 0
        H 1192
        Q 1206 0 1206 14
        L ${laptopW} ${laptopH}
        H 0
        L 8 14
        Q 8 0 22 0
        Z
      " fill="white" />
    </svg>
  `;

  // Resize laptop screenshot to cover 100% of the screen area seamlessly
  const laptopSourcePath = path.join(inputDir, laptopFile);
  const resizedLaptop = await sharp(laptopSourcePath)
    .resize(laptopW, laptopH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const maskedLaptopScreen = await sharp(resizedLaptop)
    .composite([{ input: Buffer.from(screenMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 3. Crisp Solid Black Hardware MacBook Notch (pure black, camera lens + sensor, zero leaks):
  const notchW = 144;
  const notchH = 38;
  const notchX = 829;
  const notchY = 86;

  const notchSvg = `
    <svg width="${notchW}" height="${notchH}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 0 0
        H ${notchW}
        V ${notchH - 8}
        Q ${notchW} ${notchH} ${notchW - 8} ${notchH}
        H 8
        Q 0 ${notchH} 0 ${notchH - 8}
        Z
      " fill="#0b0b0d" />
      <!-- Centered Camera Lens and Sensor -->
      <circle cx="${Math.round(notchW / 2)}" cy="${Math.round(notchH / 2) + 2}" r="3.5" fill="#040608" />
      <circle cx="${Math.round(notchW / 2)}" cy="${Math.round(notchH / 2) + 2}" r="1.4" fill="#1b2432" opacity="0.75" />
      <circle cx="${Math.round(notchW / 2) + 18}" cy="${Math.round(notchH / 2) + 2}" r="1.2" fill="#121820" />
    </svg>
  `;

  // 4. Prepare Phone Screen & Frame
  const phoneScrW = 300;
  const phoneScrH = 652;
  const phoneScrX = 1119;
  const phoneScrY = 539;

  const phoneOuterX = 1108;
  const phoneOuterY = 530;
  const phoneOuterW = 322;
  const phoneOuterH = 670;

  let mobileBuf;
  if (customMobileBuffer) {
    mobileBuf = customMobileBuffer;
  } else {
    mobileBuf = await autoCropMobile(path.join(inputDir, mobileFile));
  }

  // Sample top and bottom colors for edge bleeding & safe area
  const croppedMeta = await sharp(mobileBuf).metadata();
  const topPx = await sharp(mobileBuf)
    .extract({ left: Math.min(10, croppedMeta.width - 1), top: Math.min(10, croppedMeta.height - 1), width: 1, height: 1 })
    .raw()
    .toBuffer();
  const botPx = await sharp(mobileBuf)
    .extract({ left: Math.min(10, croppedMeta.width - 1), top: Math.max(0, croppedMeta.height - 10), width: 1, height: 1 })
    .raw()
    .toBuffer();

  const bgR = topPx[0], bgG = topPx[1], bgB = topPx[2];
  const isLightHeader = (bgR + bgG + bgB > 380);

  // Scale mobile content strictly by width (300px) so no horizontal content is cropped
  const safeAreaTop = 32;
  const mobileContentW = phoneScrW;
  const resizedMobileContent = await sharp(mobileBuf)
    .resize({ width: mobileContentW, fit: 'inside' })
    .toBuffer();

  const fullPhoneScreen = await sharp({
    create: {
      width: phoneScrW,
      height: phoneScrH,
      channels: 4,
      background: { r: botPx[0], g: botPx[1], b: botPx[2], alpha: 1 }
    }
  })
    .composite([
      // Top safe area background patch
      {
        input: await sharp({
          create: {
            width: phoneScrW,
            height: safeAreaTop + 30,
            channels: 4,
            background: { r: bgR, g: bgG, b: bgB, alpha: 1 }
          }
        }).png().toBuffer(),
        left: 0,
        top: 0,
        blend: 'over'
      },
      // Mobile screenshot content
      {
        input: resizedMobileContent,
        left: 0,
        top: safeAreaTop,
        blend: 'over'
      },
      // Hardware Dynamic Island + iOS Status Bar + Home Bar
      {
        input: Buffer.from(`
          <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
            <!-- Status Bar Time -->
            <text x="36" y="24" font-family="-apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif" font-size="13" font-weight="600" fill="${isLightHeader ? '#000000' : '#ffffff'}" text-anchor="middle">9:41</text>
            <!-- Status Bar Battery & Wifi -->
            <g fill="${isLightHeader ? '#000000' : '#ffffff'}">
              <path d="M ${phoneScrW - 36} 16 h 16 a 3 3 0 0 1 3 3 v 6 a 3 3 0 0 1 -3 3 h -16 a 3 3 0 0 1 -3 -3 v -6 a 3 3 0 0 1 3 -3 z" fill="none" stroke="${isLightHeader ? '#000000' : '#ffffff'}" stroke-width="1.5" />
              <rect x="${phoneScrW - 34}" y="18" width="10" height="8" rx="1.5" />
            </g>
            <!-- Dynamic Island Pill -->
            <rect x="${Math.round(phoneScrW / 2) - 35}" y="10" width="70" height="20" rx="10" ry="10" fill="#000000" />
            <circle cx="${Math.round(phoneScrW / 2) + 16}" cy="20" r="4" fill="#0d1117" />
            <circle cx="${Math.round(phoneScrW / 2) + 16}" cy="20" r="1.5" fill="#1e293b" opacity="0.6" />
            <!-- iOS Home Bar -->
            <rect x="${Math.round(phoneScrW / 2) - 44}" y="${phoneScrH - 14}" width="88" height="4" rx="2" ry="2" fill="${isLightHeader ? '#000000' : '#ffffff'}" opacity="0.5" />
          </svg>
        `),
        blend: 'over'
      },
      // Rounded screen corners
      {
        input: Buffer.from(`
          <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${phoneScrW}" height="${phoneScrH}" rx="44" ry="44" fill="white" />
          </svg>
        `),
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  // 5. Phone Body Cutout from 2X Template strictly inside the metallic frame
  const phoneBodyMaskSvg = `
    <svg width="${base2xMeta.width}" height="${base2xMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="60" ry="60" fill="white" />
    </svg>
  `;

  const phoneBodyCutout = await sharp(base2xClean)
    .composite([{ input: Buffer.from(phoneBodyMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  const completePhone = await sharp(phoneBodyCutout)
    .composite([
      { input: fullPhoneScreen, left: phoneScrX, top: phoneScrY, blend: 'over' }
    ])
    .png()
    .toBuffer();

  // 6. Phone Ambient Drop Shadow
  const phoneShadowSvg = `
    <svg width="${base2xMeta.width}" height="${base2xMeta.height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow2x" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="-8" dy="12" stdDeviation="12" flood-color="#000000" flood-opacity="0.35" />
        </filter>
      </defs>
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="60" ry="60" fill="#000000" filter="url(#phoneShadow2x)" opacity="0.35" />
    </svg>
  `;

  // 7. Assembly:
  // - Cleaned base (old wallpaper wiped out)
  // - Trapezoid perspective laptop screen
  // - Pure black hardware notch
  // - Ambient phone shadow
  // - Phone body + screen
  const step1 = await sharp(base2xClean)
    .composite([{ input: maskedLaptopScreen, left: laptopX, top: laptopY, blend: 'over' }])
    .png()
    .toBuffer();

  const step2 = await sharp(step1)
    .composite([{ input: Buffer.from(notchSvg), left: notchX, top: notchY, blend: 'over' }])
    .png()
    .toBuffer();

  const step3 = await sharp(step2)
    .composite([{ input: Buffer.from(phoneShadowSvg), left: 0, top: 0, blend: 'over' }])
    .png()
    .toBuffer();

  const step4 = await sharp(step3)
    .composite([{ input: completePhone, left: 0, top: 0, blend: 'over' }])
    .png()
    .toBuffer();

  const finalOutPath = path.join(outputDir, outName);
  await sharp(step4)
    .resize(1600, 1200, { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(finalOutPath);

  console.log(`[Success] Saved: ${finalOutPath}`);
}

async function runAll() {
  // Clean Meragadi Mobile Buffer (extracted from pristine high-res source)
  const cleanMeragadiMobile = await sharp('public/images/projects/meragadi-mobile.webp')
    .extract({ left: 505, top: 138, width: 270, height: 540 })
    .png()
    .toBuffer();

  const tasks = [
    {
      laptopFile: 'crostini-laptop.png',
      mobileFile: 'crostini-mobile.png',
      outName: 'crostini-mockup.png'
    },
    {
      laptopFile: 'edcl-laptop.png',
      mobileFile: 'edcl-mobile.png',
      outName: 'edcl-mockup.png'
    },
    {
      laptopFile: 'follow-hr-laptop.png',
      mobileFile: 'follow-hr-mobile.png',
      outName: 'follow-hr-mockup.png'
    },
    {
      laptopFile: 'follow-hr-app-laptop.png',
      mobileFile: 'follow-hr-jobs-mobile.png',
      outName: 'follow-hr-app-mockup.png'
    },
    {
      laptopFile: 'meragadi-laptop.png',
      mobileFile: 'meragadi-mobile.png',
      outName: 'meragadi-mockup.png',
      customMobileBuffer: cleanMeragadiMobile
    },
    {
      laptopFile: 'westernloom-laptop.png',
      mobileFile: 'westernloom-mobile.png',
      outName: 'westernloom-mockup.png'
    },
    {
      laptopFile: 'xengomart-laptop.png',
      mobileFile: 'xengomart-mobile.png',
      outName: 'xengomart-mockup.png'
    }
  ];

  for (const t of tasks) {
    await renderMockup(t);
  }

  console.log('\nAll 7 mockups generated in public/generated_image/ with 100% pixel-perfect trapezoid perspective alignment!');
}

runAll().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
