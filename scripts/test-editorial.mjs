import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG_POSTS } from '../src/data/blogData.js';
import { getEditorialPage, escapeHtml, SITE_URL } from '../src/seo/editorial.js';
import { parseRoute, getAllCanonicalRoutes } from '../src/router/routes.js';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
let checks=0;
const check=(value,message)=>{assert(value,message);checks++};
const titles=new Set(),descriptions=new Set();
for(const locale of ['es','en'])for(const suffix of ['blog/','explore/',...BLOG_POSTS.map(p=>`blog/${p.slug}/`)]){
 const route=`/${locale}/${suffix}`, page=getEditorialPage(route),html=fs.readFileSync(path.join(root,'dist',route,'index.html'),'utf8');
 check((html.match(/<h1[ >]/g)||[]).length===1,`${route}: one H1`);
 check((html.match(/rel="canonical"/g)||[]).length===1,`${route}: one canonical`);
 check(html.includes(`rel="canonical" href="${SITE_URL+route}"`),`${route}: self canonical`);
 check(html.includes(`<html lang="${locale}"`),`${route}: language`);
 check(!titles.has(page.title),`${route}: unique title`);titles.add(page.title);
 check(!descriptions.has(page.description),`${route}: unique description`);descriptions.add(page.description);
 check(html.includes(`property="og:url" content="${SITE_URL+route}"`),`${route}: OG URL`);
 for(const lang of ['es','en','x-default'])check(html.includes(`hreflang="${lang}" href="${SITE_URL}/${lang==='x-default'?'es':lang}/${suffix}"`),`${route}: ${lang} alternate`);
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
const maps=['pages','events','venues','restaurants','blog'].map(g=>fs.readFileSync(path.join(root,`dist/sitemap-${g}.xml`),'utf8')).join('');
const urls=[...maps.matchAll(/<loc>(.*?)<\/loc>/g)].map(m=>m[1]);
check(new Set(urls).size===urls.length,'Sitemap has no duplicate URLs');
for(const url of urls)check(inventory.some(p=>p.indexable&&p.canonical===url),'Every sitemap URL exists and is canonical/indexable: '+url);
for(const p of inventory.filter(p=>p.indexable))check(urls.includes(p.canonical),'Every indexable generated page is in sitemap: '+p.route);
check(!maps.includes('/directorio/'),'Directory alias excluded');
check(!maps.includes('/panama/events/today/'),'Volatile thin hub excluded');
check(parseRoute('/es/no-existe/').type==='not_found','Unknown route is not home');
check(parseRoute('/en/blog/unknown/extra/').type==='not_found','Deep invalid article route is not an alias');
check(getAllCanonicalRoutes().filter(p=>p.path.includes('/blog/')).length===18,'Registry includes all bilingual articles and blog hubs');
console.log(`Editorial SEO: ${checks} checks passed; ${BLOG_POSTS.length} articles in two languages.`);
