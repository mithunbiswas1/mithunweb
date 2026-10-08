const https = require('https');
const http = require('http');

const urls = [
  'https://followhr.com/',
  'https://app.followhr.com/',
  'https://followhrjobs.com/',
  'https://logicraftit.org/',
  'https://westernloom.com/',
  'https://xengomart.com/',
  'https://meragadi.com/'
];

urls.forEach(u => {
  const mod = u.startsWith('https') ? https : http;
  const req = mod.get(u, { timeout: 5000 }, res => {
    console.log(u, '=> STATUS:', res.statusCode);
  });
  req.on('error', e => console.log(u, '=> ERROR:', e.message));
  req.on('timeout', () => { req.destroy(); console.log(u, '=> TIMEOUT'); });
});
