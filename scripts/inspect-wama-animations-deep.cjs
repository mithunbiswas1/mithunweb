const fs = require('fs');
const js = fs.readFileSync('C:/Users/HP/.gemini/antigravity-ide/brain/b2025ed1-ef30-4566-afe2-d920e6e84660/scratch/wama_hero_component.mjs', 'utf-8');

// Search for variant animations or framer motion definitions in the bundle
const animKeys = ['variants', 'whileHover', 'whileInView', 'whileTap', 'viewport', 'transition', 'animate', 'initial'];

console.log('Searching for Framer Motion variant definitions:');
const variantMatches = [...js.matchAll(/variants:\{([^}]+)\}/g)].map(m => m[0]);
console.log('Variants found:', variantMatches.length);
variantMatches.slice(0, 10).forEach((v, i) => console.log(`Variant ${i}:\n`, v));

// Search for transitions
const transitionMatches = [...js.matchAll(/transition:\{([^}]+)\}/g)].map(m => m[0]);
console.log('Transitions found:', transitionMatches.length);
transitionMatches.slice(0, 10).forEach((t, i) => console.log(`Transition ${i}:\n`, t));

// Search for scroll animations or parallax
const scrollMatches = [...js.matchAll(/(useScroll|useTransform|useSpring)[^;]+;/g)].map(m => m[0]);
console.log('Scroll hooks found:', scrollMatches.length);
scrollMatches.slice(0, 5).forEach((s, i) => console.log(`Scroll hook ${i}:\n`, s));
