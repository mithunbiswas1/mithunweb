const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

const heroIdx = html.indexOf('id="hero"');
const heroEnd = html.indexOf('</section>', heroIdx);
const heroHtml = html.substring(heroIdx, heroEnd + 10);

const containerIdx = heroHtml.indexOf('framer-w4cptp-container');
if (containerIdx !== -1) {
  console.log('Inside Hero Container:\n', heroHtml.substring(containerIdx - 100, containerIdx + 3000));
} else {
  console.log('Not directly found in hero');
}

// Check scripts that define the Hero component
const scripts = [...html.matchAll(/https:\/\/framerusercontent\.com\/modules\/[a-zA-Z0-9_-]+\.js/g)].map(m => m[0]);
console.log('Framer module scripts count:', scripts.length);
console.log('First 5 scripts:', scripts.slice(0, 5));
