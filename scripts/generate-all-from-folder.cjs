const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = path.resolve(__dirname, '../public/laptop-mobile-view');
const outputDir = path.resolve(__dirname, '../public/generated_image');
const baseImgPath = path.resolve(__dirname, '../public/example_image/example image.png');

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

async function generateMockup(laptopFile, mobileFile, outBaseName) {
  console.log(`\n========================================`);
  console.log(`Generating: ${outBaseName}`);

  const scale = 2;
  const base2xMeta = { width: 1978, height: 1302 };
  const base2x = await sharp(baseImgPath)
    .resize(base2xMeta.width, base2xMeta.height, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  // 1. LAPTOP SCREEN (exact 2x coordinates for example image.png)
  const laptopX = 178 * scale; // 356
  const laptopY = 36 * scale;  // 72
  const laptopW = 600 * scale; // 1200
  const laptopH = 387 * scale; // 774

  const notchW = 148;
  const notchH = 38;
  const notchX = Math.round(laptopW / 2 - notchW / 2);

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

  const resizedLaptop = await sharp(path.join(inputDir, laptopFile))
    .resize(laptopW, laptopH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const maskedLaptopScreen = await sharp(resizedLaptop)
    .composite([{ input: Buffer.from(laptopMaskSvg), blend: 'dest-in' }])
    .png()
    .toBuffer();

  // 2. MOBILE SCREEN (exact 2x coordinates for example image.png)
  const phoneScrW = 150 * scale; // 300
  const phoneScrH = 324 * scale; // 648
  const phoneScrX = 589 * scale; // 1178
  const phoneScrY = 256 * scale; // 512

  const phoneOuterX = 582 * scale; // 1164
  const phoneOuterY = 250 * scale; // 500
  const phoneOuterW = 163 * scale; // 326
  const phoneOuterH = 336 * scale; // 672

  // Auto-crop mobile screenshot to remove any dark snip borders
  const croppedMobileBuf = await autoCropMobile(path.join(inputDir, mobileFile));

  // Sample top and bottom colors for edge bleeding
  const topPx = await sharp(croppedMobileBuf)
    .extract({ left: 10, top: 10, width: 1, height: 1 })
    .raw()
    .toBuffer();

  const croppedMeta = await sharp(croppedMobileBuf).metadata();
  const botPx = await sharp(croppedMobileBuf)
    .extract({ left: 10, top: croppedMeta.height - 10, width: 1, height: 1 })
    .raw()
    .toBuffer();

  // Scale mobile strictly by width (300px) so no content is cropped
  const resizedMobile = await sharp(croppedMobileBuf)
    .resize({ width: phoneScrW, fit: 'inside' })
    .toBuffer();

  const rMeta = await sharp(resizedMobile).metadata();
  console.log(`Mobile content scaled: ${rMeta.width}x${rMeta.height}`);

  const topPad = 14;
  const fullPhoneScreen = await sharp({
    create: {
      width: phoneScrW,
      height: phoneScrH,
      channels: 4,
      background: { r: botPx[0], g: botPx[1], b: botPx[2], alpha: 1 }
    }
  })
    .composite([
      // Top background patch
      {
        input: await sharp({
          create: {
            width: phoneScrW,
            height: topPad + 40,
            channels: 4,
            background: { r: topPx[0], g: topPx[1], b: topPx[2], alpha: 1 }
          }
        }).png().toBuffer(),
        left: 0,
        top: 0,
        blend: 'over'
      },
      // Mobile screenshot unclipped
      {
        input: resizedMobile,
        left: 0,
        top: topPad,
        blend: 'over'
      },
      // Hardware Dynamic Island pill + Home Bar
      {
        input: Buffer.from(`
          <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
            <rect x="${Math.round(phoneScrW/2) - 34}" y="10" width="68" height="18" rx="9" ry="9" fill="#000000" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="19" r="3.8" fill="#0e1422" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="19" r="1.4" fill="#1e293b" opacity="0.6" />
            <!-- iOS Home Bar -->
            <rect x="${Math.round(phoneScrW/2) - 44}" y="${phoneScrH - 12}" width="88" height="4" rx="2" ry="2" fill="#000000" opacity="0.25" />
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

  // 3. PHONE FRAME
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
      { input: fullPhoneScreen, left: phoneScrX, top: phoneScrY, blend: 'over' }
    ])
    .png()
    .toBuffer();

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

  // 4. FINAL COMPOSITE
  const assembled = await sharp(base2x)
    .composite([
      { input: maskedLaptopScreen, left: laptopX, top: laptopY, blend: 'over' },
      { input: Buffer.from(phoneShadowSvg), left: 0, top: 0, blend: 'over' },
      { input: completePhone, left: 0, top: 0, blend: 'over' }
    ])
    .png()
    .toBuffer();

  const outFilePath = path.join(outputDir, `${outBaseName}.png`);
  await sharp(assembled)
    .resize(1600, 1053, { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(outFilePath);

  console.log(`[Success] Saved to ${outFilePath}`);
}

async function runAll() {
  const pairs = [
    { laptop: 'crostini-laptop.png', mobile: 'crostini-mobile.png', name: 'crostini-mockup' },
    { laptop: 'edcl-laptop.png', mobile: 'edcl-mobile.png', name: 'edcl-mockup' },
    { laptop: 'follow-hr-laptop.png', mobile: 'follow-hr-mobile.png', name: 'follow-hr-mockup' },
    { laptop: 'follow-hr-app-laptop.png', mobile: 'follow-hr-jobs-mobile.png', name: 'follow-hr-app-mockup' },
    { laptop: 'meragadi-laptop.png', mobile: 'meragadi-mobile.png', name: 'meragadi-mockup' },
    { laptop: 'westernloom-laptop.png', mobile: 'westernloom-mobile.png', name: 'westernloom-mockup' },
    { laptop: 'xengomart-laptop.png', mobile: 'xengomart-mobile.png', name: 'xengomart-mockup' },
  ];

  for (const pair of pairs) {
    await generateMockup(pair.laptop, pair.mobile, pair.name);
  }

  console.log('\nAll 7 mockups generated in public/generated_image/ successfully!');
}

runAll().catch(console.error);
