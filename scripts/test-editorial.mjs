import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG_POSTS } from '../src/data/blogData.js';
import { getEditorialPage, escapeHtml, SITE_URL } from '../src/seo/editorial.js';
import { parseRoute, getAllCanonicalRoutes } from '../src/router/routes.js';
import { BLOG_TO_GUIDE_REDIRECTS, getAllGuidePaths, getGuidesPage } from '../src/seo/guides.js';
import { GUIDES } from '../src/data/guidesData.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let checks=0;
const check=(value,message)=>{assert(value,message);checks++};
const titles=new Set(),descriptions=new Set();
for(const locale of ['es','en'])for(const suffix of ['blog/','explore/',...BLOG_POSTS.filter(p=>!(locale==='es'&&BLOG_TO_GUIDE_REDIRECTS[p.slug])).map(p=>`blog/${p.slug}/`)]){
 const route=`/${locale}/${suffix}`, page=getEditorialPage(route),html=fs.readFileSync(path.join(root,'dist',route,'index.html'),'utf8');
 check((html.match(/<h1[ >]/g)||[]).length===1,`${route}: one H1`);
 check((html.match(/rel="canonical"/g)||[]).length===1,`${route}: one canonical`);
 check(html.includes(`rel="canonical" href="${SITE_URL+route}"`),`${route}: self canonical`);
 check(html.includes(`<html lang="${locale}"`),`${route}: language`);
 check(!titles.has(page.title),`${route}: unique title`);titles.add(page.title);
 check(!descriptions.has(page.description),`${route}: unique description`);descriptions.add(page.description);
 check(html.includes(`property="og:url" content="${SITE_URL+route}"`),`${route}: OG URL`);
 const superseded=page.post&&BLOG_TO_GUIDE_REDIRECTS[page.post.slug];
 for(const lang of superseded?['en']:['es','en','x-default'])check(html.includes(`hreflang="${lang}" href="${SITE_URL}/${lang==='x-default'?'es':lang}/${suffix}"`),`${route}: ${lang} alternate`);
 if(superseded)check(!html.includes('hreflang="es"'),`${route}: no Spanish alternate for a superseded post`);
 const schemas=[...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m=>JSON.parse(m[1]));
 check(schemas.length===1,`${route}: single graph`);
 const nodes=schemas[0]['@graph'];
 check(nodes.some(n=>n['@type']==='BreadcrumbList'),`${route}: breadcrumbs`);
 check(!html.includes('AggregateRating'),`${route}: no fabricated ratings`);
 if(page.post){
  const article=nodes.find(n=>n['@type']==='BlogPosting');
  check(article?.mainEntityOfPage['@id']===SITE_URL+route,`${route}: article main entity`);
  check(article.dateModified===page.post.reviewedAt,`${route}: revision date`);
  check(article.citation.length===page.post.sources.length,`${route}: citations`);
  for(const block of page.data.content)check(html.includes(escapeHtml(block.text)),`${route}: full visible body`);
  for(const source of page.post.sources)check(html.includes(`href="${source.url}"`),`${route}: visible source`);
  for(const slug of page.post.relatedSlugs)check(BLOG_POSTS.some(p=>p.slug===slug),`${route}: valid related article`);
 }
 for(const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
  const href=match[1];
  check(fs.existsSync(path.join(root,'dist',href,href.endsWith('/')?'index.html':'')),`${route}: internal target ${href}`);
 }
}
const inventory=JSON.parse(fs.readFileSync(path.join(root,'dist/route-inventory.json')));
const maps=['pages','events','venues','restaurants','blog','guias'].map(g=>fs.readFileSync(path.join(root,`dist/sitemap-${g}.xml`),'utf8')).join('');
const urls=[...maps.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
check(new Set(urls).size===urls.length,'Sitemap has no duplicate URLs');
for(const url of urls)check(inventory.some(p=>p.indexable&&p.canonical===url),'Every sitemap URL exists and is canonical/indexable: '+url);
for(const p of inventory.filter(p=>p.indexable))check(urls.includes(p.canonical),'Every indexable generated page is in sitemap: '+p.route);
check(!maps.includes('/directorio/'),'Directory alias excluded');
check(!maps.includes('/panama/events/today/'),'Volatile thin hub excluded');
check(parseRoute('/es/no-existe/').type==='not_found','Unknown route is not home');
check(parseRoute('/en/blog/unknown/extra/').type==='not_found','Deep invalid article route is not an alias');
check(getAllCanonicalRoutes().filter(p=>p.path.includes('/blog/')).length===18-Object.keys(BLOG_TO_GUIDE_REDIRECTS).length,'Registry includes blog hubs and non-superseded articles');
// ── Editorial guides (/es/guias/) ──
const vercel=JSON.parse(fs.readFileSync(path.join(root,'vercel.json'),'utf8'));
for(const [from,to] of Object.entries(BLOG_TO_GUIDE_REDIRECTS)){
 check(vercel.redirects.some(r=>r.source===`/es/blog/${from}/`&&r.destination===`/es/guias/${to}/`&&r.permanent),`301 /es/blog/${from}/ → guide`);
 check(!fs.existsSync(path.join(root,'dist/es/blog',from,'index.html')),`Superseded post not generated: ${from}`);
 check(parseRoute(`/es/blog/${from}/`).type==='redirect','SPA redirects superseded post');
}
check(GUIDES.length===30,'30 guides imported');
for(const gpath of getAllGuidePaths()){
 const gp=getGuidesPage(gpath),html=fs.readFileSync(path.join(root,'dist',gpath,'index.html'),'utf8');
 check(parseRoute(gpath).type==='guides',`${gpath}: routed`);
 check((html.match(/<h1[ >]/g)||[]).length===1,`${gpath}: one H1`);
 check(html.includes(`rel="canonical" href="${SITE_URL+gpath}"`),`${gpath}: self canonical`);
 check(html.includes(`property="og:url" content="${SITE_URL+gpath}"`),`${gpath}: OG URL`);
 check(html.includes('hreflang="es"')&&!html.includes('hreflang="en"'),`${gpath}: Spanish-only hreflang`);
 check(!titles.has(gp.title),`${gpath}: unique title`);titles.add(gp.title);
 check(!descriptions.has(gp.description),`${gpath}: unique description`);descriptions.add(gp.description);
 const graph=JSON.parse(html.match(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/)[1])['@graph'];
 check(graph.some(n=>n['@type']==='BreadcrumbList'),`${gpath}: breadcrumbs schema`);
 check(!/"@type":\s*"(Event|Review|AggregateRating|Offer)"/.test(html),`${gpath}: no Event/Review/Offer schema`);
 if(gp.kind==='article'){
  const g=gp.guide, art=graph.find(n=>n['@type']==='Article');
  check(art&&art.datePublished===g.datePublished&&art.dateModified===g.dateModified,`${gpath}: article dates`);
  check(art.citation.length===g.sources.length,`${gpath}: citations`);
  check(g.image&&html.includes(g.image.srcSmall)&&html.includes(`width="${g.image.width}"`),`${gpath}: licensed image with dimensions`);
  check(g.image.license&&g.image.sourceUrl&&html.includes(g.image.sourceUrl),`${gpath}: visible photo credit`);
  for(const s of g.sources)check(html.includes(`href="${s.url}"`),`${gpath}: visible source`);
  for(const f of g.faqs)check(html.includes(f.question.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/'/g,'&#39;')),`${gpath}: FAQ visible`);
  for(const id of g.relatedIds){const r=GUIDES.find(x=>x.id===id);check(r&&html.includes(`href="/es/guias/${r.slug}/"`),`${gpath}: related link ${id}`);}
  check(!/enlace interno: A\d{2}|\bA\d{2}\b/.test(html.split('<div id="root">')[1]),`${gpath}: no internal IDs shown`);
 }
 for(const match of html.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)){
  const href=match[1];
  if(/\.(png|svg|ico|webp|jpg|json|xml|css|js)$/.test(href))continue;
  check(fs.existsSync(path.join(root,'dist',href,href.endsWith('/')?'index.html':'')),`${gpath}: internal target ${href}`);
 }
}
console.log(`Editorial SEO: ${checks} checks passed; ${BLOG_POSTS.length} blog articles + ${GUIDES.length} guides.`);
