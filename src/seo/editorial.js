import { BLOG_POSTS } from '../data/blogData.js';
export const SITE_URL = 'https://arrivepanama.com';
export const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const editorialCopy = locale => locale === 'en' ? {
  blogTitle: 'Panama travel and nightlife guides',
  blogDescription: 'Plan Panama City with guides to Miraflores, Casco Viejo, Biomuseo, rooftops and reservations. Official sources and practical booking advice.',
  exploreTitle: 'Explore Panama: choose your next activity',
  exploreDescription: 'Choose history, the Canal, biodiversity or a night out. Start with a practical guide, compare options and confirm changing details with the operator.',
  reviewed: 'Sources reviewed', sources: 'Official sources', related: 'Continue planning',
  note: 'Desk research, not a first-hand review. Itineraries and checklists are editorial suggestions. Confirm prices, opening, admission and availability with each operator before booking.',
} : {
  blogTitle: 'Guías de turismo y vida nocturna en Panamá',
  blogDescription: 'Planifica Ciudad de Panamá con guías de Miraflores, Casco Antiguo, Biomuseo, rooftops y reservas. Fuentes oficiales y consejos prácticos para decidir.',
  exploreTitle: 'Explorar Panamá: elige tu próxima actividad',
  exploreDescription: 'Elige historia, Canal, biodiversidad o una salida nocturna. Consulta una guía práctica, compara opciones y confirma los datos variables con el operador.',
  reviewed: 'Fuentes revisadas', sources: 'Fuentes oficiales', related: 'Sigue planificando',
  note: 'Investigación documental, sin afirmar experiencia de primera mano. Los itinerarios y las listas de preguntas son sugerencias editoriales. Confirma precios, apertura, admisión y disponibilidad con cada operador antes de reservar.',
};
export const getEditorialPage = pathname => {
 const match = pathname.match(/^\/(es|en)\/(blog(?:\/([^/]+))?|explore|directorio)\/?$/);
 if (!match) return null;
 const locale = match[1], copy = editorialCopy(locale), slug = match[3];
 const post = slug ? BLOG_POSTS.find(p=>p.slug===slug) : null;
 if (slug && !post) return null;
 const kind = post ? 'post' : match[2] === 'blog' ? 'blog' : 'explore';
 const path = `/${locale}/${kind === 'post' ? `blog/${slug}` : kind}/`;
 const data = post?.[locale];
 const title = data?.seoTitle || (kind === 'blog' ? copy.blogTitle : copy.exploreTitle) + ' | ARRIVE';
 const description = data?.seoDescription || (kind === 'blog' ? copy.blogDescription : copy.exploreDescription);
 const h1 = data?.title || (kind === 'blog' ? copy.blogTitle : copy.exploreTitle);
 const breadcrumbs = [{name:locale==='es'?'Inicio':'Home',path:`/${locale}/`},{name:kind==='explore'?'Explorar Panamá':'Blog',path:`/${locale}/${kind==='explore'?'explore':'blog'}/`}];
 if(post) breadcrumbs.push({name:h1,path});
 const mainEntity = post ? {
   '@type':'BlogPosting','@id':`${SITE_URL}${path}#article`, headline:data.title, description:data.excerpt,
   inLanguage:locale, dateModified:post.dateModified,
   author:{'@type':'Organization',name:'ARRIVE',url:SITE_URL},
   publisher:{'@type':'Organization',name:'ARRIVE',url:SITE_URL},
   mainEntityOfPage:{'@type':'WebPage','@id':SITE_URL+path},
   citation:post.sources.map(s=>s.url)
 } : {'@type':'CollectionPage','@id':SITE_URL+path,url:SITE_URL+path,name:h1,description,inLanguage:locale,mainEntity:{'@type':'ItemList',itemListElement:BLOG_POSTS.map((p,i)=>({'@type':'ListItem',position:i+1,name:p[locale].title,url:`${SITE_URL}/${locale}/blog/${p.slug}/`}))}};
 return {kind,locale,post,data,copy,title,description,h1,path,pathname:path,canonicalUrl:SITE_URL+path,ogType:post?'article':'website',ogImage:SITE_URL+'/images/arrive-logo-white.png',breadcrumbs,mainEntity};
};
export const editorialHtml = page => {
 const {locale,post,data,copy,kind}=page;
 const link = p => `<a href="/${locale}/blog/${p.slug}/">${escapeHtml(p[locale].title)}</a>`;
 if (!post) return `<section><h2>${locale==='es'?'Elige por interés':'Choose by interest'}</h2><p>${escapeHtml(copy.note)}</p>${['Panama Travel','Nightlife Guide','Rooftops & Bars','VIP Experience'].map(cat=>`<section><h2>${escapeHtml(({ 'Panama Travel':locale==='es'?'Lugares y recorridos':'Places and itineraries','Nightlife Guide':locale==='es'?'Preparar una salida':'Planning a night out','Rooftops & Bars':'Rooftops','VIP Experience':locale==='es'?'Reservas':'Bookings'})[cat])}</h2>${BLOG_POSTS.filter(p=>p.category===cat).map(p=>`<article><h3>${link(p)}</h3><p>${escapeHtml(p[locale].excerpt)}</p></article>`).join('')}</section>`).join('')}<p><a href="/${locale}/${kind==='blog'?'explore':'blog'}/">${kind==='blog'?copy.exploreTitle:copy.blogTitle}</a></p></section>`;
 return `<article><p>${copy.reviewed}: <time datetime="${post.reviewedAt}">${post.reviewedAt}</time> · ARRIVE</p><p>${escapeHtml(copy.note)}</p><nav aria-label="${locale==='es'?'En este artículo':'In this guide'}"><ul>${data.content.filter(b=>b.type==='heading').map((b,i)=>`<li><a href="#section-${i}">${escapeHtml(b.text)}</a></li>`).join('')}</ul></nav>${(()=>{let n=0;return data.content.map(b=>b.type==='heading'?`<h2 id="section-${n++}">${escapeHtml(b.text)}</h2>`:`<p>${escapeHtml(b.text)}</p>`).join('')})()}<section><h2>${copy.sources}</h2><ul>${post.sources.map(s=>`<li><a href="${escapeHtml(s.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(s.name)}</a> — ${s.reviewedAt}</li>`).join('')}</ul></section><nav aria-label="${copy.related}"><h2>${copy.related}</h2><ul>${post.relatedSlugs.map(s=>BLOG_POSTS.find(p=>p.slug===s)).filter(Boolean).map(p=>`<li>${link(p)}</li>`).join('')}<li><a href="/${locale}/explore/">${copy.exploreTitle}</a></li></ul></nav></article>`;
};
