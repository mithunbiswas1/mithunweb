const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function buildXengoHero() {
  const heroW = 617;
  const heroH = 1000;
  
  // Clean phone is 332 x 675
  const phoneSrc = path.join(__dirname, '../public/images/projects/xengo-clean-phone.png');
  
  // Target phone height in hero card: 740px
  const targetH = 740;
  const targetW = Math.round(targetH * (332 / 675)); // ~364px
  
  const resizedPhone = await sharp(phoneSrc)
    .resize(targetW, targetH, { fit: 'contain' })
    .png()
    .toBuffer();
    
  // Create a realistic ambient drop shadow for the phone
  const shadowPad = 80;
  const { data: pData, info: pInfo } = await sharp(resizedPhone).raw().toBuffer({ resolveWithObject: true });
  const sData = Buffer.alloc(pInfo.width * pInfo.height * 4);
  for (let i = 0; i < pInfo.width * pInfo.height; i++) {
    const alpha = pData[i * 4 + 3];
    if (alpha > 0) {
      sData[i * 4 + 0] = 0;
      sData[i * 4 + 1] = 0;
      sData[i * 4 + 2] = 0;
      sData[i * 4 + 3] = Math.round(alpha * 0.45); // shadow opacity
    }
  }
  
  const blurredShadow = await sharp(sData, { raw: { width: pInfo.width, height: pInfo.height, channels: 4 } })
    .extend({
      top: shadowPad,
      bottom: shadowPad,
      left: shadowPad,
      right: shadowPad,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .blur(25)
    .png()
    .toBuffer();

  // Create card background SVG with warm amber/gold streetwear gradient
  const heroBgSvg = Buffer.from(`
    <svg width="${heroW}" height="${heroH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="heroGrad" cx="50%" cy="35%" r="70%">
          <stop offset="0%" stop-color="#ffcb24" />
          <stop offset="50%" stop-color="#f59e0b" />
          <stop offset="100%" stop-color="#b45309" />
        </radialGradient>
      </defs>
      <rect width="${heroW}" height="${heroH}" fill="url(#heroGrad)" />
      <!-- Ambient Studio Radial Glow -->
      <ellipse cx="${heroW/2}" cy="520" rx="240" ry="320" fill="#ffffff" opacity="0.15" filter="blur(40px)" />
      <!-- Brand Heading -->
      <text x="${heroW/2}" y="140" font-family="'Impact', 'Arial Black', -apple-system, sans-serif" font-size="76" font-weight="900" fill="#111111" letter-spacing="3" text-anchor="middle">XENGO</text>
    </svg>
  `);
  
  const phoneLeft = Math.round((heroW - targetW) / 2);
  const phoneTop = 205;
  
  const shadowLeft = phoneLeft - shadowPad;
  const shadowTop = phoneTop - shadowPad + 18; // offset downward slightly

  await sharp(heroBgSvg)
    .composite([
      {
        input: blurredShadow,
        top: shadowTop,
        left: shadowLeft,
      },
      {
        input: resizedPhone,
        top: phoneTop,
        left: phoneLeft,
      }
    ])
    .webp({ quality: 95 })
    .toFile(path.join(__dirname, '../public/images/hero/xengo-hero.webp'));
    
  console.log('✓ Successfully regenerated public/images/hero/xengo-hero.webp with NO black background!');

  // Also update xengo-project.webp and xengo-mart-project.webp
  const projW = 1280;
  const projH = 720;
  const projPhoneH = 580;
  const projPhoneW = Math.round(projPhoneH * (332 / 675)); // ~285px
  
  const projPhoneResized = await sharp(phoneSrc)
    .resize(projPhoneW, projPhoneH, { fit: 'contain' })
    .png()
    .toBuffer();

  const projPhoneLeft = 820;
  const projPhoneTop = Math.round((projH - projPhoneH) / 2);

  const projBgSvg = Buffer.from(`
    <svg width="${projW}" height="${projH}" viewBox="0 0 ${projW} ${projH}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="projBg" cx="65%" cy="50%" r="75%">
          <stop offset="0%" stop-color="#ffcf33"/>
          <stop offset="60%" stop-color="#f59e0b"/>
          <stop offset="100%" stop-color="#9a3412"/>
        </radialGradient>
      </defs>
      <rect width="${projW}" height="${projH}" fill="url(#projBg)"/>
      <circle cx="960" cy="360" r="320" fill="#ffffff" opacity="0.1"/>
      <circle cx="960" cy="360" r="220" fill="#ffffff" opacity="0.08"/>
      
      <!-- Left side editorial title -->
      <g transform="translate(140, 290)">
        <rect x="-10" y="-55" width="230" height="34" rx="17" fill="#111111"/>
        <text x="105" y="-32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#ffcb24" letter-spacing="1">STREETWEAR STORE</text>
        <text x="0" y="30" font-family="'Impact', 'Arial Black', sans-serif" font-size="68" font-weight="900" fill="#111111" letter-spacing="1">XENGO MART</text>
        <text x="0" y="80" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="600" fill="#222222">Oversized Graphics &amp; Urban Apparel</text>
        <text x="0" y="115" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="400" fill="#444444">Mobile-first high conversion e-commerce experience</text>
      </g>
    </svg>
  `);

  // Shadow for project card phone
  const { data: ppData, info: ppInfo } = await sharp(projPhoneResized).raw().toBuffer({ resolveWithObject: true });
  const spData = Buffer.alloc(ppInfo.width * ppInfo.height * 4);
  for (let i = 0; i < ppInfo.width * ppInfo.height; i++) {
    const alpha = ppData[i * 4 + 3];
    if (alpha > 0) {
      spData[i * 4 + 0] = 0;
      spData[i * 4 + 1] = 0;
      spData[i * 4 + 2] = 0;
      spData[i * 4 + 3] = Math.round(alpha * 0.4);
    }
  }
  const blurredProjShadow = await sharp(spData, { raw: { width: ppInfo.width, height: ppInfo.height, channels: 4 } })
    .extend({
      top: 60,
      bottom: 60,
      left: 60,
      right: 60,
      background: { r: 0, g: 0, b: 0, alpha: 0 }
    })
    .blur(20)
    .png()
    .toBuffer();

  const projOut = await sharp(projBgSvg)
    .composite([
      {
        input: blurredProjShadow,
        top: projPhoneTop - 60 + 15,
        left: projPhoneLeft - 60,
      },
      {
        input: projPhoneResized,
        top: projPhoneTop,
        left: projPhoneLeft,
      }
    ])
    .webp({ quality: 95 })
    .toBuffer();

  fs.writeFileSync(path.join(__dirname, '../public/images/projects/xengo-project.webp'), projOut);
  fs.writeFileSync(path.join(__dirname, '../public/images/projects/xengo-mart-project.webp'), projOut);
  console.log('✓ Successfully regenerated xengo-project.webp and xengo-mart-project.webp without black background!');
}

buildXengoHero().catch(err => {
  console.error(err);
  process.exit(1);
});
