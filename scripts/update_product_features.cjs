const fs = require('fs');

let content = fs.readFileSync('e:/inixa lab/website/src/data/inixaProducts.js', 'utf8');
content = content.replace(/export const/g, 'const');
content += '\nmodule.exports = { PRODUCTS };';
const { PRODUCTS } = eval('(function(){ ' + content + ' ; return { PRODUCTS }; })()');

// Map of product file to its ID
const fileMap = {
  'beatbox-pro': 'e:/inixa lab/website/src/data/products/beatbox-pro.ts',
  'beatbox-lite': 'e:/inixa lab/website/src/data/products/beatbox-lite.ts',
  'bearbox-ultra': 'e:/inixa lab/website/src/data/products/bearbox-ultra.ts',
  'clipster': 'e:/inixa lab/website/src/data/products/clipster.ts',
  'inixa-ai': 'e:/inixa lab/website/src/data/products/inixa-ai.ts',
  'liquid-stream': 'e:/inixa lab/website/src/data/products/liquid-stream.ts',
  'lumina': 'e:/inixa lab/website/src/data/products/lumina.ts',
  'mytube': 'e:/inixa lab/website/src/data/products/mytube.ts'
};

const idToProdId = {
  'beatbox-pro': 'beat-box-pro',
  'beatbox-lite': 'beat-box-lite',
  'bearbox-ultra': 'beat-box-ultra',
  'clipster': 'clipster',
  'inixa-ai': 'inixa-ai',
  'liquid-stream': 'liquid-stream',
  'lumina': 'lumina',
  'mytube': 'my-tube'
};

for (const [key, filePath] of Object.entries(fileMap)) {
  const p = PRODUCTS.find(x => x.id === idToProdId[key]);
  if (!p || !fs.existsSync(filePath)) continue;

  console.log(`Updating ${key}... (${p.screenshots.length} shots)`);

  let code = fs.readFileSync(filePath, 'utf8');
  
  // Build new features array
  const newFeatures = p.screenshots.map((s, idx) => {
    return {
      id: `feature-${idx + 1}`,
      title: s.title,
      description: s.caption,
      icon: 'Smartphone',
      screenshotKey: `shot-${idx + 1}`,
      badge: 'VERIFIED HARDWARE'
    };
  });

  const featuresJson = JSON.stringify(newFeatures, null, 4);

  // Replace features: [ ... ] in code
  code = code.replace(/features:\s*\[[\s\S]*?\n\s*\],\n\s*specs:/, `features: ${featuresJson},\n  specs:`);
  
  fs.writeFileSync(filePath, code, 'utf8');
}

console.log('Finished updating all product data files!');
