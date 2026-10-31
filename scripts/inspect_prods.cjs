const fs = require('fs');
let content = fs.readFileSync('e:/inixa lab/website/src/data/inixaProducts.js', 'utf8');
content = content.replace(/export const/g, 'const');
content += '\nmodule.exports = { PRODUCTS };';
const { PRODUCTS } = eval('(function(){ ' + content + ' ; return { PRODUCTS }; })()');

console.log('=== inixaProducts.js PRODUCTS ===');
PRODUCTS.forEach(p => {
  console.log(`Product: ${p.id} (${p.name})`);
  (p.screenshots || []).forEach(s => {
    console.log(`   src: ${s.src}`);
    console.log(`   title: ${s.title}`);
    console.log(`   caption: ${s.caption}`);
  });
});
