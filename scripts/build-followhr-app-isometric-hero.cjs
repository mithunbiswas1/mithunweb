const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 1. Homography calculation functions for 4-point projective mapping
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

async function buildFollowHRAppHero() {
  const heroW = 617;
  const heroH = 1000;

  const baseImgPath = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/western_loom_hero_1790586578977.jpg';
  const rawDashboardPath = 'C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/.user_uploaded/media_1790594139202.png';

  console.log('1. Cleaning dashboard screenshot...');
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

  console.log('2. Warping cleaned dashboard onto 3D isometric laptop screen quad...');
  // Precise screen quad in 768x1376 base image
  const dstQuad = [
    { x: 96, y: 486 },  // Top-Left
    { x: 622, y: 348 }, // Top-Right
    { x: 676, y: 834 }, // Bottom-Right
    { x: 148, y: 840 }, // Bottom-Left
  ];

  const baseRaw = await sharp(baseImgPath).raw().toBuffer({ resolveWithObject: true });
  const W = baseRaw.info.width;
  const H = baseRaw.info.height;

  const srcW = 1600;
  const srcH = 1000;
  const srcRaw = await sharp(cleanedBuf, { raw: { width: dInfo.width, height: dInfo.height, channels: 4 } })
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

          const outIdx = (y * W + x) * 3;
          for (let c = 0; c < 3; c++) {
            const val = (1 - du) * (1 - dv) * srcRaw.data[idx00 + c] +
                        du * (1 - du) * srcRaw.data[idx10 + c] +
                        (1 - du) * dv * srcRaw.data[idx01 + c] +
                        du * dv * srcRaw.data[idx11 + c];
            outBuf[outIdx + c] = Math.round(val);
          }
        }
      }
    }
  }

  console.log('3. Transforming studio background to SaaS Tech Indigo / Midnight palette...');
  const tintedBuf = Buffer.alloc(W * H * 3);

  for (let y = 0; y < H; y++) {
    const ny = y / H;
    for (let x = 0; x < W; x++) {
      const nx = x / W;
      const idx = (y * W + x) * 3;

      const r = outBuf[idx], g = outBuf[idx + 1], b = outBuf[idx + 2];
      const warmFactor = Math.max(0, Math.min(1, ((r - g) - 10) / 35)) * Math.max(0, Math.min(1, ((r - b) - 15) / 40));

      if (warmFactor > 0.08 && (y < 340 || x < 85 || x > 685 || y > 1050 || (r > 60 && (r - g) > 25))) {
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        const dx = (nx - 0.5) * 1.4;
        const dy = (ny - 0.42) * 1.1;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const glow = Math.max(0, 1 - dist);

        let baseR, baseG, baseB;
        if (ny < 0.65) {
          baseR = Math.round(14 + 28 * glow);
          baseG = Math.round(18 + 32 * glow);
          baseB = Math.round(38 + 65 * glow);
        } else {
          const floorFactor = (ny - 0.65) / 0.35;
          baseR = Math.round(16 - 6 * floorFactor);
          baseG = Math.round(18 - 6 * floorFactor);
          baseB = Math.round(28 - 10 * floorFactor);
        }

        const lumNorm = lum / 0.45;
        const finalR = Math.round(baseR * lumNorm * warmFactor + r * (1 - warmFactor));
        const finalG = Math.round(baseG * lumNorm * warmFactor + g * (1 - warmFactor));
        const finalB = Math.round(baseB * lumNorm * warmFactor + b * (1 - warmFactor));

        tintedBuf[idx + 0] = Math.min(255, Math.max(0, finalR));
        tintedBuf[idx + 1] = Math.min(255, Math.max(0, finalG));
        tintedBuf[idx + 2] = Math.min(255, Math.max(0, finalB));
      } else {
        tintedBuf[idx + 0] = r;
        tintedBuf[idx + 1] = g;
        tintedBuf[idx + 2] = b;
      }
    }
  }

  console.log('4. Resizing to 617 x 1000 and compositing top branding...');
  const baseResized = await sharp(tintedBuf, { raw: { width: W, height: H, channels: 3 } })
    .resize(heroW, heroH, { fit: 'cover', position: 'center' })
    .png()
    .toBuffer();

  const topOverlaySvg = `
  <svg width="${heroW}" height="240" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="topFade" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stop-color="#0e1124" />
        <stop offset="55%" stop-color="#11152c" />
        <stop offset="80%" stop-color="#141935" stop-opacity="0.95" />
        <stop offset="100%" stop-color="#161c3a" stop-opacity="0" />
      </linearGradient>

      <radialGradient id="titleGlow" cx="50%" cy="55%" r="50%">
        <stop offset="0%" stop-color="#6366f1" stop-opacity="0.30" />
        <stop offset="70%" stop-color="#4f46e5" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#312e81" stop-opacity="0" />
      </radialGradient>
    </defs>

    <rect width="${heroW}" height="240" fill="url(#topFade)" />
    <ellipse cx="${heroW/2}" cy="95" rx="220" ry="55" fill="url(#titleGlow)" />

    <!-- Category Pill -->
    <rect x="${Math.round(heroW/2 - 68)}" y="44" width="136" height="24" rx="12" fill="#4f46e5" fill-opacity="0.22" stroke="#6366f1" stroke-opacity="0.45" stroke-width="1" />
    <text x="${heroW/2}" y="60" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="10.5" font-weight="700" fill="#a5b4fc" letter-spacing="2.5" text-anchor="middle">SAAS PLATFORM</text>

    <!-- Main Bold Uppercase Title identical in weight and style to WESTERN LOOM -->
    <text x="${heroW/2}" y="112" font-family="'Impact', 'Arial Black', -apple-system, sans-serif" font-size="52" font-weight="900" fill="#ffffff" letter-spacing="3" text-anchor="middle">FOLLOW HR APP</text>

    <!-- Subtitle -->
    <text x="${heroW/2}" y="142" font-family="'Plus Jakarta Sans', -apple-system, sans-serif" font-size="13" font-weight="500" fill="#94a3b8" letter-spacing="1.2" text-anchor="middle">Recruitment &amp; Talent Analytics</text>
  </svg>
  `;

  const finalHeroWebp = await sharp(baseResized)
    .composite([
      {
        input: Buffer.from(topOverlaySvg),
        top: 0,
        left: 0,
      }
    ])
    .webp({ quality: 95 })
    .toBuffer();

  const outHeroPath = path.join(__dirname, '../public/images/hero/followhr-app-hero.webp');
  fs.writeFileSync(outHeroPath, finalHeroWebp);
  console.log('✓ Successfully wrote public/images/hero/followhr-app-hero.webp');
}

buildFollowHRAppHero().catch(err => {
  console.error(err);
  process.exit(1);
});
