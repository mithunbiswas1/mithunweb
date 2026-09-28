const fs = require('fs');
const html = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', 'utf-8');

// Find all sections or major components
const sectionRegex = /<section\b([^>]*)>([\s\S]*?)<\/section>/gi;
let m;
let count = 0;
while ((m = sectionRegex.exec(html)) !== null) {
  count++;
  const attrs = m[1];
  const nameMatch = attrs.match(/data-framer-name="([^"]+)"/);
  const idMatch = attrs.match(/id="([^"]+)"/);
  console.log(`\n================ SECTION ${count}: [id: ${idMatch ? idMatch[1] : 'none'}] [name: ${nameMatch ? nameMatch[1] : 'none'}] ================`);
  console.log('Attrs:', attrs.trim());
  console.log('Content length:', m[2].length);
  
  // Look for interactive elements, animations, transforms
  const transforms = [...m[2].matchAll(/transform:[^;"]+/gi)].map(x => x[0]);
  console.log('Transforms found:', transforms.length);
  if (transforms.length > 0 && transforms.length < 15) {
    console.log(transforms);
  }
}
