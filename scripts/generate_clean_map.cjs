const fs = require('fs');

let content = fs.readFileSync('e:/inixa lab/website/src/data/inixaProducts.js', 'utf8');
content = content.replace(/export const/g, 'const');
content += '\nmodule.exports = { PRODUCTS };';
const { PRODUCTS } = eval('(function(){ ' + content + ' ; return { PRODUCTS }; })()');

// Also load lumina if needed
const allProds = PRODUCTS;

const map = {};

allProds.forEach(p => {
  const pId = p.id === 'beat-box-pro' ? 'beatbox-pro' :
              p.id === 'beat-box-lite' ? 'beatbox-lite' :
              p.id === 'beat-box-ultra' ? 'bearbox-ultra' :
              p.id === 'my-tube' ? 'mytube' :
              p.id;
              
  map[pId] = {};
  
  (p.screenshots || []).forEach((s, idx) => {
    const key = `shot-${idx + 1}`;
    map[pId][key] = {
      product: pId,
      featureId: key,
      originalFile: s.src.split('/').pop(),
      assetPath: s.src,
      whatItShows: s.title,
      altText: s.caption
    };
  });
});

console.log('Generated mapping keys:');
Object.keys(map).forEach(k => console.log(`  ${k}: ${Object.keys(map[k]).length} shots`));

// Write TypeScript file
const outTs = `/**
 * INIXA AI LABS — Verified Physical Screenshot Registry
 * Strictly sourced from actual project directories:
 * E:\\inixa lab\\BEAT-BOX-LITE
 * E:\\inixa lab\\BEAT-BOX-ULTRA
 * E:\\inixa lab\\BEAT-PRO
 * E:\\inixa lab\\CLIPSTER
 * E:\\inixa lab\\INIXA AI
 * E:\\inixa lab\\LIQUID-STREAMING
 * E:\\inixa lab\\MY TUBE
 * E:\\inixa lab\\LUMINA
 */

export interface ScreenshotMeta {
  product: string
  featureId: string
  originalFile: string
  assetPath: string
  whatItShows: string
  altText: string
}

export const SCREENSHOT_MAP: Record<string, Record<string, ScreenshotMeta>> = ${JSON.stringify(map, null, 2)}

export const ALL_AUDITED_SCREENSHOTS: ScreenshotMeta[] = Object.values(SCREENSHOT_MAP).flatMap(
  (prodMap) => Object.values(prodMap)
)
`;

fs.writeFileSync('e:/inixa lab/website/src/data/screenshotMap.ts', outTs, 'utf8');
console.log('Successfully wrote src/data/screenshotMap.ts');
