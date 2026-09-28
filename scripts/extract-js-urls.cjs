const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

const jsUrls = [...html.matchAll(/https:\/\/framerusercontent\.com\/[^\s"']+\.js/g)].map(m => m[0]);
const uniqueUrls = [...new Set(jsUrls)];
console.log('Unique JS URLs:', uniqueUrls.length);
uniqueUrls.forEach((u, i) => console.log(i, u));
