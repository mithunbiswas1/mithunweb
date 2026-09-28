const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const UPLOADED_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/.user_uploaded';
const ARTIFACT_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660';
const OUT_DIR = path.join(__dirname, '../public/images/projects');

if (!fs.existsSync(OUT_DIR)) {
  fs.mkdirSync(OUT_DIR, { recursive: true });
}

const PROJECTS_CONFIG = [
  {
    id: 'follow-hr',
    title: 'Follow HR',
    domain: 'followhr.com',
    category: 'AI Recruitment Platform',
    primaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    bgColor: '#080a14',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790583835684.png'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790583973498.png'),
  },
  {
    id: 'follow-hr-app',
    title: 'Follow HR App',
    domain: 'app.followhr.com',
    category: 'SaaS Talent Pipeline',
    primaryColor: '#3b82f6',
    accentColor: '#06b6d4',
    bgColor: '#060d1a',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790581574471.png'),
    mobileSrc: path.join(ARTIFACT_DIR, 'followhr_app_hero_1790582127563.jpg'),
  },
  {
    id: 'follow-hr-jobs',
    title: 'Follow HR Jobs',
    domain: 'followhrjobs.com',
    category: 'AI Job Search Marketplace',
    primaryColor: '#0ea5e9',
    accentColor: '#38bdf8',
    bgColor: '#07101e',
    desktopSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_hero_1790582149759.jpg'),
    mobileSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_mobile_hero_1790585006887.jpg'),
  },
  {
    id: 'western-loom',
    title: 'Western Loom',
    domain: 'westernloom.com',
    category: 'Handcrafted Luxury Leather',
    primaryColor: '#ea580c',
    accentColor: '#f97316',
    bgColor: '#180c06',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790586459261.png'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790586470398.png'),
  },
  {
    id: 'crostini',
    title: 'Crostini',
    domain: 'crostininb.com',
    category: 'Italian Culinary Experience',
    primaryColor: '#16a34a',
    accentColor: '#22c55e',
    bgColor: '#08140a',
    desktopSrc: path.join(ARTIFACT_DIR, 'crostini_project_card_1790585735696.jpg'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790584573595.png'),
  },
  {
    id: 'edcl',
    title: 'EDCL',
    domain: 'edcl.com.bd',
    category: 'FMCG Distribution & Commerce',
    primaryColor: '#0284c7',
    accentColor: '#38bdf8',
    bgColor: '#061320',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790585208837.png'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790585272526.png'),
  },
  {
    id: 'xengo-mart',
    title: 'Xengo Mart',
    domain: 'xengomart.com',
    category: 'Gen-Z Streetwear & Apparel',
    primaryColor: '#f59e0b',
    accentColor: '#fbbf24',
    bgColor: '#161004',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790587047764.png'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790586968403.png'),
  },
  {
    id: 'meragadi',
    title: 'MeraGadi',
    domain: 'meragadi.com',
    category: 'All-in-One Auto Marketplace',
    primaryColor: '#dc2626',
    accentColor: '#ef4444',
    bgColor: '#160606',
    desktopSrc: path.join(UPLOADED_DIR, 'media_1790587944639.png'),
    mobileSrc: path.join(UPLOADED_DIR, 'media_1790587939046.png'),
  },
];

function escapeXml(str) {
  if (!str) return '';
  return str.toString()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

// Helper to create rounded rectangle mask buffer
async function createRoundedMask(width, height, radius) {
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${width}" height="${height}" rx="${radius}" ry="${radius}" fill="#ffffff"/>
  </svg>`;
  return sharp(Buffer.from(svg)).png().toBuffer();
}

// 1. DESKTOP BROWSER MOCKUP (1280x800)
async function renderDesktopMockup(cfg) {
  const W = 1280;
  const H = 800;
  const winW = 1080;
  const winH = 650;
  const winX = Math.round((W - winW) / 2);
  const winY = 65;
  const barH = 44;
  const viewH = winH - barH;

  // Prepare browser inner content
  const screenMask = await createRoundedMask(winW, viewH, 0);
  let viewBuf;
  try {
    viewBuf = await sharp(cfg.desktopSrc)
      .resize(winW, viewH, { fit: 'cover', position: 'north' })
      .toBuffer();
  } catch (err) {
    viewBuf = await sharp(cfg.mobileSrc)
      .resize(winW, viewH, { fit: 'cover', position: 'north' })
      .toBuffer();
  }

  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="ambient" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="${cfg.primaryColor}" stop-opacity="0.32" />
        <stop offset="60%" stop-color="${cfg.bgColor}" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#050608" stop-opacity="1" />
      </radialGradient>
      <filter id="winShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="36" flood-color="#000000" flood-opacity="0.65" />
        <feDropShadow dx="0" dy="4" stdDeviation="12" flood-color="#000000" flood-opacity="0.4" />
      </filter>
      <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#242832" />
        <stop offset="100%" stop-color="#181b22" />
      </linearGradient>
    </defs>
    
    <!-- Background -->
    <rect width="${W}" height="${H}" fill="url(#ambient)" />
    
    <!-- Subtle Grid Pattern -->
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.025)" stroke-width="1"/>
    </pattern>
    <rect width="${W}" height="${H}" fill="url(#grid)" />

    <!-- Browser Window Frame with Shadow -->
    <rect x="${winX}" y="${winY}" width="${winW}" height="${winH}" rx="14" ry="14" fill="#12151c" stroke="rgba(255,255,255,0.12)" stroke-width="1.5" filter="url(#winShadow)" />
    
    <!-- Title Bar -->
    <path d="M ${winX} ${winY + 14} Q ${winX} ${winY} ${winX + 14} ${winY} L ${winX + winW - 14} ${winY} Q ${winX + winW} ${winY} ${winX + winW} ${winY + 14} L ${winX + winW} ${winY + barH} L ${winX} ${winY + barH} Z" fill="url(#barGrad)" />
    <line x1="${winX}" y1="${winY + barH}" x2="${winX + winW}" y2="${winY + barH}" stroke="rgba(255,255,255,0.08)" stroke-width="1" />

    <!-- Window Dots -->
    <circle cx="${winX + 22}" cy="${winY + 22}" r="6" fill="#ef4444" />
    <circle cx="${winX + 42}" cy="${winY + 22}" r="6" fill="#f59e0b" />
    <circle cx="${winX + 62}" cy="${winY + 22}" r="6" fill="#10b981" />

    <!-- Address Bar -->
    <rect x="${winX + 220}" y="${winY + 9}" width="${winW - 440}" height="26" rx="6" fill="#111318" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
    <text x="${winX + 240}" y="${winY + 26}" font-family="system-ui, -apple-system, sans-serif" font-size="12" fill="#94a3b8" letter-spacing="0.2">🔒 https://${escapeXml(cfg.domain)}</text>

    <!-- Top Badge -->
    <g transform="translate(48, 36)">
      <rect width="180" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="12" cy="12" r="4" fill="${cfg.accentColor}" />
      <text x="24" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#e2e8f0" letter-spacing="0.5">DESKTOP WEB VIEW</text>
    </g>
  </svg>
  `;

  return sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: viewBuf,
        top: winY + barH,
        left: winX,
      }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, `${cfg.id}-desktop.webp`));
}

// 2. LAPTOP MOCKUP (1280x800)
async function renderLaptopMockup(cfg) {
  const W = 1280;
  const H = 800;
  
  // MacBook display screen dimensions
  const scrW = 860;
  const scrH = 538;
  const scrX = Math.round((W - scrW) / 2);
  const scrY = 85;

  let viewBuf;
  try {
    viewBuf = await sharp(cfg.desktopSrc)
      .resize(scrW, scrH, { fit: 'cover', position: 'north' })
      .toBuffer();
  } catch (err) {
    viewBuf = await sharp(cfg.mobileSrc)
      .resize(scrW, scrH, { fit: 'cover', position: 'north' })
      .toBuffer();
  }

  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lapAmbient" cx="50%" cy="40%" r="65%">
        <stop offset="0%" stop-color="${cfg.accentColor}" stop-opacity="0.30" />
        <stop offset="60%" stop-color="${cfg.bgColor}" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#040508" stop-opacity="1" />
      </radialGradient>
      <filter id="lapShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="28" stdDeviation="40" flood-color="#000000" flood-opacity="0.75" />
      </filter>
      <linearGradient id="lidBezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a2e37" />
        <stop offset="100%" stop-color="#14171d" />
      </linearGradient>
      <linearGradient id="bodyGrad" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#555c6b" />
        <stop offset="20%" stop-color="#2b303a" />
        <stop offset="100%" stop-color="#171920" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="url(#lapAmbient)" />

    <!-- Lid Frame with Bezel (900x570) -->
    <g filter="url(#lapShadow)">
      <rect x="${scrX - 22}" y="${scrY - 22}" width="${scrW + 44}" height="${scrH + 34}" rx="18" fill="url(#lidBezel)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
      <!-- Top Webcam Notch -->
      <path d="M ${W/2 - 28} ${scrY - 22} L ${W/2 + 28} ${scrY - 22} L ${W/2 + 20} ${scrY - 10} L ${W/2 - 20} ${scrY - 10} Z" fill="#0c0e12" />
      <circle cx="${W/2}" cy="${scrY - 15}" r="3" fill="#1e293b" />
      <circle cx="${W/2}" cy="${scrY - 15}" r="1" fill="#38bdf8" />
    </g>

    <!-- Laptop Base Deck (1060 width) -->
    <g filter="url(#lapShadow)">
      <!-- Deck Top -->
      <rect x="${(W - 1040)/2}" y="${scrY + scrH + 12}" width="1040" height="18" rx="5" fill="url(#bodyGrad)" stroke="rgba(255,255,255,0.22)" stroke-width="1" />
      <!-- Hinge Cutout / Center Notch -->
      <path d="M ${W/2 - 70} ${scrY + scrH + 12} L ${W/2 + 70} ${scrY + scrH + 12} L ${W/2 + 55} ${scrY + scrH + 20} L ${W/2 - 55} ${scrY + scrH + 20} Z" fill="#0f1116" />
      <!-- Bottom Base Lip -->
      <rect x="${(W - 980)/2}" y="${scrY + scrH + 28}" width="980" height="8" rx="4" fill="#0d0e12" />
    </g>

    <!-- Top Badge -->
    <g transform="translate(48, 36)">
      <rect width="180" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="12" cy="12" r="4" fill="${cfg.primaryColor}" />
      <text x="24" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#e2e8f0" letter-spacing="0.5">LAPTOP WORKSTATION</text>
    </g>
  </svg>
  `;

  return sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: viewBuf,
        top: scrY,
        left: scrX,
      }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, `${cfg.id}-laptop.webp`));
}

// 3. MOBILE SMARTPHONE MOCKUP (1280x800)
async function renderMobileMockup(cfg) {
  const W = 1280;
  const H = 800;

  // iPhone dimensions
  const phW = 340;
  const phH = 680;
  const phX = Math.round((W - phW) / 2);
  const phY = 60;
  const scrW = 320;
  const scrH = 656;
  const scrX = phX + 10;
  const scrY = phY + 12;

  // Round screen corners
  const mask = await createRoundedMask(scrW, scrH, 36);
  let viewBuf = await sharp(cfg.mobileSrc)
    .resize(scrW, scrH, { fit: 'cover', position: 'north' })
    .composite([{ input: mask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="mobAmbient" cx="50%" cy="45%" r="60%">
        <stop offset="0%" stop-color="${cfg.primaryColor}" stop-opacity="0.35" />
        <stop offset="60%" stop-color="${cfg.bgColor}" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#040508" stop-opacity="1" />
      </radialGradient>
      <filter id="phShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="30" stdDeviation="35" flood-color="#000000" flood-opacity="0.8" />
        <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.5" />
      </filter>
      <linearGradient id="titanium" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stop-color="#474d5a" />
        <stop offset="50%" stop-color="#24272e" />
        <stop offset="100%" stop-color="#121417" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="url(#mobAmbient)" />

    <!-- Side Buttons -->
    <rect x="${phX - 3}" y="${phY + 110}" width="4" height="36" rx="2" fill="#3f4450" />
    <rect x="${phX - 3}" y="${phY + 160}" width="4" height="60" rx="2" fill="#3f4450" />
    <rect x="${phX - 3}" y="${phY + 230}" width="4" height="60" rx="2" fill="#3f4450" />
    <rect x="${phX + phW - 1}" y="${phY + 170}" width="4" height="85" rx="2" fill="#3f4450" />

    <!-- Phone Chassis -->
    <rect x="${phX}" y="${phY}" width="${phW}" height="${phH}" rx="46" fill="url(#titanium)" stroke="rgba(255,255,255,0.2)" stroke-width="1.8" filter="url(#phShadow)" />

    <!-- Inner Screen Bezel Border -->
    <rect x="${scrX - 2}" y="${scrY - 2}" width="${scrW + 4}" height="${scrH + 4}" rx="38" fill="#08080a" />

    <!-- Top Badge -->
    <g transform="translate(48, 36)">
      <rect width="180" height="24" rx="12" fill="rgba(255,255,255,0.08)" stroke="rgba(255,255,255,0.1)" stroke-width="1"/>
      <circle cx="12" cy="12" r="4" fill="${cfg.accentColor}" />
      <text x="24" y="16" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="600" fill="#e2e8f0" letter-spacing="0.5">MOBILE RESPONSIVE</text>
    </g>
  </svg>
  `;

  // Dynamic island overlay
  const islandSvg = `
  <svg width="${scrW}" height="${scrH}" xmlns="http://www.w3.org/2000/svg">
    <!-- Dynamic Island -->
    <rect x="${(scrW - 105)/2}" y="12" width="105" height="28" rx="14" fill="#000000" />
    <circle cx="${(scrW - 105)/2 + 82}" cy="26" r="5" fill="#111827" />
    <circle cx="${(scrW - 105)/2 + 82}" cy="26" r="2" fill="#1e3a8a" />
    <!-- Home Bar Indicator -->
    <rect x="${(scrW - 120)/2}" y="${scrH - 14}" width="120" height="4" rx="2" fill="rgba(255,255,255,0.7)" />
  </svg>
  `;
  const islandBuf = Buffer.from(islandSvg);

  return sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: viewBuf,
        top: scrY,
        left: scrX,
      },
      {
        input: islandBuf,
        top: scrY,
        left: scrX,
      }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, `${cfg.id}-mobile.webp`));
}

// 4. FLAGSHIP COMPOSITE SHOWCASE (1280x800) - Laptop + Floating Phone Overlap
async function renderFlagshipMockup(cfg) {
  const W = 1280;
  const H = 800;

  // Laptop on the left
  const lapW = 780;
  const lapH = 488;
  const lapX = 60;
  const lapY = 160;

  // Phone on the right overlapping
  const phW = 280;
  const phH = 560;
  const phX = 900;
  const phY = 120;
  const scrW = 264;
  const scrH = 540;
  const scrX = phX + 8;
  const scrY = phY + 10;

  let lapViewBuf;
  try {
    lapViewBuf = await sharp(cfg.desktopSrc)
      .resize(lapW, lapH, { fit: 'cover', position: 'north' })
      .toBuffer();
  } catch (e) {
    lapViewBuf = await sharp(cfg.mobileSrc)
      .resize(lapW, lapH, { fit: 'cover', position: 'north' })
      .toBuffer();
  }

  const mobMask = await createRoundedMask(scrW, scrH, 32);
  let mobViewBuf = await sharp(cfg.mobileSrc)
    .resize(scrW, scrH, { fit: 'cover', position: 'north' })
    .composite([{ input: mobMask, blend: 'dest-in' }])
    .png()
    .toBuffer();

  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="flagAmbient" cx="60%" cy="40%" r="70%">
        <stop offset="0%" stop-color="${cfg.primaryColor}" stop-opacity="0.38" />
        <stop offset="55%" stop-color="${cfg.bgColor}" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#040508" stop-opacity="1" />
      </radialGradient>
      <filter id="shadowHeavy" x="-30%" y="-30%" width="160%" height="160%">
        <feDropShadow dx="0" dy="32" stdDeviation="40" flood-color="#000000" flood-opacity="0.85" />
      </filter>
      <linearGradient id="metalBezel" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#2a2e37" />
        <stop offset="100%" stop-color="#14171d" />
      </linearGradient>
    </defs>

    <!-- Background -->
    <rect width="${W}" height="${H}" fill="url(#flagAmbient)" />

    <!-- Grid Accent -->
    <pattern id="dotGrid" width="32" height="32" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.06)" />
    </pattern>
    <rect width="${W}" height="${H}" fill="url(#dotGrid)" />

    <!-- Laptop Lid Frame -->
    <g filter="url(#shadowHeavy)">
      <rect x="${lapX - 16}" y="${lapY - 16}" width="${lapW + 32}" height="${lapH + 24}" rx="14" fill="url(#metalBezel)" stroke="rgba(255,255,255,0.18)" stroke-width="1.5" />
      <!-- Camera Notch -->
      <circle cx="${lapX + lapW/2}" cy="${lapY - 8}" r="2.5" fill="#38bdf8" />
    </g>

    <!-- Laptop Base -->
    <g filter="url(#shadowHeavy)">
      <rect x="${lapX - 60}" y="${lapY + lapH + 8}" width="${lapW + 120}" height="14" rx="4" fill="#20242c" stroke="rgba(255,255,255,0.18)" stroke-width="1" />
      <path d="M ${lapX + lapW/2 - 45} ${lapY + lapH + 8} L ${lapX + lapW/2 + 45} ${lapY + lapH + 8} L ${lapX + lapW/2 + 35} ${lapY + lapH + 15} L ${lapX + lapW/2 - 35} ${lapY + lapH + 15} Z" fill="#0d0f13" />
    </g>

    <!-- Floating Phone Frame -->
    <g filter="url(#shadowHeavy)">
      <!-- Chassis -->
      <rect x="${phX}" y="${phY}" width="${phW}" height="${phH}" rx="42" fill="#15171d" stroke="rgba(255,255,255,0.24)" stroke-width="2" />
      <!-- Bezel Border -->
      <rect x="${scrX - 2}" y="${scrY - 2}" width="${scrW + 4}" height="${scrH + 4}" rx="34" fill="#08080a" />
    </g>

    <!-- Header Details -->
    <g transform="translate(60, 50)">
      <rect width="130" height="26" rx="13" fill="${cfg.primaryColor}" fill-opacity="0.2" stroke="${cfg.primaryColor}" stroke-width="1"/>
      <text x="14" y="17" font-family="system-ui, -apple-system, sans-serif" font-size="11" font-weight="700" fill="#ffffff" letter-spacing="1">PROJECT CASE</text>
      
      <text x="0" y="60" font-family="system-ui, -apple-system, sans-serif" font-size="34" font-weight="800" fill="#ffffff" letter-spacing="-0.5">${escapeXml(cfg.title)}</text>
      <text x="0" y="84" font-family="system-ui, -apple-system, sans-serif" font-size="14" font-weight="400" fill="rgba(255,255,255,0.65)">${escapeXml(cfg.category)} • ${escapeXml(cfg.domain)}</text>
    </g>
  </svg>
  `;

  // Dynamic Island on Phone
  const phIslandSvg = `
  <svg width="${scrW}" height="${scrH}" xmlns="http://www.w3.org/2000/svg">
    <rect x="${(scrW - 90)/2}" y="10" width="90" height="24" rx="12" fill="#000000" />
    <circle cx="${(scrW - 90)/2 + 70}" cy="22" r="4" fill="#1e293b" />
    <rect x="${(scrW - 100)/2}" y="${scrH - 12}" width="100" height="3" rx="1.5" fill="rgba(255,255,255,0.6)" />
  </svg>
  `;

  return sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: lapViewBuf,
        top: lapY,
        left: lapX,
      },
      {
        input: mobViewBuf,
        top: scrY,
        left: scrX,
      },
      {
        input: Buffer.from(phIslandSvg),
        top: scrY,
        left: scrX,
      }
    ])
    .webp({ quality: 92 })
    .toFile(path.join(OUT_DIR, `${cfg.id}-project.webp`));
}

async function run() {
  console.log('Generating device mockups for all 8 projects...');
  for (const cfg of PROJECTS_CONFIG) {
    console.log(`Processing ${cfg.title} (${cfg.id})...`);
    await renderDesktopMockup(cfg);
    await renderLaptopMockup(cfg);
    await renderMobileMockup(cfg);
    await renderFlagshipMockup(cfg);
    console.log(`✓ Completed ${cfg.title}`);
  }
  console.log('All mockups generated successfully!');
}

run().catch(console.error);
