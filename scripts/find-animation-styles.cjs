const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

const regex = /style=["']([^"']*(?:opacity:\s*0|translateY|scale\()[^"']*)["']/gi;
let m;
let count = 0;
while ((m = regex.exec(html)) !== null) {
  count++;
  console.log(count, m[1]);
}
