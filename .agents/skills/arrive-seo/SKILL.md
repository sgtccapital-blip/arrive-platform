---
name: arrive-seo
description: Directrices, flujos y checklists para ingeniería SEO en ARRIVE Platform (Panamá). Activar siempre que se trabaje en páginas públicas, routing, eventos, locales, restaurantes, experiencias, concierge, metadata, sitemap, structured data, navegación, imágenes, contenido, performance o internacionalización.
---

# ARRIVE Platform — SEO Engineering Skill

Esta skill proporciona las guías operativas, patrones de código y flujos de trabajo para implementar y mantener la arquitectura **SEO-first** de ARRIVE.

---

## Cuándo activar esta Skill
Activa esta skill inmediatamente al trabajar en:
- Creación, modificación o eliminación de **páginas públicas** y **rutas**.
- Edición del modelo de datos de **eventos**, **venues/locales**, **restaurantes** o **experiencias**.
- Configuración de **metadata** (`title`, `meta description`, `canonical`, `robots`, `Open Graph`, `Twitter Card`).
- Generación y actualización de **sitemaps XML** o directivas en `robots.txt`.
- Implementación de **datos estructurados (JSON-LD)** bajo el estándar Schema.org.
- Modificación de **enlaces internos**, menús o migas de pan (**breadcrumbs**).
- Optimización de **imágenes** (`alt`, lazy loading, dimensiones).
- Mejoras de **performance web** y métricas **Core Web Vitals** (LCP, CLS, INP).
- Soporte para **internacionalización** e idiomas (`/es/`, `/en/`, `hreflang`).

---

## Flujos de Trabajo Principales

### 1. Publicar o Modificar un Evento
Al agregar o editar un evento en `src/data/initialData.js`:
1. **Slug Canónico**: Crear slug descriptivo en minúsculas sin acentos ni caracteres especiales:
   ```javascript
   slug: 'furia-tini-after-party' // -> /events/furia-tini-after-party/
   ```
2. **SEO Title**: Formato obligatorio:
   ```javascript
   seoTitle: 'Furia TINI After Party — VIP Table & Open Bar | Panamá'
   ```
3. **SEO Description**: Entre 140 y 155 caracteres con intención de búsqueda:
   ```javascript
   seoDescription: 'After party oficial concierto TINI en Furia Club Panamá. Open Gin & Sangría para ellas, entrada libre en lista Arrive y reserva de mesas VIP.'
   ```
4. **Fechas ISO 8601 con Timezone**:
   ```javascript
   startDate: '2026-09-15T22:00:00-05:00',
   endDate: '2026-09-16T04:00:00-05:00'
   ```
5. **DJs y Artistas**: Vincular perfiles con foto, rol, handle de Instagram y DJ set.
6. **Recompilar Sitemaps y Prerender**: Ejecutar `npm run build` para actualizar `dist/` y `sitemap-events.xml`.

---

### 2. Publicar o Modificar un Venue / Local
Al agregar o editar un venue en `src/data/venuesData.js`:
1. Asegurar slug canónico: `slug: 'terraplen-rooftop'`.
2. Verificar coordenadas geográficas reales (`latitude: 8.9532, longitude: -79.5339`).
3. Definir horarios duales (`dinnerTime: '5:00 PM - 10:00 PM'`, `partyTime: '10:00 PM - 04:00 AM'`).
4. Proveer galería local con `alt` descriptivo.

---

### 3. Crear una Landing Programática
Reglas mandatorias:
1. **Criterio de Indexabilidad**:
   - Si la categoría/filtro tiene **1 o más eventos activos**: `index, follow`.
   - Si tiene **0 eventos**: `noindex, follow` (para no quemar crawl budget).
2. **Contenido Editorial Único**: La página debe contener un párrafo introductorio original que explique la experiencia del barrio o género, nunca solo una lista vacía de tarjetas.
3. **Breadcrumbs Semánticos**: Conectar la landing con su jerarquía superior:
   - `Home` > `Panamá` > `Rooftops`
   - `Home` > `Panamá` > `Casco Antiguo` > `Nightlife`

---

### 4. Checklist de Validación Previa a Finalizar Tareas
Antes de considerar completada cualquier tarea técnica o de contenido:
```bash
# 1. Compilación de producción (Vite build)
npm run build

# 2. Auditoría automatizada de SEO (Titles, meta, canonicals, schema, alt)
node scripts/seo-audit.mjs
```
