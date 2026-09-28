const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const UPLOADED_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/.user_uploaded';
const ARTIFACT_DIR = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660';
const OUT_DIR = path.join(__dirname, '../public/images/projects');
const HERO_DIR = path.join(__dirname, '../public/images/hero');

const BASE_MOCKUP = path.join(UPLOADED_DIR, 'media_1790590053974.png');

// 1. Homography warp math
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

  return sharp(outBuf, { raw: { width: W, height: H, channels: 4 } })
    .resize(1280, 724, { fit: 'contain', background: '#ffffff' })
    .extend({ top: 38, bottom: 38, left: 0, right: 0, background: '#ffffff' })
    .webp({ quality: 95 })
    .toBuffer();
}

// 2. Cutout helper for phone screenshots with dark borders
async function createPhoneCutout(imagePath) {
  const { data, info } = await sharp(imagePath).raw().toBuffer({ resolveWithObject: true });
  const w = info.width;
  const h = info.height;

  const visited = new Uint8Array(w * h);
  const queue = [0, w - 1, (h - 1) * w, (h - 1) * w + w - 1];
  for (const idx of queue) visited[idx] = 1;

  let head = 0;
  while(head < queue.length) {
    const idx = queue[head++];
    const x = idx % w;
    const y = Math.floor(idx / w);
    data[idx * 4 + 3] = 0;

    const neighbors = [
      x > 0 ? idx - 1 : -1,
      x < w - 1 ? idx + 1 : -1,
      y > 0 ? idx - w : -1,
      y < h - 1 ? idx + w : -1,
    ];

    for (const n of neighbors) {
      if (n !== -1 && !visited[n]) {
        const r = data[n * 4];
        const g = data[n * 4 + 1];
        const b = data[n * 4 + 2];
        if (Math.abs(r - 40) <= 8 && Math.abs(g - 40) <= 8 && Math.abs(b - 40) <= 8) {
          visited[n] = 1;
          queue.push(n);
        }
      }
    }
  }

  return sharp(data, { raw: { width: w, height: h, channels: 4 } }).png().toBuffer();
}

async function run() {
  console.log('1. Generating clean MeraGadi hero card...');
  const meraCutoutBuf = await createPhoneCutout(path.join(UPLOADED_DIR, 'media_1790587939046.png'));
  
  const heroW = 617;
  const heroH = 1000;
  const phW = 430;
  const phoneHero = await sharp(meraCutoutBuf).resize(phW).png().toBuffer();
  const phMeta = await sharp(phoneHero).metadata();

  const heroBgSvg = `
  <svg width="${heroW}" height="${heroH}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="heroGrad" cx="50%" cy="38%" r="70%">
        <stop offset="0%" stop-color="#b91c1c" />
        <stop offset="55%" stop-color="#450a0a" />
        <stop offset="100%" stop-color="#0a0303" />
      </radialGradient>
    </defs>
    <rect width="${heroW}" height="${heroH}" fill="url(#heroGrad)" />
    <!-- Dynamic glow -->
    <ellipse cx="${heroW/2}" cy="500" rx="260" ry="340" fill="#dc2626" opacity="0.22" filter="blur(35px)" />
    <!-- Bold Clean Typography -->
    <text x="${heroW/2}" y="145" font-family="'Impact', 'Arial Black', -apple-system, sans-serif" font-size="76" font-weight="900" fill="#ffffff" letter-spacing="2" text-anchor="middle">MERAGADI</text>
  </svg>
  `;

  await sharp(Buffer.from(heroBgSvg))
    .composite([
      {
        input: phoneHero,
        top: 220,
        left: Math.round((heroW - phMeta.width) / 2),
      }
    ])
    .webp({ quality: 95 })
    .toFile(path.join(HERO_DIR, 'meragadi-hero.webp'));

  console.log('✓ Saved clean meragadi-hero.webp');

  console.log('2. Generating clean 3D MacBook mockups for all projects...');
  const baseRaw = await sharp(BASE_MOCKUP).raw().toBuffer({ resolveWithObject: true });

  const PROJECTS = [
    {
      id: 'follow-hr',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790583835684.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_landing_project_1790581957180.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790583973498.png'),
    },
    {
      id: 'follow-hr-app',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790581574471.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_app_project_1790581974091.jpg'),
      mobileSrc: path.join(ARTIFACT_DIR, 'followhr_app_hero_1790582127563.jpg'),
    },
    {
      id: 'follow-hr-jobs',
      desktopSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_hero_1790582149759.jpg'),
      cardSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_project_1790581997375.jpg'),
      mobileSrc: path.join(ARTIFACT_DIR, 'followhr_jobs_mobile_hero_1790585006887.jpg'),
    },
    {
      id: 'western-loom',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790586459261.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'western_loom_hero_1790586578977.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790586470398.png'),
    },
    {
      id: 'crostini',
      desktopSrc: path.join(ARTIFACT_DIR, 'crostini_project_card_1790585735696.jpg'),
      cardSrc: path.join(ARTIFACT_DIR, 'crostini_project_card_1790585735696.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790584573595.png'),
    },
    {
      id: 'edcl',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790585208837.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'edcl_tablet_hero_1790585356505.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790585272526.png'),
    },
    {
      id: 'xengo-mart',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790587047764.png'),
      cardSrc: path.join(UPLOADED_DIR, 'media_1790587047764.png'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790586968403.png'),
    },
    {
      id: 'meragadi',
      desktopSrc: path.join(UPLOADED_DIR, 'media_1790587944639.png'),
      cardSrc: path.join(ARTIFACT_DIR, 'meragadi_laptop_view_1790589812746.jpg'),
      mobileSrc: path.join(UPLOADED_DIR, 'media_1790587939046.png'),
    },
  ];

  for (const p of PROJECTS) {
    console.log(`Processing ${p.id}...`);

    // 1. Laptop: 3D MacBook on podium (Image 1 style)
    const laptopBuf = await warpLaptopScreen(p.desktopSrc, baseRaw);
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-laptop.webp`), laptopBuf);

    // 2. Desktop: Crisp direct web UI
    const deskBuf = await sharp(p.desktopSrc)
      .resize(1280, 800, { fit: 'cover', position: 'north' })
      .webp({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-desktop.webp`), deskBuf);

    // 3. Mobile: Clean cutout / mobile view
    let mobCutout;
    if (p.id === 'meragadi') {
      mobCutout = meraCutoutBuf;
    } else if (p.id === 'xengo-mart') {
      mobCutout = await createPhoneCutout(p.mobileSrc);
    } else {
      mobCutout = await sharp(p.mobileSrc).png().toBuffer();
    }

    const mobResized = await sharp(mobCutout).resize({ height: 680, fit: 'inside' }).png().toBuffer();
    const mMeta = await sharp(mobResized).metadata();

    const mobBgSvg = `
    <svg width="1280" height="800" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="mobStudio" cx="50%" cy="45%" r="65%">
          <stop offset="0%" stop-color="#ffffff" />
          <stop offset="65%" stop-color="#f6f7f9" />
          <stop offset="100%" stop-color="#eaedf2" />
        </radialGradient>
      </defs>
      <rect width="1280" height="800" fill="url(#mobStudio)" />
      <ellipse cx="640" cy="${Math.round((800 - mMeta.height)/2) + mMeta.height - 10}" rx="${Math.round(mMeta.width * 0.42)}" ry="16" fill="#000000" opacity="0.22" filter="blur(14px)" />
    </svg>
    `;

    const cleanMobileBuf = await sharp(Buffer.from(mobBgSvg))
      .composite([{
        input: mobResized,
        top: Math.round((800 - mMeta.height) / 2),
        left: Math.round((1280 - mMeta.width) / 2),
      }])
      .webp({ quality: 95 })
      .toBuffer();

    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-mobile.webp`), cleanMobileBuf);

    // 4. Project Card: The clean, premium card the user loved
    const projectCardBuf = await sharp(p.cardSrc)
      .resize(1280, 800, { fit: 'cover', position: 'north' })
      .webp({ quality: 95 })
      .toBuffer();
    fs.writeFileSync(path.join(OUT_DIR, `${p.id}-project.webp`), projectCardBuf);

    console.log(`✓ Completed ${p.id}`);
  }

  console.log('All hero banners and showcase images generated successfully!');
}

run().catch(console.error);
