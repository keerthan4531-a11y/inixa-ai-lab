const fs = require('fs');
let content = fs.readFileSync('e:/inixa lab/website/src/data/inixaProducts.js', 'utf8');
content = content.replace(/export const/g, 'const');
content += '\nmodule.exports = { PRODUCTS };';
const { PRODUCTS } = eval('(function(){ ' + content + ' ; return { PRODUCTS }; })()');

const pro = PRODUCTS.find(p => p.id === 'beat-box-pro');
console.log('BEAT BOX PRO SCREENSHOTS IN INIXAPRODUCTS:');
pro.screenshots.forEach(s => {
  console.log(`- file: ${s.src.split('/').pop()}`);
  console.log(`  title: ${s.title}`);
  console.log(`  caption: ${s.caption}`);
});
