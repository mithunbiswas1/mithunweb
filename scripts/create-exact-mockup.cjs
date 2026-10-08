const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildFlawlessMockup() {
  const baseImgPath = 'public/example_image/Screenshot_2.png';
  const desktopImgPath = 'public/example_image/real_desktop.png';
  const mobileImgPath = 'public/example_image/real_mobile.png';
  const outPath = 'public/example_image/crostini-100-percent-mockup.png';

  console.log('1. Preparing Laptop Screen with perfect notch clearance...');
  const laptopX = 147;
  const laptopY = 49;
  const laptopW = 602;
  const laptopH = 388;

  // Clean SVG Notch without any mountain fringe:
  const notchSvg = `
    <svg width="74" height="20" xmlns="http://www.w3.org/2000/svg">
      <path d="
        M 0 0
        H 74
        V 14
        Q 74 19 69 19
        H 5
        Q 0 19 0 14
        Z
      " fill="#000000" />
      <!-- Camera lens -->
      <circle cx="37" cy="9.5" r="2.8" fill="#0d1117" />
      <circle cx="37" cy="9.5" r="1.2" fill="#1e293b" opacity="0.7" />
      <!-- Indicator LED (off/subtle) -->
      <circle cx="47" cy="9.5" r="0.8" fill="#161b22" />
    </svg>
  `;

  // Create laptop screen mask with top rounded corners
  const laptopMaskSvg = `
    <svg width="${laptopW}" height="${laptopH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id="screenClip">
          <path d="
            M 12 0
            H ${laptopW - 12}
            Q ${laptopW} 0 ${laptopW} 12
            V ${laptopH}
            H 0
            V 12
            Q 0 0 12 0
            Z
          " />
        </clipPath>
      </defs>
      <rect width="${laptopW}" height="${laptopH}" fill="white" clip-path="url(#screenClip)" />
    </svg>
  `;

  // Desktop screenshot placed with 16px top margin so the notch rests over the dark header
  const desktopScaledH = laptopH - 16;
  const resizedDesktopContent = await sharp(desktopImgPath)
    .resize(laptopW, desktopScaledH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const fullDesktopScreen = await sharp({
    create: {
      width: laptopW,
      height: laptopH,
      channels: 4,
      background: { r: 12, g: 12, b: 14, alpha: 1 }
    }
  })
    .composite([
      {
        input: resizedDesktopContent,
        left: 0,
        top: 16,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  const maskedLaptopScreen = await sharp(fullDesktopScreen)
    .composite([
      { input: Buffer.from(laptopMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  console.log('2. Preparing Phone Screen...');
  const phoneScrW = 149;
  const phoneScrH = 324;
  const phoneScrX = 560;
  const phoneScrY = 270;

  // Phone inner screen mask:
  const phoneMaskSvg = `
    <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
      <rect width="${phoneScrW}" height="${phoneScrH}" rx="22" ry="22" fill="white" />
    </svg>
  `;

  // Dynamic Island & Home Bar:
  const phoneUiOverlaySvg = `
    <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
      <!-- Dynamic Island Pill -->
      <rect x="${Math.round(phoneScrW / 2) - 18}" y="6" width="36" height="11" rx="5.5" ry="5.5" fill="#000000" />
      <circle cx="${Math.round(phoneScrW / 2) + 8}" cy="11.5" r="2.2" fill="#0a0f1d" />
      <circle cx="${Math.round(phoneScrW / 2) + 8}" cy="11.5" r="0.9" fill="#1e293b" opacity="0.6" />
      <!-- iOS Home Indicator -->
      <rect x="${Math.round(phoneScrW / 2) - 22}" y="313" width="44" height="2.5" rx="1.25" ry="1.25" fill="#ffffff" opacity="0.85" />
    </svg>
  `;

  const resizedMobile = await sharp(mobileImgPath)
    .resize(phoneScrW, phoneScrH, { fit: 'cover', position: 'north' })
    .toBuffer();

  const phoneScreenWithUi = await sharp(resizedMobile)
    .composite([
      { input: Buffer.from(phoneUiOverlaySvg), blend: 'over' },
      { input: Buffer.from(phoneMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  console.log('3. Preparing Phone Frame Cutout...');
  const phoneOuterX = 553;
  const phoneOuterY = 264;
  const phoneOuterW = 163;
  const phoneOuterH = 337;

  const phoneBodyMaskSvg = `
    <svg width="891" height="668" xmlns="http://www.w3.org/2000/svg">
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="32" ry="32" fill="white" />
    </svg>
  `;

  const phoneBodyCutout = await sharp(baseImgPath)
    .composite([
      { input: Buffer.from(phoneBodyMaskSvg), blend: 'dest-in' }
    ])
    .png()
    .toBuffer();

  const completePhone = await sharp(phoneBodyCutout)
    .composite([
      {
        input: phoneScreenWithUi,
        left: phoneScrX,
        top: phoneScrY,
        blend: 'over'
      }
    ])
    .png()
    .toBuffer();

  console.log('4. Assembling Final Mockup...');
  const phoneShadowSvg = `
    <svg width="891" height="668" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="phoneShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="-4" dy="6" stdDeviation="6" flood-color="#000000" flood-opacity="0.35" />
        </filter>
      </defs>
      <rect x="${phoneOuterX}" y="${phoneOuterY}" width="${phoneOuterW}" height="${phoneOuterH}" rx="32" ry="32" fill="#000000" filter="url(#phoneShadow)" opacity="0.3" />
    </svg>
  `;

  await sharp(baseImgPath)
    .composite([
      // 1. Laptop screen
      {
        input: maskedLaptopScreen,
        left: laptopX,
        top: laptopY,
        blend: 'over'
      },
      // 2. Pure black MacBook notch
      {
        input: Buffer.from(notchSvg),
        left: 412,
        top: 48,
        blend: 'over'
      },
      // 3. Ambient phone shadow
      {
        input: Buffer.from(phoneShadowSvg),
        left: 0,
        top: 0,
        blend: 'over'
      },
      // 4. Phone with real mobile screen
      {
        input: completePhone,
        left: 0,
        top: 0,
        blend: 'over'
      }
    ])
    .png()
    .toFile(outPath);

  console.log('SUCCESS! Saved flawless mockup to:', outPath);

  // Copy to public/images/projects
  await sharp(outPath)
    .toFile('public/images/projects/crostini-100-percent-mockup.png');
}

buildFlawlessMockup().catch(err => console.error(err));
