// Build from generated, indexable canonical documents; never advertise SPA fallbacks.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BLOG_POSTS } from '../src/data/blogData.js';
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const base='https://hangoutpanama.com';
const escape=s=>s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
export const generateAllSitemaps=()=>{
 const groups={pages:[],events:[],venues:[],restaurants:[],blog:[],guias:[]};
 const inventory=[];
 const scan=dir=>{for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
   const file=path.join(dir,entry.name);
   if(entry.isDirectory()) scan(file);
   else if(entry.name==='index.html'){
    const html=fs.readFileSync(file,'utf8'),rel=path.relative(path.join(root,'dist'),file).replace(/index\.html$/,'');
    const route='/'+rel, canonical=html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
    const robots=html.match(/<meta name="robots" content="([^"]+)"/)?.[1]||'';
    const indexable=canonical===base+route && /^\/(es|en)\//.test(route) && !robots.includes('noindex');
    inventory.push({route,canonical,indexable,title:html.match(/<title>(.*?)<\/title>/)?.[1]});
    if(!indexable)continue;
    const group=route.startsWith('/es/guias/')?'guias':Object.keys(groups).find(k=>k!=='pages'&&route.includes('/'+k+'/'))||'pages';
    const post=BLOG_POSTS.find(p=>route.endsWith(`/blog/${p.slug}/`));
    const sibling=route.replace(/^\/(es|en)\//,route.startsWith('/es/')?'/en/':'/es/');
    // Only advertise hreflang alternates the page itself declares (guides are Spanish-only).
    const declared=[...html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)"/g)].map(m=>({lang:m[1],href:m[2]}));
    for(const alt of declared.filter(a=>a.lang!=='x-default')){
      const altRoute=alt.href.replace(base,'');
      if(!fs.existsSync(path.join(root,'dist',altRoute,'index.html')))throw Error(`Missing language equivalent: ${altRoute} (declared by ${route})`);
    }
    const lastmod=post?.dateModified||html.match(/"dateModified":\s*"([^"]+)"/)?.[1];
    groups[group].push(`  <url><loc>${escape(base+route)}</loc>${lastmod?`<lastmod>${lastmod}</lastmod>`:''}${declared.map(a=>`<xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`).join('')}</url>`);
   }
 }};
 scan(path.join(root,'dist'));
 const files={};
 for(const [name,urls]of Object.entries(groups))files[`sitemap-${name}.xml`]=`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls.join('\n')}\n</urlset>\n`;
 files['sitemap.xml']=`<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.keys(groups).map(g=>`<sitemap><loc>${base}/sitemap-${g}.xml</loc></sitemap>`).join('')}</sitemapindex>\n`;
 for(const [name,body]of Object.entries(files))for(const dir of ['public','dist'])fs.writeFileSync(path.join(root,dir,name),body);
 fs.writeFileSync(path.join(root,'dist','route-inventory.json'),JSON.stringify(inventory,null,2));
 console.log(`Sitemaps: ${Object.values(groups).flat().length} canonical indexable URLs; ${inventory.length} documents inventoried.`);
};
if(process.argv[1]===fileURLToPath(import.meta.url))generateAllSitemaps();
