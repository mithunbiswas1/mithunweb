const https = require('https');
const fs = require('fs');

https.get('https://wama.com.br/', {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
  }
}, (res) => {
  let chunks = [];
  res.on('data', chunk => chunks.push(chunk));
  res.on('end', () => {
    const data = Buffer.concat(chunks).toString('utf-8');
    console.log('Status code:', res.statusCode);
    console.log('Length:', data.length);
    fs.writeFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_page.html', data);

    const idx = data.indexOf('id="hero"');
    console.log('id="hero" index:', idx);
    if (idx !== -1) {
      console.log('Hero snippet:\n', data.substring(idx - 100, idx + 1200));
    } else {
      console.log('hero id not found, looking for hero class or cards:');
      const heroIdx = data.toLowerCase().indexOf('hero');
      console.log('hero keyword at:', heroIdx);
      if (heroIdx !== -1) console.log(data.substring(heroIdx - 50, heroIdx + 400));
    }
  });
}).on('error', err => console.error(err));
