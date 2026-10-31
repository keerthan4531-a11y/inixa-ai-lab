import sharp from 'sharp';
import fs from 'node:fs';
import path from 'node:path';

const publicDir = path.resolve('public');
const mediaDir = path.resolve('public/media');

if (!fs.existsSync(mediaDir)) {
  fs.mkdirSync(mediaDir, { recursive: true });
}

// 1. INIXA Icon SVG (512x512)
const iconSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#00f2fe" stop-opacity="0.25" />
      <stop offset="60%" stop-color="#3b82f6" stop-opacity="0.1" />
      <stop offset="100%" stop-color="#030712" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="cyberGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="45%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="neon" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="12" result="blur1" />
      <feGaussianBlur stdDeviation="24" result="blur2" />
      <feMerge>
        <feMergeNode in="blur2" />
        <feMergeNode in="blur1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <rect width="512" height="512" rx="128" fill="#060911" stroke="rgba(255,255,255,0.12)" stroke-width="8" />
  <circle cx="256" cy="256" r="220" fill="url(#bgGlow)" />

  <g filter="url(#neon)">
    <!-- 'I' stem -->
    <line x1="160" y1="140" x2="160" y2="372" stroke="url(#cyberGrad)" stroke-width="44" stroke-linecap="round" />
    
    <!-- 'X' diagonals -->
    <line x1="260" y1="140" x2="390" y2="372" stroke="url(#cyberGrad)" stroke-width="44" stroke-linecap="round" />
    <line x1="390" y1="140" x2="260" y2="372" stroke="url(#cyberGrad)" stroke-width="44" stroke-linecap="round" />

    <!-- Luminescent nodes -->
    <circle cx="160" cy="140" r="24" fill="#00f2fe" />
    <circle cx="160" cy="372" r="24" fill="#3b82f6" />
    <circle cx="260" cy="140" r="24" fill="#00f2fe" />
    <circle cx="390" cy="140" r="24" fill="#f59e0b" />
    <circle cx="390" cy="372" r="24" fill="#f59e0b" />
    <circle cx="260" cy="372" r="24" fill="#3b82f6" />
    <circle cx="325" cy="256" r="18" fill="#ffffff" />
  </g>
</svg>
`;

// 2. INIXA Wordmark SVG (900x240 transparent)
const wordmarkSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 240" width="900" height="240" fill="none">
  <defs>
    <linearGradient id="wmGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="60%" stop-color="#f8fafc" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>
    <linearGradient id="labsGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
    <filter id="labsGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feMerge>
        <feMergeNode in="blur" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <!-- Left Icon Mark -->
  <g transform="translate(30, 25) scale(0.37)">
    <rect width="512" height="512" rx="128" fill="#080c14" stroke="rgba(255,255,255,0.18)" stroke-width="12" />
    <line x1="160" y1="140" x2="160" y2="372" stroke="#00f2fe" stroke-width="44" stroke-linecap="round" />
    <line x1="260" y1="140" x2="390" y2="372" stroke="#3b82f6" stroke-width="44" stroke-linecap="round" />
    <line x1="390" y1="140" x2="260" y2="372" stroke="#f59e0b" stroke-width="44" stroke-linecap="round" />
    <circle cx="160" cy="140" r="22" fill="#00f2fe" />
    <circle cx="390" cy="140" r="22" fill="#f59e0b" />
    <circle cx="390" cy="372" r="22" fill="#f59e0b" />
    <circle cx="160" cy="372" r="22" fill="#3b82f6" />
    <circle cx="325" cy="256" r="18" fill="#ffffff" />
  </g>

  <!-- INIXA text -->
  <text x="250" y="145" font-family="system-ui, -apple-system, 'SF Pro Display', Roboto, sans-serif" font-size="104" font-weight="900" letter-spacing="-3" fill="url(#wmGrad)">INIXA</text>

  <!-- LABS pill badge -->
  <g transform="translate(610, 68)" filter="url(#labsGlow)">
    <rect width="240" height="88" rx="44" fill="rgba(6, 182, 212, 0.15)" stroke="url(#labsGrad)" stroke-width="3" />
    <text x="120" y="58" font-family="system-ui, -apple-system, sans-serif" font-size="44" font-weight="800" letter-spacing="6" fill="#00f2fe" text-anchor="middle">LABS</text>
  </g>
</svg>
`;

// 3. INIXA Keyart Banner SVG (1920x1080)
const keyartSvg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080" width="1920" height="1080">
  <defs>
    <radialGradient id="deepGlow" cx="50%" cy="45%" r="65%">
      <stop offset="0%" stop-color="#083344" stop-opacity="0.8" />
      <stop offset="30%" stop-color="#0f172a" stop-opacity="0.9" />
      <stop offset="80%" stop-color="#030712" stop-opacity="1" />
    </radialGradient>
    <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#00f2fe" />
      <stop offset="50%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#f59e0b" />
    </linearGradient>
    <filter id="masterGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="30" result="b1" />
      <feMerge>
        <feMergeNode in="b1" />
        <feMergeNode in="SourceGraphic" />
      </feMerge>
    </filter>
  </defs>

  <rect width="1920" height="1080" fill="#020408" />
  <rect width="1920" height="1080" fill="url(#deepGlow)" />

  <!-- Subtle mesh grid lines -->
  <g stroke="rgba(255,255,255,0.03)" stroke-width="1">
    <line x1="0" y1="180" x2="1920" y2="180" />
    <line x1="0" y1="360" x2="1920" y2="360" />
    <line x1="0" y1="540" x2="1920" y2="540" />
    <line x1="0" y1="720" x2="1920" y2="720" />
    <line x1="0" y1="900" x2="1920" y2="900" />
    <line x1="320" y1="0" x2="320" y2="1080" />
    <line x1="640" y1="0" x2="640" y2="1080" />
    <line x1="960" y1="0" x2="960" y2="1080" />
    <line x1="1280" y1="0" x2="1280" y2="1080" />
    <line x1="1600" y1="0" x2="1600" y2="1080" />
  </g>

  <!-- Central Holographic Emblem -->
  <g transform="translate(960, 420)" filter="url(#masterGlow)">
    <circle cx="0" cy="0" r="260" fill="none" stroke="rgba(0, 242, 254, 0.25)" stroke-width="2" stroke-dasharray="12 12" />
    <circle cx="0" cy="0" r="200" fill="rgba(8, 12, 20, 0.7)" stroke="rgba(255,255,255,0.15)" stroke-width="4" />
    
    <!-- Large IX -->
    <g transform="translate(-140, -140) scale(0.55)">
      <line x1="160" y1="120" x2="160" y2="400" stroke="url(#heroGradient)" stroke-width="50" stroke-linecap="round" />
      <line x1="260" y1="120" x2="420" y2="400" stroke="url(#heroGradient)" stroke-width="50" stroke-linecap="round" />
      <line x1="420" y1="120" x2="260" y2="400" stroke="url(#heroGradient)" stroke-width="50" stroke-linecap="round" />
      <circle cx="160" cy="120" r="28" fill="#00f2fe" />
      <circle cx="420" cy="120" r="28" fill="#f59e0b" />
      <circle cx="420" cy="400" r="28" fill="#f59e0b" />
      <circle cx="160" cy="400" r="28" fill="#3b82f6" />
      <circle cx="340" cy="260" r="22" fill="#ffffff" />
    </g>
  </g>

  <!-- Typography -->
  <text x="960" y="780" font-family="system-ui, -apple-system, sans-serif" font-size="80" font-weight="900" fill="#ffffff" text-anchor="middle" letter-spacing="-2">INIXA LABS</text>
  <text x="960" y="840" font-family="system-ui, -apple-system, sans-serif" font-size="28" font-weight="600" fill="#00f2fe" text-anchor="middle" letter-spacing="4">FRONTIERS OF AI &amp; FLAGSHIP MOBILE SOFTWARE</text>
  <text x="960" y="890" font-family="system-ui, -apple-system, sans-serif" font-size="20" font-weight="400" fill="#94a3b8" text-anchor="middle" letter-spacing="1">8 Flagship Apps · 13 Production APKs · Liquid Glass Audio Engine</text>
</svg>
`;

async function run() {
  console.log('Generating high-res PNG and JPG assets...');

  // 1. icon.png (media/icon.png & public/logo.png)
  const iconBuffer = Buffer.from(iconSvg);
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(mediaDir, 'icon.png'));
  await sharp(iconBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'logo.png'));
  console.log('✓ Created public/media/icon.png and public/logo.png');

  // 2. favicon.png & apple-touch-icon.png
  await sharp(iconBuffer).resize(64, 64).png().toFile(path.join(publicDir, 'favicon.png'));
  await sharp(iconBuffer).resize(180, 180).png().toFile(path.join(publicDir, 'apple-touch-icon.png'));
  console.log('✓ Created favicon.png and apple-touch-icon.png');

  // 3. wordmark.png
  const wordmarkBuffer = Buffer.from(wordmarkSvg);
  await sharp(wordmarkBuffer).resize(900, 240).png().toFile(path.join(mediaDir, 'wordmark.png'));
  console.log('✓ Created public/media/wordmark.png');

  // 4. keyart.jpg
  const keyartBuffer = Buffer.from(keyartSvg);
  await sharp(keyartBuffer).resize(1920, 1080).jpeg({ quality: 92 }).toFile(path.join(mediaDir, 'keyart.jpg'));
  console.log('✓ Created public/media/keyart.jpg');

  console.log('All branding assets generated with ZERO traces of legacy icons/logos!');
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
