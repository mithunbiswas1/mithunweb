const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildPerfectMockup() {
  const baseImgPath = path.resolve('public/example_image/Screenshot_2.png');
  const desktopImgPath = path.resolve('public/example_image/fhr_dt.png');
  const userMobilePath = path.resolve('public/example_image/user_mobile_perfect_crop.png');
  const outPath1 = path.resolve('public/example_image/followhr-100-percent-mockup.png');
  const outPath2 = path.resolve('public/images/projects/followhr-100-percent-mockup.png');

  console.log('1. Preparing 2X Base Canvas...');
  const base2xMeta = { width: 1782, height: 1336 };
  const base2x = await sharp(baseImgPath)
    .resize(base2xMeta.width, base2xMeta.height, { kernel: 'lanczos3' })
    .png()
    .toBuffer();

  const scale = 2;
  const laptopX = 147 * scale; // 294
  const laptopY = 49 * scale;  // 98
  const laptopW = 602 * scale; // 1204
  const laptopH = 388 * scale; // 776

  // Laptop Notch
  const notchW = 146;
  const notchH = 36;
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

  const resizedDesktop = await sharp(desktopImgPath)
    .resize(laptopW, laptopH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const maskedLaptopScreen = await sharp(resizedDesktop)
    .composite([
      { input: Buffer.from(laptopMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  console.log('2. Preparing Phone Screen with User Mobile Screenshot...');
  const phoneScrW = 149 * scale; // 298
  const phoneScrH = 324 * scale; // 648
  const phoneScrX = 560 * scale; // 1120
  const phoneScrY = 270 * scale; // 540

  const phoneOuterX = 553 * scale; // 1106
  const phoneOuterY = 264 * scale; // 528
  const phoneOuterW = 163 * scale; // 326
  const phoneOuterH = 337 * scale; // 674

  // Sample colors from user image
  const topPx = await sharp(userMobilePath).extract({ left: 10, top: 10, width: 1, height: 1 }).raw().toBuffer();
  const botPx = await sharp(userMobilePath).extract({ left: 10, top: 660, width: 1, height: 1 }).raw().toBuffer();

  // Resize user mobile content strictly by width (298px)
  const resizedMobile = await sharp(userMobilePath)
    .resize({ width: phoneScrW, fit: 'inside' })
    .toBuffer();

  const rMeta = await sharp(resizedMobile).metadata();
  console.log('Resized mobile size:', rMeta.width, rMeta.height);

  const topPad = 12; // Small breathing room at top
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
      // Mobile screenshot content (100% visible, no cut off letters!)
      {
        input: resizedMobile,
        left: 0,
        top: topPad,
        blend: 'over'
      },
      // Hardware Dynamic Island pill + Home Bar (NO fake status bar text)
      {
        input: Buffer.from(`
          <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
            <!-- Dynamic Island -->
            <rect x="${Math.round(phoneScrW/2) - 34}" y="8" width="68" height="18" rx="9" ry="9" fill="#000000" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="17" r="3.8" fill="#0e1422" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="17" r="1.4" fill="#1e293b" opacity="0.6" />
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

  console.log('3. Preparing Phone Body Cutout...');
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

  console.log('4. Assembling and Saving Final Mockup...');
  const assembled = await sharp(base2x)
    .composite([
      { input: maskedLaptopScreen, left: laptopX, top: laptopY, blend: 'over' },
      { input: Buffer.from(phoneShadowSvg), left: 0, top: 0, blend: 'over' },
      { input: completePhone, left: 0, top: 0, blend: 'over' }
    ])
    .png()
    .toBuffer();

  await sharp(assembled)
    .resize(1600, 1200, { kernel: 'lanczos3' })
    .png({ quality: 100 })
    .toFile(outPath1);

  fs.copyFileSync(outPath1, outPath2);
  console.log('SUCCESS! Saved to:');
  console.log('-', outPath1);
  console.log('-', outPath2);
}

buildPerfectMockup().catch(console.error);
