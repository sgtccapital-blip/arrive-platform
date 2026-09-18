# ARRIVE Technical SEO: Indexabilidad, Robots, Canonicals & Core Web Vitals

Este documento resume los requerimientos técnicos y de rendimiento para maximizar el rastreo y posicionamiento en Google.

---

## 1. Configuración de `robots.txt`
El archivo `public/robots.txt` debe permitir el rastreo libre de todas las rutas públicas y componentes visuales, protegiendo únicamente áreas de administración o modales de cupones internos:

```txt
User-agent: *
Allow: /
Allow: /images/
Allow: /assets/
Disallow: /admin/
Disallow: /api/
Disallow: /checkout/

Sitemap: https://arrivepanama.com/sitemap.xml
Sitemap: https://arrivepanama.com/sitemap-events.xml
Sitemap: https://arrivepanama.com/sitemap-venues.xml
Sitemap: https://arrivepanama.com/sitemap-pages.xml
```

---

## 2. Canonicalización Estricta
Para evitar canibalización o parámetros duplicados:
1. **Regla de URL Canónica**: La etiqueta `<link rel="canonical" href="...">` debe contener siempre la versión HTTPS con dominio canónico y barra final (`/`).
2. **Eliminación de Parámetros**: Parámetros como `?fbclid=`, `?ref=`, `?gclid=`, `?filter=`, `?sort=` se ignoran en el canonical, apuntando a la URL limpia.

---

## 3. Optimización de Core Web Vitals (CWV)

### 3.1 LCP (Largest Contentful Paint) < 2.0s
- La imagen principal de portada (hero flyer o imagen del venue) debe usar:
  ```html
  <img src="..." fetchpriority="high" decoding="async" alt="..." />
  ```
- Preconexión a CDN de fuentes en `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  ```

### 3.2 CLS (Cumulative Layout Shift) < 0.05
- Todas las tarjetas de eventos y venues deben reservar su espacio vertical con `aspect-ratio: 1 / 1` o `min-height` fijo para evitar que la carga de imágenes mueva el contenido inferior.

### 3.3 INP (Interaction to Next Paint) < 150ms
- Los manejadores de eventos (apertura de menú, filtros, modals) se ejecutan con listeners ligeros en React sin bloquear el hilo principal.
