const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

const containerIdx = html.indexOf('framer-w4cptp-container');
const endContainer = html.indexOf('<!--/$--></div></div>', containerIdx);

console.log('Container full length:', endContainer - containerIdx);
const containerHtml = html.substring(containerIdx, containerIdx + 12000);
fs.writeFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_hero_container.html', containerHtml);

// Search for animation scripts or keyframes or custom code in the entire html
const animMatches = [...html.matchAll(/(animation:[^;]+|@keyframes\s+([a-zA-Z0-9_-]+))/gi)];
console.log('Keyframes/Animations found in page:', animMatches.length);
animMatches.slice(0, 15).forEach(m => console.log(m[0]));

// Search for script tags in html
const scriptTags = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/gi)];
console.log('Inline script tags count:', scriptTags.length);
scriptTags.forEach((s, idx) => {
  if (s[1].includes('rotate') || s[1].includes('transform') || s[1].includes('Carta') || s[1].includes('HTDzZPQFpLpc8tziDuqfq2xMg')) {
    console.log(`Script ${idx} matches hero keywords! Length:`, s[1].length);
    fs.writeFileSync(`C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/hero_script_${idx}.js`, s[1]);
  }
});
