# ARRIVE Platform — SEO-First Architecture Rule (Always On)

Esta regla define los estándares mandatorios de ingeniería y contenido para asegurar que **ARRIVE** se mantenga de forma permanente como una plataforma optimizada **SEO-first** para Panamá, Casco Antiguo y el turismo internacional.

Cualquier cambio de código en este workspace DEBE cumplir estrictamente con los siguientes principios:

---

## 1. Principios Fundamentales

1. **El SEO no es un afterthought**: El SEO forma parte integral de los modelos de datos, routing, componentes, renderizado, sitemaps y enlaces internos.
2. **Cero Páginas Vacías o Thin Content**: Ninguna URL indexable debe publicarse sin inventario real, descripción sustancial y utilidad directa para el usuario.
3. **URLs Semánticas Canónicas**: Cada entidad (evento, venue, restaurante, hub temático) posee una URL limpia, rastreable y única.
4. **Crawlability Universal**: El contenido crítico debe estar pre-renderizado en el HTML inicial para que cualquier motor de búsqueda lo indexe sin depender de la ejecución de JavaScript.
5. **No Keyword Stuffing**: La redacción debe ser natural, sofisticada y orientada al público VIP y nocturno de Panamá.

---

## 2. Estructura de Documentación de Referencia

Para especificaciones detalladas, consulta los siguientes documentos en `docs/seo/`:
- **Estrategia y Objetivos**: [docs/seo/strategy.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/strategy.md)
- **Arquitectura Técnica**: [docs/seo/architecture.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/architecture.md)
- **Mapa de Palabras Clave**: [docs/seo/keyword-map.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/keyword-map.md)
- **Estructura de URLs**: [docs/seo/url-structure.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/url-structure.md)
- **Modelos de Contenido**: [docs/seo/content-models.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/content-models.md)
- **Marcado Estructurado (Schema.org)**: [docs/seo/schema.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/schema.md)
- **SEO Técnico & Core Web Vitals**: [docs/seo/technical-seo.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/technical-seo.md)
- **Programmatic SEO & Filtros**: [docs/seo/programmatic-seo.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/programmatic-seo.md)
- **Reglas de Indexación & Eventos Pasados**: [docs/seo/indexation-rules.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/indexation-rules.md)
- **Checklist Pre-Publicación**: [docs/seo/seo-checklist.md](file:///Users/admin/Documents/Arrive%20Platform/docs/seo/seo-checklist.md)

---

## 3. Reglas Técnicas Obligatorias

### 3.1 Routing y Enlaces Internos
- **Siempre usar `<a href="...">` reales**: No usar botones o `div` con `onClick` como único mecanismo de navegación para entidades públicas. Todo elemento navegable debe poseer su atributo `href` canónico.
- **Mantener navegación dual**: Permitir que el clic en escritorio abra el overlay/modal sin recarga brusca (SPA), pero manteniendo la URL sincronizada en `window.location` para que el usuario pueda copiar, compartir y refrescar la página.

### 3.2 Metadata y Head Dinámico
- Toda vista debe actualizar dinámicamente mediante `HeadManager.js`:
  - `document.title`: Formato `[Nombre Entidad] — [Valor Clave] • [Ciudad/Barrio] | ARRIVE`
  - `<meta name="description">`: Resumen persuasivo y único de 140 a 155 caracteres.
  - `<link rel="canonical">`: URL canónica absoluta (sin parámetros de tracking ni query strings de ordenamiento).
  - `<meta name="robots">`: `index, follow` para contenido con inventario; `noindex, follow` para filtros vacíos o búsquedas internas.
  - Open Graph y Twitter Cards completos con imagen representativa y texto descriptivo.

### 3.3 Datos Estructurados (JSON-LD)
- Cada página pública debe inyectar su nodo Schema.org `@graph` correspondiente:
  - Eventos: `@type: "Event"` con `startDate`, `endDate`, `location`, `offers`, `performer` y `eventStatus`.
  - Venues/Clubs: `@type: "NightClub"` o `"BarOrPub"` con dirección postal, coordenadas satelitales y horarios.
  - Restaurantes: `@type: "Restaurant"` con tipo de cocina, menú y política de reservas.
  - Navegación: `@type: "BreadcrumbList"` en todas las páginas internas.

### 3.4 Internacionalización (ES / EN)
- Todo contenido público debe estar preparado para español (`/es/`) e inglés (`/en/`).
- Incluir etiquetas cruzadas `<link rel="alternate" hreflang="es" ...>`, `hreflang="en"` y `hreflang="x-default"`.

### 3.5 Imágenes y Rendimiento
- Todas las etiquetas `<img>` deben incluir:
  - Atributo `alt` descriptivo (sin repetición forzada de keywords).
  - `loading="lazy"` y `decoding="async"` para elementos bajo el pliegue (below the fold).
  - `fetchpriority="high"` exclusivamente para el hero o portada principal (LCP).
  - Relaciones de aspecto y dimensiones explícitas para evitar Cumulative Layout Shift (CLS).

### 3.6 Prerenderizado Estático (SSG)
- Al ejecutar `npm run build`, debe invocarse el script de prerenderizado para compilar HTML estático rastreable en `dist/` para todas las rutas públicas canónicas.

---

## 4. Control de Calidad
Antes de finalizar cualquier tarea que involucre rutas, vistas, eventos o locales:
1. Ejecutar `npm run build` para verificar cero fallos de compilación.
2. Ejecutar `node scripts/seo-audit.mjs` para verificar títulos, descripciones, canonicals y schemas.
