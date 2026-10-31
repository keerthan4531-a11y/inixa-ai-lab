const fs = require('fs');
let content = fs.readFileSync('e:/inixa lab/website/src/data/inixaProducts.js', 'utf8');
content = content.replace(/export const/g, 'const');
content += '\nmodule.exports = { PRODUCTS };';
const { PRODUCTS } = eval('(function(){ ' + content + ' ; return { PRODUCTS }; })()');

const prods = ['inixa-ai', 'beat-box-ultra', 'beat-box-pro', 'beat-box-lite', 'liquid-stream', 'clipster', 'my-tube'];

prods.forEach(id => {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) {
    console.log(`MISSING: ${id}`);
    return;
  }
  console.log(`\n========================================`);
  console.log(`PRODUCT: ${p.id} (${p.name}) - ${p.screenshots.length} shots`);
  console.log(`========================================`);
  p.screenshots.forEach((s, idx) => {
    console.log(`[${idx + 1}] ${s.src}`);
    console.log(`    Title: ${s.title}`);
    console.log(`    Caption: ${s.caption}`);
  });
});
