const https = require('https');
const fs = require('fs');

const chunks = [
  'HUWNOWEVJ.b5kSBZZ0.mjs',
  'shared-lib.CW0xZGq9.mjs',
  'ppbHW2yua.CqQF2VuN.mjs',
  'Havf8Imt8.VRj5FPNc.mjs',
  'pNHG_ALSi.B6oVN1hz.mjs',
  'DbALbyDZJ.iPt7IEU3.mjs',
  'Ef64DLwsZ.B79lgemx.mjs',
  'FBkCBUItv.D-fJ8spM.mjs',
  'lm0T9lxEm.W3h8tYwj.mjs',
  'XIjV2fZvR.CnoJg8BJ.mjs',
  'p3JRfMI3F.CEb9jcch.mjs',
  'nNcEakWcS.DAo30P0O.mjs'
];

const base = 'https://framerusercontent.com/sites/7kL7YF3dkzAplGhM6Mn6dl/';

async function searchChunks() {
  for (const c of chunks) {
    const url = base + c;
    await new Promise((resolve) => {
      https.get(url, (res) => {
        let buf = '';
        res.on('data', d => buf += d);
        res.on('end', () => {
          console.log(c, 'length:', buf.length);
          if (buf.includes('Carta') || buf.includes('52.75') || buf.includes('290%') || buf.includes('HTDzZPQFpLpc8tziDuqfq2xMg')) {
            console.log('>>> MATCH FOUND IN CHUNK:', c);
            fs.writeFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/hero_chunk.mjs', buf);
          }
          resolve();
        });
      }).on('error', (e) => { console.error(e); resolve(); });
    });
  }
}

searchChunks().catch(console.error);
