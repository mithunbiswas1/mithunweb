const https = require('https');
const fs = require('fs');

const moreChunks = [
  'u5zN1U5bZ.D9oElpDD.mjs',
  'a5YpZm7Ucxq3kO9icaW_7m-qngsh9RwtbPX7FzTP_ec.CH6rfOs4.mjs',
  'iIrlovOJx.Da5FnBk9.mjs',
  'pzmmTwd5o.2gmIdncX.mjs',
  'BDG2XYIKF.1oAN9chb.mjs',
  'yIuVLLkS5.DwUrW0PW.mjs',
  'xW3Htr9r_.BqitnN0r.mjs',
  '_Sg4QYaAWGxIsjL4VloovWH9FCMvQXmco3X_QG_9-wA.CFfRFb9q.mjs'
];

const base = 'https://framerusercontent.com/sites/7kL7YF3dkzAplGhM6Mn6dl/';

async function check() {
  for (const c of moreChunks) {
    await new Promise((res) => {
      https.get(base + c, (r) => {
        let data = '';
        r.on('data', d => data += d);
        r.on('end', () => {
          console.log(c, 'length:', data.length);
          if (data.includes('HTDzZPQFpLpc8tziDuqfq2xMg') || data.includes('Carta') || data.includes('52.75') || data.includes('w4cptp')) {
            console.log('>>> MATCH IN:', c);
            fs.writeFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_hero_component.mjs', data);
          }
          res();
        });
      }).on('error', () => res());
    });
  }
}
check();
