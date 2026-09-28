const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function createFollowHRAppHero() {
  const heroW = 617;
  const heroH = 1000;
  
  const upDir = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/.user_uploaded';
  const rawDashboardPath = path.join(upDir, 'media_1790594139202.png');
  
  // 1. Clean the dashboard screenshot (patch the tooltip toast at x: 630..860, y: 395..443 with white #ffffff)
  const { data: dData, info: dInfo } = await sharp(rawDashboardPath).raw().toBuffer({ resolveWithObject: true });
  const cleanedBuf = Buffer.from(dData);
  for (let y = 392; y < dInfo.height; y++) {
    for (let x = 625; x <= 865; x++) {
      const idx = (y * dInfo.width + x) * 4;
      cleanedBuf[idx + 0] = 255;
      cleanedBuf[idx + 1] = 255;
      cleanedBuf[idx + 2] = 255;
      cleanedBuf[idx + 3] = 255;
    }
  }

  // 2. Display screen dimensions (16:10 MacBook Pro Retina Display)
  const screenW = 512;
  const screenH = 320;
  
  // Fit dashboard inside screen with clean header and top navigation
  const screenDashboard = await sharp(cleanedBuf, { raw: { width: dInfo.width, height: dInfo.height, channels: 4 } })
    .resize(screenW, screenH, { fit: 'cover', position: 'north' })
    .png()
    .toBuffer();

  // 3. Laptop Lid & Chassis Dimensions
  const lidW = screenW + 24; // 536
  const lidH = screenH + 26; // 346
  const lidRadius = 12;

  const baseW = lidW + 36; // 572
  const baseH = 18;

  // Vertical placement
  const laptopTop = 270;
  const screenLeft = Math.round((heroW - screenW) / 2);
  const screenTop = laptopTop + 14;

  const lidLeft = Math.round((heroW - lidW) / 2);
  const lidTop = laptopTop;

  const baseLeft = Math.round((heroW - baseW) / 2);
  const baseTop = lidTop + lidH - 2;

  // 4. Construct complete SVG Card with MacBook Pro hardware vector & studio background
  const cardSvg = `
  <svg width="${heroW}" height="${heroH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <!-- Background Luxury SaaS Gradient -->
      <radialGradient id="bgGrad" cx="50%" cy="40%" r="75%">
        <stop offset="0%" stop-color="#1e1b4b" />
        <stop offset="45%" stop-color="#0f172a" />
        <stop offset="100%" stop-color="#020617" />
      </radialGradient>

      <!-- Ambient Tech Glow Behind Laptop -->
      <radialGradient id="laptopGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.25" />
        <stop offset="70%" stop-color="#4f46e5" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#312e81" stop-opacity="0" />
      </radialGradient>

      <!-- Space Gray Metallic Gradients for MacBook -->
      <linearGradient id="lidMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#383842" />
        <stop offset="50%" stop-color="#222228" />
        <stop offset="100%" stop-color="#16161a" />
      </linearGradient>

      <linearGradient id="baseMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#40404a" />
        <stop offset="35%" stop-color="#282830" />
        <stop offset="75%" stop-color="#1a1a20" />
        <stop offset="100%" stop-color="#121216" />
      </linearGradient>

      <linearGradient id="lipMetal" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#4a4a56" />
        <stop offset="100%" stop-color="#202026" />
      </linearGradient>

      <!-- Soft Drop Shadows -->
      <filter id="studioShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000000" flood-opacity="0.65" />
        <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.35" />
      </filter>
    </defs>

    <!-- Card Background -->
    <rect width="${heroW}" height="${heroH}" fill="url(#bgGrad)" />

    <!-- Ambient Glow Orb -->
    <ellipse cx="${heroW/2}" cy="${laptopTop + 180}" rx="270" ry="240" fill="url(#laptopGlow)" />

    <!-- Top Editorial Header & Branding -->
    <g transform="translate(${heroW/2}, 110)" text-anchor="middle">
      <!-- Category Pill Badge -->
      <rect x="-85" y="-35" width="170" height="28" rx="14" fill="#ffffff" fill-opacity="0.08" stroke="#ffffff" stroke-opacity="0.15" stroke-width="1" />
      <text x="0" y="-17" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#a5b4fc" letter-spacing="1.5">SAAS PLATFORM</text>
      
      <!-- Primary Heading -->
      <text x="0" y="32" font-family="'Impact', 'Arial Black', -apple-system, sans-serif" font-size="64" font-weight="900" fill="#ffffff" letter-spacing="2">FOLLOW HR APP</text>
      
      <!-- Sub-label -->
      <text x="0" y="62" font-family="system-ui, -apple-system, sans-serif" font-size="13" font-weight="400" fill="#94a3b8" letter-spacing="0.5">Enterprise Recruitment &amp; Pipeline Dashboard</text>
    </g>

    <!-- Ambient Shadow Underneath Laptop Base -->
    <ellipse cx="${heroW/2}" cy="${baseTop + baseH + 12}" rx="${baseW * 0.48}" ry="24" fill="#000000" opacity="0.65" filter="blur(22px)" />
    <ellipse cx="${heroW/2}" cy="${baseTop + baseH + 4}" rx="${baseW * 0.40}" ry="12" fill="#000000" opacity="0.5" filter="blur(8px)" />

    <!-- 1. MacBook Pro Display Lid (Outer Aluminum & Bezel) -->
    <g filter="url(#studioShadow)">
      <!-- Outer Space Gray Aluminum Shell -->
      <rect x="${lidLeft}" y="${lidTop}" width="${lidW}" height="${lidH}" rx="${lidRadius}" fill="url(#lidMetal)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
      
      <!-- Inner Glossy Black Glass Bezel -->
      <rect x="${lidLeft + 6}" y="${lidTop + 6}" width="${lidW - 12}" height="${lidH - 12}" rx="${lidRadius - 3}" fill="#08080a" />

      <!-- Top Center Camera Notch -->
      <rect x="${heroW/2 - 24}" y="${lidTop + 6}" width="48" height="9" rx="4" fill="#08080a" />
      <!-- Camera Lens Pin -->
      <circle cx="${heroW/2}" cy="${lidTop + 10.5}" r="2" fill="#181820" />
      <circle cx="${heroW/2}" cy="${lidTop + 10.5}" r="0.8" fill="#383850" />
    </g>

    <!-- 2. MacBook Pro Bottom Base Chassis -->
    <g>
      <!-- Base Main Wedge Deck -->
      <rect x="${baseLeft}" y="${baseTop}" width="${baseW}" height="${baseH}" rx="4" fill="url(#baseMetal)" stroke="rgba(255,255,255,0.12)" stroke-width="1" />
      
      <!-- Top Hinge Bar with Screen Joint -->
      <rect x="${lidLeft + 20}" y="${baseTop}" width="${lidW - 40}" height="4" rx="2" fill="#0a0a0d" />
      
      <!-- Front Lip Center Opening Thumb Notch -->
      <rect x="${heroW/2 - 34}" y="${baseTop + baseH - 4}" width="68" height="4" rx="2" fill="url(#lipMetal)" />

      <!-- Metallic Edge Highlight on Base Rim -->
      <line x1="${baseLeft + 6}" y1="${baseTop + 1}" x2="${baseLeft + baseW - 6}" y2="${baseTop + 1}" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
      <line x1="${baseLeft + 4}" y1="${baseTop + baseH}" x2="${baseLeft + baseW - 4}" y2="${baseTop + baseH}" stroke="rgba(0,0,0,0.8)" stroke-width="1" />
    </g>

    <!-- Decorative Bottom Metadata Stats -->
    <g transform="translate(${heroW/2}, 860)" text-anchor="middle">
      <rect x="-180" y="-20" width="360" height="48" rx="24" fill="#ffffff" fill-opacity="0.04" stroke="#ffffff" stroke-opacity="0.08" stroke-width="1" />
      
      <text x="-95" y="1" font-family="'Impact', -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff">10,000+</text>
      <text x="-95" y="16" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" letter-spacing="0.5">ACTIVE JOBS</text>

      <line x1="-30" y1="-8" x2="-30" y2="22" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />

      <text x="30" y="1" font-family="'Impact', -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff">3.8x</text>
      <text x="30" y="16" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" letter-spacing="0.5">SPEED HIRES</text>

      <line x1="90" y1="-8" x2="90" y2="22" stroke="#ffffff" stroke-opacity="0.12" stroke-width="1" />

      <text x="135" y="1" font-family="'Impact', -apple-system, sans-serif" font-size="16" font-weight="900" fill="#ffffff">82%</text>
      <text x="135" y="16" font-family="system-ui, sans-serif" font-size="9" fill="#94a3b8" letter-spacing="0.5">AUTOMATION</text>
    </g>
  </svg>
  `;

  // 5. Composite Screen Image into the Laptop Lid
  await sharp(Buffer.from(cardSvg))
    .composite([
      {
        input: screenDashboard,
        top: screenTop,
        left: screenLeft,
      }
    ])
    .webp({ quality: 95 })
    .toFile(path.join(__dirname, '../public/images/hero/followhr-app-hero.webp'));

  console.log('✓ Successfully created photorealistic laptop view followhr-app-hero.webp!');
}

createFollowHRAppHero().catch(err => {
  console.error(err);
  process.exit(1);
});
