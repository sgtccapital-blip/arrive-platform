# ARRIVE SEO Checklist: Verificación Previa al Lanzamiento

Utiliza esta lista de comprobación antes de publicar o finalizar cualquier cambio en páginas, eventos, venues o componentes de la plataforma.

---

## 1. Metadatos & Head
- [ ] ¿El `<title>` es único, persuasivo y contiene la keyword primaria?
- [ ] ¿La `<meta name="description">` tiene entre 130 y 155 caracteres con llamado a la acción?
- [ ] ¿La etiqueta `<link rel="canonical">` apunta a la URL absoluta en HTTPS con trailing slash?
- [ ] ¿Las directivas `<meta name="robots">` son correctas (`index, follow` o `noindex, follow`)?
- [ ] ¿Las etiquetas Open Graph (`og:title`, `og:description`, `og:image`, `og:url`) están presentes?
- [ ] ¿Las tarjetas de Twitter (`twitter:card`, `twitter:image`) están completas?

---

## 2. Contenido & Estructura HTML
- [ ] ¿Existe exactamente **un solo `<h1>`** en la página?
- [ ] ¿Los encabezados siguen jerarquía lógica (`h1` -> `h2` -> `h3`) sin saltos de nivel?
- [ ] ¿Todos los enlaces internos usan tags `<a href="...">` rastreables en lugar de divs con onClick?
- [ ] ¿El texto es original y no contiene frases duplicadas de otros eventos o venues?
- [ ] ¿Las migas de pan (Breadcrumbs) reflejan la jerarquía de la categoría o barrio?

---

## 3. Datos Estructurados (Schema.org)
- [ ] ¿El bloque JSON-LD tiene sintaxis JSON válida sin comas colgantes?
- [ ] Para eventos: ¿Contiene `startDate`, `endDate`, `location`, `offers` y `eventStatus`?
- [ ] Para venues: ¿Contiene dirección física, coordenadas satelitales y horarios?
- [ ] ¿El `BreadcrumbList` contiene todas las etapas de navegación?

---

## 4. Multimedia & Performance
- [ ] ¿Todas las imágenes tienen atributo `alt` descriptivo sin keyword stuffing?
- [ ] ¿Las imágenes del Hero o portada tienen `fetchpriority="high"`?
- [ ] ¿Las imágenes secundarias tienen `loading="lazy"` y `decoding="async"`?
- [ ] ¿Las dimensiones o relaciones de aspecto están declaradas para evitar CLS?

---

## 5. Validación Automatizada
- [ ] Ejecutar `npm run build` y confirmar 0 errores de compilación.
- [ ] Ejecutar `node scripts/seo-audit.mjs` y confirmar que todas las comprobaciones pasen en verde.
