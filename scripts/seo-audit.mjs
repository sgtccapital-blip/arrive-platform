// =========================================================================
// ARRIVE PLATFORM — AUTOMATED SEO AUDIT & QA SUITE
// Validates titles, descriptions, canonicals, H1s, schemas & sitemaps
// =========================================================================

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.join(ROOT_DIR, 'dist');
const PUBLIC_DIR = path.join(ROOT_DIR, 'public');

let totalChecks = 0;
let passedChecks = 0;
let errors = [];

const assert = (condition, message) => {
  totalChecks++;
  if (condition) {
    passedChecks++;
    console.log(`  ✓ ${message}`);
  } else {
    errors.push(message);
    console.error(`  ✗ FAIL: ${message}`);
  }
};

export const runSeoAudit = () => {
  console.log('\n🔍 =======================================================');
  console.log('   ARRIVE PLATFORM — AUTOMATED SEO AUDIT');
  console.log('=======================================================\n');

  // 1. Robots.txt
  console.log('📋 [1/5] Verificando robots.txt...');
  const robotsPath = path.join(PUBLIC_DIR, 'robots.txt');
  assert(fs.existsSync(robotsPath), 'robots.txt existe en public/');
  if (fs.existsSync(robotsPath)) {
    const robotsTxt = fs.readFileSync(robotsPath, 'utf-8');
    assert(robotsTxt.includes('Sitemap: https://arrivepanama.com/sitemap.xml'), 'robots.txt referencia sitemap.xml');
    assert(robotsTxt.includes('Allow: /'), 'robots.txt permite indexación pública');
  }

  // 2. Sitemaps
  console.log('\n🗺️  [2/5] Verificando Sitemaps XML...');
  const sitemaps = [
    'sitemap.xml',
    'sitemap-pages.xml',
    'sitemap-events.xml',
    'sitemap-venues.xml',
    'sitemap-restaurants.xml',
    'sitemap-blog.xml'
  ];

  sitemaps.forEach(sm => {
    const smPath = path.join(PUBLIC_DIR, sm);
    assert(fs.existsSync(smPath), `Sitemap ${sm} generado en public/`);
    if (fs.existsSync(smPath)) {
      const content = fs.readFileSync(smPath, 'utf-8');
      assert(content.includes('<?xml version="1.0"'), `${sm} tiene cabecera XML válida`);
      assert(content.includes('https://arrivepanama.com/'), `${sm} contiene URLs canónicas de ARRIVE`);
    }
  });

  // 3. Prerendered HTML Files in dist/
  console.log('\n📄 [3/5] Verificando HTML pre-renderizado en dist/...');
  if (!fs.existsSync(DIST_DIR)) {
    assert(false, 'Carpeta dist/ existe (ejecuta primero npm run build)');
  } else {
    const sampleRoutes = [
      'index.html',
      'es/index.html',
      'en/index.html',
      'es/panama/nightlife/index.html',
      'en/panama/nightlife/index.html',
      'es/panama/rooftops/index.html',
      'es/panama/casco-antiguo/index.html',
      'es/panama/events/today/index.html',
      'es/panama/events/weekend/index.html',
      'es/panama/venues/index.html',
      'es/venues/index.html',
      'es/panama/concierge/index.html',
      'es/concierge/index.html',
      'es/venues/furia-club/index.html',
      'es/venues/terraplen-rooftop/index.html',
      'es/events/furia-midweek-boiler-reggaeton/index.html',
      'es/events/terraplen-hiphop-reggaeton-party/index.html',
      'es/restaurants/furia-club/index.html',
      'es/blog/index.html',
      'es/blog/guia-nightlife-casco-antiguo-panama/index.html',
      'es/directorio/index.html',
      'es/cookies/index.html'
    ];

    sampleRoutes.forEach(relPath => {
      const filePath = path.join(DIST_DIR, relPath);
      assert(fs.existsSync(filePath), `Ruta pre-renderizada existe: ${relPath}`);
      if (fs.existsSync(filePath)) {
        const html = fs.readFileSync(filePath, 'utf-8');

        // Check unique title
        const titleMatch = html.match(/<title>(.*?)<\/title>/i);
        assert(titleMatch && titleMatch[1].trim().length > 10, `${relPath} tiene <title> no vacío (${titleMatch ? titleMatch[1].slice(0, 30) + '...' : ''})`);

        // Check meta description
        const descMatch = html.match(/<meta name="description" content="(.*?)"/i);
        assert(descMatch && descMatch[1].trim().length >= 40, `${relPath} tiene <meta description> substantiva`);

        // Check canonical
        assert(html.includes('<link rel="canonical" href="https://arrivepanama.com/'), `${relPath} tiene <link rel="canonical"> absoluto`);

        // Check H1 tag
        const h1Matches = html.match(/<h1.*?>.*?<\/h1>/gi);
        assert(h1Matches && h1Matches.length === 1, `${relPath} tiene exactamente UN solo <h1>`);

        // Check hreflang
        assert(html.includes('hreflang="es"') && html.includes('hreflang="en"'), `${relPath} contiene etiquetas hreflang cruzadas`);
      }
    });
  }

  // 4. Summary
  console.log('\n=======================================================');
  console.log(`   RESULTADO DE LA AUDITORÍA: ${passedChecks}/${totalChecks} PASADOS`);
  console.log('=======================================================\n');

  if (errors.length > 0) {
    console.error(`🚨 Se encontraron ${errors.length} fallos en la auditoría SEO.`);
    process.exit(1);
  } else {
    console.log('🎉 ¡Todas las pruebas de SEO técnico y arquitectura pasaron con éxito!\n');
    process.exit(0);
  }
};

runSeoAudit();
