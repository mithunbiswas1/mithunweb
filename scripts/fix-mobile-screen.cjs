const sharp = require('sharp');
const path = require('path');

async function testMobileFit() {
  const mbPath = path.resolve('public/example_image/user_mobile_cropped.png');
  const phoneScrW = 298;
  const phoneScrH = 648;

  // Resize by width = 298 (no cropping of sides!)
  const resizedMb = await sharp(mbPath)
    .resize({ width: phoneScrW, fit: 'inside' })
    .toBuffer();

  const mbMeta = await sharp(resizedMb).metadata();
  console.log('Resized mobile dims:', mbMeta.width, mbMeta.height);

  // Background cream color from the image itself
  const px = await sharp(mbPath).extract({ left: 10, top: 10, width: 1, height: 1 }).raw().toBuffer();
  console.log('Bg color:', px[0], px[1], px[2]);

  // Bottom pixel color for smooth extension
  const pxBot = await sharp(mbPath).extract({ left: 10, top: 680, width: 1, height: 1 }).raw().toBuffer();
  console.log('Bottom color:', pxBot[0], pxBot[1], pxBot[2]);

  const topPad = 14;
  const fullScreen = await sharp({
    create: {
      width: phoneScrW,
      height: phoneScrH,
      channels: 4,
      background: { r: pxBot[0], g: pxBot[1], b: pxBot[2], alpha: 1 }
    }
  })
    .composite([
      // Top header background
      {
        input: await sharp({
          create: {
            width: phoneScrW,
            height: topPad + 60,
            channels: 4,
            background: { r: px[0], g: px[1], b: px[2], alpha: 1 }
          }
        }).png().toBuffer(),
        left: 0,
        top: 0,
        blend: 'over'
      },
      // Mobile screenshot unclipped
      { input: resizedMb, left: 0, top: topPad, blend: 'over' },
      // Dynamic Island pill
      {
        input: Buffer.from(`
          <svg width="${phoneScrW}" height="${phoneScrH}" xmlns="http://www.w3.org/2000/svg">
            <rect x="${Math.round(phoneScrW/2) - 34}" y="10" width="68" height="19" rx="9.5" ry="9.5" fill="#000000" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="19.5" r="4" fill="#0e1422" />
            <circle cx="${Math.round(phoneScrW/2) + 15}" cy="19.5" r="1.5" fill="#1e293b" opacity="0.6" />
            <!-- iOS Home Indicator -->
            <rect x="${Math.round(phoneScrW/2) - 44}" y="${phoneScrH - 14}" width="88" height="4.5" rx="2.25" ry="2.25" fill="#000000" opacity="0.25" />
          </svg>
        `),
        blend: 'over'
      },
      // Corner mask
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
    .toFile('scripts/test_clean_mobile.png');

  console.log('Clean mobile test saved');
}

testMobileFit().catch(console.error);
