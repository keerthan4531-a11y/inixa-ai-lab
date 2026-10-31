const fs = require('fs');
const dir = 'e:/inixa lab/website/src/data/products';
fs.readdirSync(dir).forEach(f => {
  if (f.endsWith('.ts') && f !== 'index.ts') {
    const c = fs.readFileSync(dir + '/' + f, 'utf8');
    const nameMatch = c.match(/name:\s*'([^']+)'/);
    const idMatch = c.match(/id:\s*'([^']+)'/);
    console.log(`File: ${f} -> id: ${idMatch ? idMatch[1] : ''}, name: ${nameMatch ? nameMatch[1] : ''}`);
    const featMatches = c.match(/title:\s*'([^']+)'/g);
    console.log('   features: ' + (featMatches ? featMatches.length : 0));
  }
});
