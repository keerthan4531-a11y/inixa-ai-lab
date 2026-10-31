const fs = require('fs');
const dir = 'E:/inixa lab/BEAT-PRO';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
console.log('Total BEAT-PRO files on disk:', files.length);
files.forEach(f => {
  const stat = fs.statSync(dir + '/' + f);
  console.log(`  ${f} (${stat.size} bytes)`);
});
