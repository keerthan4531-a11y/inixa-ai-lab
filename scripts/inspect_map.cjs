const fs = require('fs');
const content = fs.readFileSync('e:/inixa lab/website/src/data/screenshotMap.ts', 'utf8');
const regex = /'([a-z0-9-]+)':\s*\{[\s\S]*?originalFile:\s*'([^']+)'[\s\S]*?assetPath:\s*'([^']+)'[\s\S]*?whatItShows:\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  console.log(`${m[1]} -> ${m[2]} (${m[3]}): ${m[4]}`);
}
