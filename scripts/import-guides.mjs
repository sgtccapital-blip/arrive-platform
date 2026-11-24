// =========================================================================
// HANGOUT — Editorial guides importer
// Converts content/guias/hangout-seo-30-articulos.md (editorial source of
// truth) into src/data/guidesData.js. Re-run after editing the Markdown:
//   node scripts/import-guides.mjs
// =========================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SOURCE = path.join(root, 'content/guias/hangout-seo-30-articulos.md');
const OUT = path.join(root, 'src/data/guidesData.js');
const IMAGES = path.join(root, 'src/data/guideImages.json');

// Publication / editorial review dates (research date stated in the source document).
const DATE_PUBLISHED = '2026-11-23';
const DATE_REVIEWED = '2026-11-23';

export const GUIDE_CATEGORIES = [
  { name: 'Turismo', slug: 'turismo', description: 'Qué ver y qué hacer en Panamá: lugares, rutas por zonas, itinerarios y planes para cada tipo de día.' },
  { name: 'Eventos', slug: 'eventos', description: 'Cómo encontrar fiestas, conciertos y experiencias del fin de semana, conectado con la agenda publicada en HangOut.' },
  { name: 'Nightlife', slug: 'nightlife', description: 'Discotecas, rooftops, bares, música y reservas VIP: guías para planificar tu noche en Ciudad de Panamá.' },
  { name: 'Playas e islas', slug: 'playas-e-islas', description: 'San Blas, Taboga, Bocas del Toro y playas cerca de la capital: cómo llegar y qué tener en cuenta.' },
  { name: 'Aventura', slug: 'aventura', description: 'Montaña, cascadas, cuevas y senderos: escapadas de naturaleza desde Ciudad de Panamá.' },
  { name: 'Experiencias', slug: 'experiencias', description: 'Planes en pareja, con amigos y atardeceres: ideas para compartir en Panamá.' },
  { name: 'Guías', slug: 'guias-practicas', description: 'Presupuesto, alojamiento y transporte: información práctica para organizar tu viaje por Panamá.' },
];

// Which live HangOut events each article may surface. Only published, upcoming
// events are ever shown; an empty match renders an honest "no events" note.
const EVENT_LINKS = {
  A08: { mode: 'weekend' },
  A09: { mode: 'all' },
  A10: { mode: 'venues', venues: ['terraplen-rooftop', 'cielo-rooftop', 'primavera-panama'] },
  A11: { mode: 'venues', venues: ['terraplen-rooftop'] },
  A12: { mode: 'all' },
  A13: { mode: 'ladies' },
  A15: { mode: 'genre', genres: ['electr', 'house', 'techno', 'trance'] },
  A16: { mode: 'vip' },
  A27: { mode: 'all' },
};

// CTAs only point to products that exist on the platform.
const CTA_BY_CATEGORY = {
  Nightlife: ['agenda', 'vip', 'venues'],
  Eventos: ['agenda', 'venues'],
  Experiencias: ['agenda', 'concierge'],
  default: ['agenda', 'concierge'],
};

// Editorial corrections applied on import (documented, never silent).
const CORRECTIONS = [
  // A02: the city section lists ten places (1–10), not nine.
  { id: 'A02', from: 'Los primeros nueve son urbanos o próximos a la ciudad.', to: 'Los diez primeros de la lista están en la ciudad o muy cerca de ella.' },
];

const clean = (s) => s.replace(/\s+$/g, '').trim();
const field = (block, label) => {
  const m = block.match(new RegExp(`\\*\\*${label}:\\*\\*\\s*\`?([^\`\\n]+?)\`?\\s*$`, 'm'));
  return m ? clean(m[1]) : '';
};

// Split "1. a. 2. b." run-on numbered paragraphs into list items.
const toBlocks = (text) => {
  const paragraphs = text.split(/\n{2,}/).map(clean).filter(Boolean);
  const blocks = [];
  for (const p of paragraphs) {
    if (/^\d+\.\s/.test(p)) {
      const items = p.split(/\s(?=\d+\.\s)/).map((i) => i.replace(/^\d+\.\s*/, '').trim());
      const start = Number(p.match(/^(\d+)\./)[1]);
      blocks.push({ type: 'list', ordered: true, start, items });
    } else if (/^-\s/m.test(p) && p.split('\n').every((l) => /^-\s/.test(l))) {
      blocks.push({ type: 'list', ordered: false, items: p.split('\n').map((l) => l.replace(/^-\s*/, '').trim()) });
    } else {
      blocks.push({ type: 'paragraph', text: p.replace(/\n/g, ' ') });
    }
  }
  return blocks;
};

const wordCount = (s) => s.split(/\s+/).filter(Boolean).length;

export const parseGuides = (md) => {
  const sourcesIndex = {};
  for (const m of md.matchAll(/^- (S\d+) \[([^\]]+)\]\(([^)]+)\)/gm)) sourcesIndex[m[1]] = { name: m[2], url: m[3] };

  const chunks = md.split(/^## (A\d{2}) — /m).slice(1);
  const guides = [];
  for (let i = 0; i < chunks.length; i += 2) {
    const id = chunks[i];
    let block = chunks[i + 1].split(/^---\s*$/m)[0];
    for (const c of CORRECTIONS.filter((c) => c.id === id)) {
      if (!block.includes(c.from)) throw new Error(`Correction for ${id} no longer matches the source`);
      block = block.replace(c.from, c.to);
    }

    const body = block.split(/^### Cuerpo del artículo\s*$/m)[1];
    const title = clean(body.match(/^# (.+)$/m)[1]);
    const afterTitle = body.split(/^# .+$/m)[1];
    const parts = afterTitle.split(/^## /m);
    const intro = toBlocks(parts[0]);
    const sections = [];
    let faqs = [];
    let related = [];
    let sources = [];
    let closing = '';
    for (const part of parts.slice(1)) {
      const [headingLine, ...rest] = part.split('\n');
      const heading = clean(headingLine);
      const content = rest.join('\n');
      if (heading === 'Preguntas frecuentes') {
        faqs = [...content.matchAll(/\*\*(.+?)\*\*\s*\n+([\s\S]+?)(?=\n\*\*|\s*$)/g)].map((m) => ({ question: clean(m[1]), answer: clean(m[2]) }));
      } else if (heading === 'Sigue explorando con HangOut') {
        closing = clean(content.split(/\n-\s/)[0]);
        related = [...content.matchAll(/\(enlace interno: (A\d{2})\)/g)].map((m) => m[1]);
      } else if (heading === 'Fuentes y consultas oficiales') {
        sources = [...content.matchAll(/^- \[([^\]]+)\]\(([^)]+)\)/gm)].map((m) => ({ name: m[1], url: m[2] }));
      } else {
        sections.push({ heading, id: heading.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, ''), blocks: toBlocks(content) });
      }
    }

    const category = field(block, 'Categoría');
    const cat = GUIDE_CATEGORIES.find((c) => c.name === category);
    if (!cat) throw new Error(`${id}: unknown category ${category}`);
    const text = [...intro, ...sections.flatMap((s) => s.blocks)].map((b) => b.text || b.items.join(' ')).join(' ') + faqs.map((f) => `${f.question} ${f.answer}`).join(' ');
    const words = wordCount(text);

    guides.push({
      id,
      slug: field(block, 'Slug'),
      category,
      categorySlug: cat.slug,
      keyword: field(block, 'Keyword principal propuesta'),
      seoTitle: field(block, 'SEO title').replace(/\|\s*HangOut$/, '| HangOut Panamá'),
      seoDescription: field(block, 'Meta description'),
      intent: field(block, 'Intención'),
      dynamic: /^Dinámica/.test(field(block, 'Tipo de actualización')),
      title,
      intro,
      sections,
      faqs,
      closing,
      relatedIds: related,
      sources,
      datePublished: DATE_PUBLISHED,
      dateModified: DATE_REVIEWED,
      words,
      readMinutes: Math.max(2, Math.round(words / 200)),
      events: EVENT_LINKS[id] || null,
      ctas: CTA_BY_CATEGORY[category] || CTA_BY_CATEGORY.default,
    });
  }

  // Integrity: unique slugs/titles/descriptions, valid related ids.
  const seen = new Set();
  for (const g of guides) {
    for (const key of ['slug', 'seoTitle', 'seoDescription']) {
      if (!g[key]) throw new Error(`${g.id}: missing ${key}`);
      if (seen.has(key + g[key])) throw new Error(`${g.id}: duplicate ${key}`);
      seen.add(key + g[key]);
    }
    for (const r of g.relatedIds) if (!guides.some((o) => o.id === r)) throw new Error(`${g.id}: related ${r} not found`);
    if (!g.sources.length) throw new Error(`${g.id}: no sources`);
  }
  return { guides, sourcesIndex };
};

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const md = fs.readFileSync(SOURCE, 'utf-8');
  const { guides } = parseGuides(md);
  const images = fs.existsSync(IMAGES) ? JSON.parse(fs.readFileSync(IMAGES, 'utf-8')) : {};
  for (const g of guides) g.image = images[g.id] || null;
  const banner = '// AUTO-GENERATED by scripts/import-guides.mjs from content/guias/hangout-seo-30-articulos.md — do not edit by hand.\n';
  fs.writeFileSync(OUT, `${banner}export const GUIDE_CATEGORIES = ${JSON.stringify(GUIDE_CATEGORIES, null, 2)};\n\nexport const GUIDES = ${JSON.stringify(guides, null, 2)};\n`, 'utf-8');
  console.log(`Guides: ${guides.length} articles imported (${guides.reduce((a, g) => a + g.words, 0)} words, ${guides.filter((g) => g.image).length} with images).`);
}
