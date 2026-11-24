import { blogHref } from '../seo/guides';
import React, { useState } from 'react';
import { BLOG_POSTS } from '../data/blogData';
import { editorialCopy } from '../seo/editorial';

export const DirectoryPage = ({locale='es'}) => {
 const copy=editorialCopy(locale), isEs=locale==='es';
 const [query,setQuery]=useState('');
 const groups=[['Panama Travel',isEs?'Lugares y recorridos':'Places and itineraries'],['Nightlife Guide',isEs?'Preparar una salida':'Planning a night out'],['Rooftops & Bars','Rooftops'],['VIP Experience',isEs?'Preparar una reserva':'Preparing a booking']];
 return <main className="arrive_directory_page" style={{maxWidth:1100,margin:'auto',padding:'7rem 1.25rem 4rem'}}>
  <nav aria-label={isEs?'Ruta de navegación':'Breadcrumb'}><a href={`/${locale}/`}>HANGOUT</a> / {isEs?'Explorar Panamá':'Explore Panama'}</nav>
  <header><h1>{copy.exploreTitle}</h1><p>{copy.exploreDescription}</p><p>{copy.note}</p></header>
  <label htmlFor="explore-search">{isEs?'Buscar una actividad o lugar':'Find a place or activity'}</label>
  <input id="explore-search" type="search" value={query} onChange={e=>setQuery(e.target.value)} style={{display:'block',width:'100%',maxWidth:560,padding:'1rem',margin:'1rem 0 2rem',background:'#18181e',color:'white',border:'1px solid #555',borderRadius:8}}/>
  {groups.map(([category,title])=>{
   const posts=BLOG_POSTS.filter(p=>p.category===category && `${p[locale].title} ${p[locale].excerpt}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale)));
   return posts.length>0 && <section key={category} style={{marginBottom:'3rem'}}><h2>{title}</h2><div className="blog_grid">{posts.map(p=><article className="blog_card" key={p.slug} style={{padding:'1.5rem'}}><h3><a href={blogHref(locale,p.slug)}>{p[locale].title}</a></h3><p>{p[locale].excerpt}</p><small>{copy.reviewed}: <time dateTime={p.reviewedAt}>{p.reviewedAt}</time></small></article>)}</div></section>;
  })}
  {query && !BLOG_POSTS.some(p=>`${p[locale].title} ${p[locale].excerpt}`.toLocaleLowerCase(locale).includes(query.toLocaleLowerCase(locale))) && <p role="status">{isEs?'No hay coincidencias. Prueba con Canal, Casco o Amador.':'No matches. Try Canal, Casco or Amador.'}</p>}
  <nav aria-label={isEs?'Más recursos':'More resources'}><h2>{isEs?'Más recursos de HANGOUT':'More HANGOUT resources'}</h2><ul><li><a href="/es/guias/">{isEs?'Guías HangOut de Panamá: qué hacer, nightlife, islas y aventura':'HangOut Panama guides (in Spanish)'}</a></li><li><a href={`/${locale}/blog/`}>{copy.blogTitle}</a></li><li><a href={`/${locale}/panama/venues/`}>{isEs?'Directorio de locales':'Venue directory'}</a></li><li><a href={`/${locale}/`}>{isEs?'Cartelera: consultar condiciones de cada evento':'Events: check each event’s conditions'}</a></li><li><a href={`/${locale}/panama/concierge/`}>Concierge</a></li></ul></nav>
 </main>;
};
export default DirectoryPage;
