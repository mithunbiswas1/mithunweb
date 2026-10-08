const { spawnSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

function capture(url, outPath, width, height, isMobile = false) {
  const args = [
    '--headless=new',
    '--disable-gpu',
    '--no-sandbox',
    `--window-size=${width},${height}`,
    `--screenshot=${outPath}`
  ];

  if (isMobile) {
    args.push('--user-agent=Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1');
  }

  args.push(url);

  console.log(`Capturing ${url} to ${outPath}...`);
  const res = spawnSync(chromePath, args, { stdio: 'inherit' });
  console.log(`Exit code: ${res.status}, exists: ${fs.existsSync(outPath)}`);
}

const outDir = path.join(__dirname, '../public/example_image');
capture('https://logicraftit.org/', path.join(outDir, 'real_desktop.png'), 1600, 1000, false);
capture('https://logicraftit.org/', path.join(outDir, 'real_mobile.png'), 390, 844, true);
