const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const UPLOADED_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/.user_uploaded';
const ARTIFACT_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660';
const OUT_DIR = path.join(__dirname, '../public/images/projects');

const BASE_MOCKUP = path.join(UPLOADED_DIR, 'media_1790590053974.png');

function getHomography(src, dst) {
  const A = [];
  const b = [];
  for (let i = 0; i < 4; i++) {
    const xs = dst[i].x, ys = dst[i].y;
    const xd = src[i].x, yd = src[i].y;
    A.push([xs, ys, 1, 0, 0, 0, -xs * xd, -ys * xd]);
    b.push(xd);
    A.push([0, 0, 0, xs, ys, 1, -xs * yd, -ys * yd]);
    b.push(yd);
  }
  const n = 8;
  for (let i = 0; i < n; i++) {
    let maxRow = i;
    for (let k = i + 1; k < n; k++) {
      if (Math.abs(A[k][i]) > Math.abs(A[maxRow][i])) maxRow = k;
    }
    const tmpA = A[i]; A[i] = A[maxRow]; A[maxRow] = tmpA;
    const tmpB = b[i]; b[i] = b[maxRow]; b[maxRow] = tmpB;
    const pivot = A[i][i];
    for (let j = i; j < n; j++) A[i][j] /= pivot;
    b[i] /= pivot;
    for (let k = 0; k < n; k++) {
      if (k !== i) {
        const factor = A[k][i];
        for (let j = i; j < n; j++) A[k][j] -= factor * A[i][j];
        b[k] -= factor * b[i];
      }
    }
  }
  return [...b, 1];
}

function pointInQuad(p, p0, p1, p2, p3) {
  function sign(p1, p2, p3) {
    return (p1.x - p3.x) * (p2.y - p3.y) - (p2.x - p3.x) * (p1.y - p3.y);
  }
  const d1 = sign(p, p0, p1);
  const d2 = sign(p, p1, p2);
  const d3 = sign(p, p2, p3);
  const d4 = sign(p, p3, p0);
  const has_neg = (d1 < 0) || (d2 < 0) || (d3 < 0) || (d4 < 0);
  const has_pos = (d1 > 0) || (d2 > 0) || (d3 > 0) || (d4 > 0);
  return !(has_neg && has_pos);
}

// 4 screen corner points on the reference MacBook image (1024x579)
const dstQuad = [
  { x: 174, y: 126 }, // Top-Left
  { x: 640, y: 8 },   // Top-Right
  { x: 638, y: 345 }, // Bottom-Right
  { x: 187, y: 494 }, // Bottom-Left
];

async function warpLaptopScreen(srcImagePath, baseRaw) {
  const W = baseRaw.info.width;
  const H = baseRaw.info.height;

  const srcW = 1600;
  const srcH = 1000;
  const srcRaw = await sharp(srcImagePath)
    .resize(srcW, srcH, { fit: 'cover', position: 'north' })
    .raw()
    .toBuffer({ resolveWithObject: true });

  const srcQuad = [
    { x: 0, y: 0 },
    { x: srcW, y: 0 },
    { x: srcW, y: srcH },
    { x: 0, y: srcH },
  ];

  const H_inv = getHomography(srcQuad, dstQuad);
  const outBuf = Buffer.from(baseRaw.data);

  const minX = Math.floor(Math.min(...dstQuad.map(p => p.x)));
  const maxX = Math.ceil(Math.max(...dstQuad.map(p => p.x)));
  const minY = Math.floor(Math.min(...dstQuad.map(p => p.y)));
  const maxY = Math.ceil(Math.max(...dstQuad.map(p => p.y)));

  for (let y = minY; y <= maxY; y++) {
    for (let x = minX; x <= maxX; x++) {
      if (pointInQuad({ x, y }, dstQuad[0], dstQuad[1], dstQuad[2], dstQuad[3])) {
        const denom = H_inv[6] * x + H_inv[7] * y + H_inv[8];
        const u = (H_inv[0] * x + H_inv[1] * y + H_inv[2]) / denom;
        const v = (H_inv[3] * x + H_inv[4] * y + H_inv[5]) / denom;

        if (u >= 0 && u < srcW - 1 && v >= 0 && v < srcH - 1) {
          const u0 = Math.floor(u), u1 = u0 + 1;
          const v0 = Math.floor(v), v1 = v0 + 1;
          const du = u - u0, dv = v - v0;

          const idx00 = (v0 * srcW + u0) * 4;
          const idx10 = (v0 * srcW + u1) * 4;
          const idx01 = (v1 * srcW + u0) * 4;
          const idx11 = (v1 * srcW + u1) * 4;

          const outIdx = (y * W + x) * 4;
          for (let c = 0; c < 3; c++) {
            const val = (1 - du) * (1 - dv) * srcRaw.data[idx00 + c] +
                        du * (1 - dv) * srcRaw.data[idx10 + c] +
                        (1 - du) * dv * srcRaw.data[idx01 + c] +
                        du * dv * srcRaw.data[idx11 + c];
            outBuf[outIdx + c] = Math.round(val);
          }
        }
      }
    }
  }

  // Crop / resize to 1280x800 for clean aspect ratio
  return sharp(outBuf, { raw: { width: W, height: H, channels: 4 } })
    .resize(1280, 724, { fit: 'contain', background: '#ffffff' })
    .extend({ top: 38, bottom: 38, left: 0, right: 0, background: '#ffffff' })
    .webp({ quality: 95 })
    .toBuffer();
}

// Generate clean mobile mockup: Smartphone floating on soft architectural gradient
async function renderCleanMobile(mobileSrcPath, brandBgColor = '#fafafa') {
  const W = 1280;
  const H = 800;
  
  // Render phone image cleanly centered with realistic soft drop shadow
  const phH = 680;
  const phoneResized = await sharp(mobileSrcPath)
    .resize({ height: phH, fit: 'inside' })
    .png()
    .toBuffer();

  const phMeta = await sharp(phoneResized).metadata();
  const phX = Math.round((W - phMeta.width) / 2);
  const phY = Math.round((H - phMeta.height) / 2);

  // Clean studio background SVG with subtle light floor gradient
  const bgSvg = `
  <svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="lightStudio" cx="50%" cy="45%" r="65%">
        <stop offset="0%" stop-color="#ffffff" />
        <stop offset="65%" stop-color="#f4f5f7" />
        <stop offset="100%" stop-color="#e9ebef" />
      </radialGradient>
      <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="24" stdDeviation="30" flood-color="#0f172a" flood-opacity="0.18" />
        <feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#0f172a" flood-opacity="0.10" />
      </filter>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#lightStudio)" />
    <!-- Ambient Shadow Underneath -->
    <ellipse cx="${W/2}" cy="${phY + phMeta.height - 8}" rx="${phMeta.width * 0.45}" ry="18" fill="#000000" opacity="0.25" filter="blur(16px)" />
  </svg>
  `;

  return sharp(Buffer.from(bgSvg))
    .composite([
      {
        input: phoneResized,
        top: phY,
        left: phX,
      }
    ])
    .webp({ quality: 95 })
    .toBuffer();
}

// Generate clean desktop web section view (uncluttered, beautiful)
async function renderCleanDesktop(desktopSrcPath) {
  const W = 1280;
  const H = 800;

  // Render high-res crisp web view
  return sharp(desktopSrcPath)
    .resize(W, H, { fit: 'cover', position: 'north' })
    .webp({ quality: 95 })
    .toBuffer();
}

async function run() {
  console.log('Loading base MacBook mockup...');
  const baseRaw = await sharp(BASE_MOCKUP).raw().toBuffer({ resolveWithObject: true });

  const PROJECTS = [
    {
      id: 'follow-hr',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790583835684.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790583973498.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_landing_project_1790581957180.jpg'),
    },
    {
      id: 'follow-hr-app',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790581574471.png'),
      mobileSrc: path.join(ARTIFACT_DIR, 'followhr_app_hero_1790582127563.jpg'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_app_project_1790581974091.jpg'),
    },
    {
      id: 'follow-hr-jobs',
      desktopSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_hero_1790582149759.jpg'),
      mobileSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_mobile_hero_1790585006887.jpg'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_project_1790581997375.jpg'),
    },
    {
      id: 'western-loom',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790586459261.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790586470398.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'western_loom_hero_1790586578977.jpg'),
    },
    {
      id: 'crostini',
      desktopSrc: path.join(ARTIFACT_DIR, 'crostini_project_card_1790585735696.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790584573595.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'crostini_project_card_1790585735696.jpg'),
    },
    {
      id: 'edcl',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790585208837.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790585272526.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'edcl_tablet_hero_1790585356505.jpg'),
    },
    {
      id: 'xengo-mart',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790587047764.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790586968403.png'),
      cardSrc: path.join(UPLOADED_DIR, 'media_1790587047764.png'),
    },
    {
      id: 'meragadi',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790587944639.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790587939046.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'meragadi_laptop_view_1790589812746.jpg'),
    },
  ];

  for (const p of PROJECTS) {
    console.log(`Building clean premium mockups for ${p.id}...`);

    // 1. Laptop View (3D MacBook on podium)
    const laptopBuf = await warpLaptopScreen(p.desktopSrc, baseRaw);
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-laptop.webp`), laptopBuf);

    // 2. Mobile View (Clean studio smartphone)
    const mobileBuf = await renderCleanMobile(p.mobileSrc);
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-mobile.webp`), mobileBuf);

    // 3. Desktop View (High-res clean web section)
    const desktopBuf = await renderCleanDesktop(p.desktopSrc);
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-desktop.webp`), desktopBuf);

    // 4. Main Project Card Image (Clean, award-winning project showcase card)
    const cardBuf = await sharp(p.cardSrc)
      .resize(1280, 800, { fit: 'cover', position: 'north' })
      .webp({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-project.webp`), cardBuf);

    console.log(`✓ Completed ${p.id}`);
  }

  console.log('All clean premium mockups built successfully!');
}

run().catch(console.error);
