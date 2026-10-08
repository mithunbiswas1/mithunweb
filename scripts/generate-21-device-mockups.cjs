const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/laptop-mobile-view');
const baseOutDir = path.resolve(__dirname, '../public/device_mockups');
const mobileOutDir = path.join(baseOutDir, 'mobile');
const laptopOutDir = path.join(baseOutDir, 'laptop');
const desktopOutDir = path.join(baseOutDir, 'desktop');
const baseImgPath = path.resolve(__dirname, '../public/example_image/Screenshot_2.png');

[baseOutDir, mobileOutDir, laptopOutDir, desktopOutDir].forEach(d => {
  if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true });
});

// Auto crop helper for mobile screenshots
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

const cleanMacbookBaseImg = path.resolve(__dirname, '../public/example_image/clean_macbook_base.jpg');

// -------------------------------------------------------------
// 1. GENERATE APPLE MACBOOK STANDALONE MOCKUP (Latest MacBook Pro M3/M4 - 100% Clean, No Phone)
// -------------------------------------------------------------
async function generateMacbookMockup({ laptopFile, projectKey }) {
  console.log(`Generating Clean MacBook: ${projectKey}`);
  const baseW = 1600;
  const baseH = 1200;

  // Exact 100% Apple MacBook Pro Retina display geometry:
  // Top: x = 270 to 1345 (w = 1075), y = 88
  // Bottom: x = 262 to 1357 (w = 1095), y = 784
  // Active Screen Height = 696
  const screenX = 262;
  const screenY = 88;
  const screenW = 1095;
  const screenH = 696;

  // Relative trapezoid mask (with clean rounded top corners)
  const screenMaskSvg = `
    <svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 22 0
        H 1071
        Q 1083 0 1083 12
        L ${screenW} ${screenH}
        H 0
        L 8 12
        Q 8 0 22 0
        Z
      " fill="white" />
    </svg>
  `;

  // Blackout old screen area on base (covers from y=82 down to y=788)
  const blackoutSvg = `
    <svg width="${baseW}" height="${baseH}" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 268 82
        H 1347
        L 1359 788
        H 260
        Z
      " fill="#0b0b0d" />
    </svg>
  `;

  const base1600 = await sharp(cleanMacbookBaseImg)
    .resize(baseW, baseH, { fit: 'cover', kernel: 'lanczos3' })
    .toBuffer();

  const baseClean = await sharp(base1600)
    .composite([{ input: Buffer.from(blackoutSvg), blend: 'over' }])
    .png()
    .toBuffer();

  // Resize laptop screenshot
  const laptopSourcePath = path.join(inputDir, laptopFile);
  const resizedLaptop = await sharp(laptopSourcePath)
    .resize(screenW, screenH, { fit: 'cover', position: 'north', kernel: 'lanczos3' })
    .toBuffer();

  const maskedLaptopScreen = await sharp(resizedLaptop)
    .composite([{ input: Buffer.from(screenMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // Apple Notch
  const notchW = 130;
  const notchH = 42;
  const notchX = Math.round(807.5 - notchW / 2); // 743
  const notchY = 76; // starts from the physical top bezel

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
      <!-- Center Camera & Ambient Light Sensor -->
      <circle cx="${Math.round(notchW / 2)}" cy="${Math.round(notchH / 2) + 2}" r="3.2" fill="#040608" />
      <circle cx="${Math.round(notchW / 2)}" cy="${Math.round(notchH / 2) + 2}" r="1.3" fill="#1b2432" opacity="0.8" />
      <circle cx="${Math.round(notchW / 2) + 16}" cy="${Math.round(notchH / 2) + 2}" r="1.1" fill="#121820" />
    </svg>
  `;

  const finalMacbook = await sharp(baseClean)
    .composite([
      { input: maskedLaptopScreen, left: screenX, top: screenY, blend: 'over' },
      { input: Buffer.from(notchSvg), left: notchX, top: notchY, blend: 'over' }
    ])
    .png({ quality: 100 })
    .toBuffer();

  // Save standalone clean MacBook mockup
  const outPath = path.join(laptopOutDir, `${projectKey}-macbook-mockup.png`);
  await sharp(finalMacbook)
    .toFile(outPath);

  console.log(`[Success] Saved Clean MacBook: ${outPath}`);
}

// -------------------------------------------------------------
// 2. GENERATE SAMSUNG GALAXY S25/S26 ULTRA STANDALONE MOCKUP
// Titanium frame, iconic sharp boxy corners, punch-hole camera, ultra slim bezels
// -------------------------------------------------------------
async function generateSamsungUltraMockup({ mobileFile, projectKey, customMobileBuffer = null }) {
  console.log(`Generating Samsung S26 Ultra: ${projectKey}`);
  const canvasW = 1600;
  const canvasH = 1200;

  // Ultra-wide Phone Dimensions on Canvas
  const phoneW = 540;
  const phoneH = 1100;
  const phoneX = Math.round((canvasW - phoneW) / 2);
  const phoneY = Math.round((canvasH - phoneH) / 2);

  const bezel = 12;
  const screenW = phoneW - bezel * 2; // 516
  const screenH = phoneH - bezel * 2; // 1076
  const screenX = phoneX + bezel;
  const screenY = phoneY + bezel;

  // S25/S26 Ultra has subtle 12px outer radius and 8px screen radius
  const outerR = 14;
  const screenR = 8;

  let mobileBuf;
  if (customMobileBuffer) {
    mobileBuf = customMobileBuffer;
  } else {
    mobileBuf = await autoCropMobile(path.join(inputDir, mobileFile));
  }

  // Sample top color for status bar
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

  const safeAreaTop = 46;
  const resizedMobileContent = await sharp(mobileBuf)
    .resize({ width: screenW, height: screenH - safeAreaTop, fit: 'cover', position: 'north' })
    .toBuffer();

  const punchHoleX = Math.round(screenW / 2);
  const punchHoleY = 24;

  const samsungScreenWithUi = await sharp({
    create: {
      width: screenW,
      height: screenH,
      channels: 4,
      background: { r: botPx[0], g: botPx[1], b: botPx[2], alpha: 1 }
    }
  })
    .composite([
      // Header color patch
      {
        input: await sharp({
          create: {
            width: screenW,
            height: safeAreaTop + 40,
            channels: 4,
            background: { r: bgR, g: bgG, b: bgB, alpha: 1 }
          }
        }).png().toBuffer(),
        left: 0,
        top: 0,
        blend: 'over'
      },
      // Screen content
      {
        input: resizedMobileContent,
        left: 0,
        top: safeAreaTop,
        blend: 'over'
      },
      // Samsung One UI Status Bar + Center Infinity-O Punch Hole Camera
      {
        input: Buffer.from(`
          <svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
            <!-- Status Bar Time -->
            <text x="44" y="32" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="16" font-weight="700" fill="${isLightHeader ? '#000000' : '#ffffff'}" text-anchor="middle">12:45</text>
            
            <!-- Status Bar 5G, Wifi, Battery -->
            <g fill="${isLightHeader ? '#000000' : '#ffffff'}">
              <text x="${screenW - 85}" y="32" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="13" font-weight="700">5G</text>
              <path d="M ${screenW - 55} 22 a 12 12 0 0 1 14 0 M ${screenW - 52} 26 a 8 8 0 0 1 8 0 M ${screenW - 49} 30 a 4 4 0 0 1 2 0" fill="none" stroke="${isLightHeader ? '#000000' : '#ffffff'}" stroke-width="2" stroke-linecap="round" />
              <rect x="${screenW - 32}" y="20" width="16" height="11" rx="2" fill="none" stroke="${isLightHeader ? '#000000' : '#ffffff'}" stroke-width="2" />
              <rect x="${screenW - 30}" y="22" width="10" height="7" rx="1" />
              <rect x="${screenW - 16}" y="23" width="2" height="5" rx="1" />
            </g>

            <!-- Center Infinity-O Punch Hole Camera Lens -->
            <circle cx="${punchHoleX}" cy="${punchHoleY}" r="9" fill="#000000" />
            <circle cx="${punchHoleX}" cy="${punchHoleY}" r="8" fill="#080c14" />
            <circle cx="${punchHoleX}" cy="${punchHoleY}" r="4.5" fill="#0f172a" />
            <circle cx="${punchHoleX - 1.5}" cy="${punchHoleY - 1.5}" r="1.8" fill="#38bdf8" opacity="0.6" />

            <!-- Samsung Navigation Gesture Bar -->
            <rect x="${Math.round(screenW / 2) - 60}" y="${screenH - 14}" width="120" height="4" rx="2" fill="${isLightHeader ? '#000000' : '#ffffff'}" opacity="0.55" />
          </svg>
        `),
        blend: 'over'
      },
      // Screen rounded corners
      {
        input: Buffer.from(`
          <svg width="${screenW}" height="${screenH}" xmlns="http://www.w3.org/2000/svg">
            <rect width="${screenW}" height="${screenH}" rx="${screenR}" fill="white" />
          </svg>
        `),
        blend: 'dest-in'
      }
    ])
    .png()
    .toBuffer();

  // Premium Studio Canvas with Soft Pedestal Shadow & Samsung Titanium Frame
  const backgroundAndFrameSvg = `
    <svg width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Studio Radial Background -->
        <radialGradient id="bgGrad" cx="50%" cy="45%" r="75%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="60%" stop-color="#e2e8f0" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </radialGradient>

        <!-- Dynamic Drop Shadow for Phone -->
        <filter id="ultraShadow" x="-30%" y="-20%" width="160%" height="150%">
          <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#0f172a" flood-opacity="0.32" />
          <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#0f172a" flood-opacity="0.18" />
        </filter>

        <!-- Titanium Frame Gradient -->
        <linearGradient id="titaniumFrame" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#64748b" />
          <stop offset="25%" stop-color="#94a3b8" />
          <stop offset="50%" stop-color="#475569" />
          <stop offset="75%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#334155" />
        </linearGradient>

        <!-- Inner Bezel Dark Glass -->
        <linearGradient id="innerBezel" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#0f172a" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${canvasW}" height="${canvasH}" fill="url(#bgGrad)" />

      <!-- Shadow -->
      <rect x="${phoneX}" y="${phoneY}" width="${phoneW}" height="${phoneH}" rx="${outerR}" fill="#000000" filter="url(#ultraShadow)" />

      <!-- Titanium Edge Border (S25/S26 Ultra boxy design) -->
      <rect x="${phoneX}" y="${phoneY}" width="${phoneW}" height="${phoneH}" rx="${outerR}" fill="url(#titaniumFrame)" stroke="#475569" stroke-width="2" />
      
      <!-- Inner Bezel -->
      <rect x="${phoneX + 4}" y="${phoneY + 4}" width="${phoneW - 8}" height="${phoneH - 8}" rx="${outerR - 2}" fill="url(#innerBezel)" />

      <!-- Top Speaker Micro Slit -->
      <rect x="${phoneX + Math.round(phoneW / 2) - 30}" y="${phoneY + 6}" width="60" height="2" rx="1" fill="#1e293b" />
    </svg>
  `;

  const assembledSamsung = await sharp(Buffer.from(backgroundAndFrameSvg))
    .composite([
      { input: samsungScreenWithUi, left: screenX, top: screenY, blend: 'over' }
    ])
    .png({ quality: 100 })
    .toBuffer();

  const outPath = path.join(mobileOutDir, `${projectKey}-samsung-s26-ultra-mockup.png`);
  await sharp(assembledSamsung).toFile(outPath);
  console.log(`[Success] Saved Samsung Ultra: ${outPath}`);
}

// -------------------------------------------------------------
// 3. GENERATE APPLE IMAC DESKTOP STANDALONE MOCKUP (Latest 24" iMac Retina 4.5K)
// Ultra-thin aluminum profile, white bezels/accents, iconic chin & aluminum pedestal stand
// -------------------------------------------------------------
async function generateAppleDesktopMockup({ laptopFile, projectKey }) {
  console.log(`Generating Apple iMac Desktop: ${projectKey}`);
  const canvasW = 1600;
  const canvasH = 1200;

  // iMac Proportions
  const displayW = 1260;
  const displayH = 820;
  const displayX = Math.round((canvasW - displayW) / 2); // 170
  const displayY = 100;

  const bezelBorder = 16;
  const chinH = 130; // Iconic Apple iMac bottom chin
  const screenW = displayW - bezelBorder * 2; // 1228
  const screenH = displayH - bezelBorder - chinH; // 674
  const screenX = displayX + bezelBorder;
  const screenY = displayY + bezelBorder;

  // Stand Dimensions
  const standW = 260;
  const standH = 210;
  const standX = Math.round((canvasW - standW) / 2);
  const standY = displayY + displayH; // 920

  const baseFootW = 340;
  const baseFootH = 34;
  const baseFootX = Math.round((canvasW - baseFootW) / 2);
  const baseFootY = standY + standH - 20; // 1110

  // Resize desktop screenshot into iMac Screen
  const laptopSourcePath = path.join(inputDir, laptopFile);
  const resizedScreen = await sharp(laptopSourcePath)
    .resize(screenW, screenH, { fit: 'cover', position: 'north' })
    .toBuffer();

  // High-End Apple iMac Studio Setup SVG
  const imacFrameAndStandSvg = `
    <svg width="${canvasW}" height="${canvasH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <!-- Studio Radial Background -->
        <radialGradient id="desktopBgGrad" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="55%" stop-color="#f1f5f9" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </radialGradient>

        <!-- Soft Ambient Ground Shadow for Stand -->
        <radialGradient id="deskGroundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stop-color="#0f172a" stop-opacity="0.35" />
          <stop offset="60%" stop-color="#0f172a" stop-opacity="0.12" />
          <stop offset="100%" stop-color="#0f172a" stop-opacity="0" />
        </radialGradient>

        <!-- Display Drop Shadow onto Stand -->
        <filter id="imacDisplayShadow" x="-15%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="0" dy="24" stdDeviation="28" flood-color="#0f172a" flood-opacity="0.25" />
          <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.15" />
        </filter>

        <!-- Anodized Aluminum Stand Gradient -->
        <linearGradient id="aluminumStand" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stop-color="#e2e8f0" />
          <stop offset="35%" stop-color="#f8fafc" />
          <stop offset="70%" stop-color="#cbd5e1" />
          <stop offset="100%" stop-color="#94a3b8" />
        </linearGradient>

        <!-- Iconic iMac Silver/White Chin Gradient -->
        <linearGradient id="imacChin" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f8fafc" />
          <stop offset="50%" stop-color="#e2e8f0" />
          <stop offset="100%" stop-color="#cbd5e1" />
        </linearGradient>

        <!-- Modern Dark Glass Front Bezel -->
        <linearGradient id="darkGlass" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#090d16" />
          <stop offset="100%" stop-color="#020617" />
        </linearGradient>
      </defs>

      <!-- Background -->
      <rect width="${canvasW}" height="${canvasH}" fill="url(#desktopBgGrad)" />

      <!-- Ground Shadow underneath Stand Base -->
      <ellipse cx="${Math.round(canvasW / 2)}" cy="${baseFootY + 28}" rx="${Math.round(baseFootW * 0.75)}" ry="18" fill="url(#deskGroundShadow)" />

      <!-- Aluminum Stand Arm -->
      <path d="
        M ${standX + 24} ${standY - 30}
        L ${standX + standW - 24} ${standY - 30}
        L ${standX + standW} ${standY + standH}
        L ${standX} ${standY + standH}
        Z
      " fill="url(#aluminumStand)" />

      <!-- Stand Cable Passthrough Cutout -->
      <ellipse cx="${Math.round(canvasW / 2)}" cy="${standY + 110}" rx="18" ry="24" fill="#64748b" opacity="0.3" />

      <!-- Stand Foot Plate -->
      <rect x="${baseFootX}" y="${baseFootY}" width="${baseFootW}" height="${baseFootH}" rx="6" fill="url(#aluminumStand)" stroke="#94a3b8" stroke-width="1.5" />

      <!-- Main Display Body (with deep drop shadow) -->
      <rect x="${displayX}" y="${displayY}" width="${displayW}" height="${displayH}" rx="24" fill="#000000" filter="url(#imacDisplayShadow)" />

      <!-- Outer Aluminum Trim -->
      <rect x="${displayX}" y="${displayY}" width="${displayW}" height="${displayH}" rx="24" fill="url(#aluminumStand)" stroke="#94a3b8" stroke-width="1.5" />

      <!-- Front Dark Glass Bezel -->
      <rect x="${displayX + 3}" y="${displayY + 3}" width="${displayW - 6}" height="${displayH - chinH - 3}" rx="21" fill="url(#darkGlass)" />

      <!-- Iconic iMac Bottom Chin (Anodized Aluminum) -->
      <path d="
        M ${displayX + 3} ${displayY + displayH - chinH}
        H ${displayX + displayW - 3}
        V ${displayY + displayH - 24}
        Q ${displayX + displayW - 3} ${displayY + displayH - 3} ${displayX + displayW - 24} ${displayY + displayH - 3}
        H ${displayX + 24}
        Q ${displayX + 3} ${displayY + displayH - 3} ${displayX + 3} ${displayY + displayH - 24}
        Z
      " fill="url(#imacChin)" />

      <!-- Subtle Apple Logo on Chin -->
      <g fill="#94a3b8" opacity="0.65" transform="translate(${Math.round(canvasW / 2) - 14}, ${displayY + displayH - Math.round(chinH / 2) - 18}) scale(0.055)">
        <path d="M318 617c-26-4-59-19-86-39-35-25-54-46-95-104-58-82-84-171-80-272 5-115 54-206 142-263 43-28 72-37 131-41 53-3 81 1 127 18 51 18 80 23 125 21 44-2 71-7 122-25 43-15 76-19 123-14 91 9 164 54 213 130 18 28 32 60 41 93 4 14 6 27 6 30 0 4-13 13-33 24-58 31-97 80-117 146-23 75-14 150 25 218 27 46 68 83 118 107 19 9 20 10 13 24-34 68-79 127-139 181-42 38-71 58-111 77-51 24-100 29-158 15-32-8-66-8-99 0-38 10-75 12-117 4-10-2-24-5-30-7z m216-724c-1-5-1-12 0-16 6-40 28-86 63-128 36-44 87-80 144-102 24-9 47-15 75-19 6-1 11-1 11 0 0 6-3 26-9 47-15 52-47 104-89 146-44 43-98 72-159 86-22 5-34 3-36-14z"/>
      </g>

      <!-- FaceTime HD Camera at Top Center -->
      <circle cx="${Math.round(canvasW / 2)}" cy="${displayY + 10}" r="4.5" fill="#020617" />
      <circle cx="${Math.round(canvasW / 2)}" cy="${displayY + 10}" r="1.8" fill="#1e293b" opacity="0.8" />
      <circle cx="${Math.round(canvasW / 2) + 16}" cy="${displayY + 10}" r="1.2" fill="#0f172a" />
    </svg>
  `;

  const assembledDesktop = await sharp(Buffer.from(imacFrameAndStandSvg))
    .composite([
      { input: resizedScreen, left: screenX, top: screenY, blend: 'over' }
    ])
    .png({ quality: 100 })
    .toBuffer();

  const outPath = path.join(desktopOutDir, `${projectKey}-apple-imac-desktop-mockup.png`);
  await sharp(assembledDesktop).toFile(outPath);
  console.log(`[Success] Saved Apple Desktop: ${outPath}`);
}

// -------------------------------------------------------------
// RUN ALL 21 MOCKUPS (7 PROJECTS x 3 DEVICES)
// -------------------------------------------------------------
async function runAll21Mockups() {
  console.log('==================================================');
  console.log('STARTING GENERATION OF 21 SEPARATE DEVICE MOCKUPS');
  console.log('==================================================');

  // Meragadi custom mobile buffer
  const cleanMeragadiMobile = await sharp('public/images/projects/meragadi-mobile.webp')
    .extract({ left: 505, top: 138, width: 270, height: 540 })
    .png()
    .toBuffer();

  const projectList = [
    {
      key: 'crostini',
      laptopFile: 'crostini-laptop.png',
      mobileFile: 'crostini-mobile.png'
    },
    {
      key: 'edcl',
      laptopFile: 'edcl-laptop.png',
      mobileFile: 'edcl-mobile.png'
    },
    {
      key: 'follow-hr',
      laptopFile: 'follow-hr-laptop.png',
      mobileFile: 'follow-hr-mobile.png'
    },
    {
      key: 'follow-hr-app',
      laptopFile: 'follow-hr-app-laptop.png',
      mobileFile: 'follow-hr-jobs-mobile.png'
    },
    {
      key: 'meragadi',
      laptopFile: 'meragadi-laptop.png',
      mobileFile: 'meragadi-mobile.png',
      customMobileBuffer: cleanMeragadiMobile
    },
    {
      key: 'westernloom',
      laptopFile: 'westernloom-laptop.png',
      mobileFile: 'westernloom-mobile.png'
    },
    {
      key: 'xengomart',
      laptopFile: 'xengomart-laptop.png',
      mobileFile: 'xengomart-mobile.png'
    }
  ];

  for (const p of projectList) {
    console.log(`\n>>> Processing Project: [${p.key}] <<<`);

    // 1. Mobile: Samsung Galaxy S26 Ultra
    await generateSamsungUltraMockup({
      mobileFile: p.mobileFile,
      projectKey: p.key,
      customMobileBuffer: p.customMobileBuffer || null
    });

    // 2. Laptop: Apple Latest MacBook Pro
    await generateMacbookMockup({
      laptopFile: p.laptopFile,
      projectKey: p.key
    });

    // 3. Desktop: Apple Latest iMac 24"
    await generateAppleDesktopMockup({
      laptopFile: p.laptopFile,
      projectKey: p.key
    });
  }

  console.log('\n==================================================');
  console.log('ALL 21 MOCKUPS SUCCESSFULLY GENERATED AND SAVED!');
  console.log('Location: public/device_mockups/');
  console.log('  - public/device_mockups/mobile/   (7 images)');
  console.log('  - public/device_mockups/laptop/   (7 images)');
  console.log('  - public/device_mockups/desktop/  (7 images)');
  console.log('==================================================');
}

runAll21Mockups().catch(err => {
  console.error('Fatal error during generation:', err);
  process.exit(1);
});
