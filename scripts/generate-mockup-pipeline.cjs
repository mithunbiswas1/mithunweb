const { spawnSync } = require('child_process');
const { renderHighResMockup } = require('./render-retina-mockup.cjs');
const fs = require('fs');
const path = require('path');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function captureScreenshot(url, outPath, width, height, isMobile = false) {
  const absPath = path.resolve(outPath);
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--window-size=${width},${height}`,
    `--screenshot=${absPath}`
  ];

  if (isMobile) {
    args.push('--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  }

  args.push(url);
  console.log(`[Capture] ${url} (${isMobile ? 'Mobile' : 'Desktop'}) => ${absPath}`);
  spawnSync(chromePath, args, { stdio: 'ignore' });
}

async function processUrl(url, baseName) {
  const tmpDesktop = path.resolve(__dirname, `../public/example_image/temp_dt_${Date.now()}.png`);
  const tmpMobile = path.resolve(__dirname, `../public/example_image/temp_mb_${Date.now()}.png`);
  const finalOut1 = path.resolve(__dirname, `../public/example_image/${baseName}.png`);
  const finalOut2 = path.resolve(__dirname, `../public/images/projects/${baseName}.png`);

  captureScreenshot(url, tmpDesktop, 1920, 1200, false);
  captureScreenshot(url, tmpMobile, 430, 932, true);

  await renderHighResMockup({
    desktopPath: tmpDesktop,
    mobilePath: tmpMobile,
    outputPath: finalOut1
  });

  fs.copyFileSync(finalOut1, finalOut2);
  console.log(`[Done] Saved to:\n- ${finalOut1}\n- ${finalOut2}`);

  if (fs.existsSync(tmpDesktop)) fs.unlinkSync(tmpDesktop);
  if (fs.existsSync(tmpMobile)) fs.unlinkSync(tmpMobile);
}

module.exports = { captureScreenshot, processUrl };

if (require.main === module) {
  const url = process.argv[2];
  const name = process.argv[3];
  if (!url || !name) {
    console.log('Usage: node generate-mockup-pipeline.cjs <url> <name>');
    process.exit(1);
  }
  processUrl(url, name);
}
