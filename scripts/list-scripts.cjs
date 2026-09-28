const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

const scriptTagRegex = /<script\b([^>]*)>([\s\S]*?)<\/script>/gi;
let m;
let i = 0;
while ((m = scriptTagRegex.exec(html)) !== null) {
  i++;
  console.log(`Script ${i}: attrs=[${m[1].trim()}] content_len=${m[2].length}`);
  if (m[2].length > 0 && m[2].length < 1000) {
    console.log(m[2].trim());
  }
}
