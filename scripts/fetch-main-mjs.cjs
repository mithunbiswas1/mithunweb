const https = require('https');
const fs = require('fs');

https.get('https://framerusercontent.com/sites/7kL7YF3dkzAplGhM6Mn6dl/script_main.A4nsUPqF.mjs', (res) => {
  let chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', () => {
    const data = Buffer.concat(chunks).toString('utf-8');
    console.log('script_main length:', data.length);
    fs.writeFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/script_main.mjs', data);

    // Look for imports or hero references
    const imports = [...data.matchAll(/import\s*[^;]+from\s*["']([^"']+)["']/g)].map(m => m[1]);
    console.log('Imports in script_main:', imports);
  });
}).on('error', console.error);
