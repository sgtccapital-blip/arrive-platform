# ARRIVE Programmatic SEO: Generación de Landings & Reglas Anti-Thin Content

Este documento define la arquitectura y los filtros algorítmicos para escalar cientos de páginas de aterrizaje útiles sin riesgo de penalización por contenido vacío.

---

## 1. Dimensiones Programáticas

ARRIVE combina 4 dimensiones de datos reales para generar landings:

```
[Localidad / Barrio]  x  [Categoría / Género]  x  [Temporalidad]  x  [Intención VIP]
```

### Ejemplos de Rutas Resultantes:
- `/es/panama/events/today/` (Fiestas hoy en Panamá)
- `/es/panama/events/this-weekend/` (Eventos este fin de semana)
- `/es/panama/casco-viejo/rooftops/` (Rooftops en Casco Antiguo)
- `/es/panama/reggaeton/` (Eventos de reggaeton)
- `/es/panama/ladies-night/` (Noches de chicas y cortesías)

---

## 2. Regla de Oro: Threshold de Contenido Mínimo (Zero Thin Content)

Una landing programática **SOLO es indexable** si cumple **TODAS** las siguientes condiciones:
1. **Inventario Mínimo Activo**: Debe contar con al menos **1 evento programado o 1 venue verificado** en su segmento.
2. **Contexto Editorial Único**: Debe poseer una introducción original redactada por el motor de contenido (mínimo 60 palabras) describiendo la atmósfera, zona y código de vestimenta.
3. **Enlaces Cruzados Rastreables**: Debe incluir enlaces a los venues participantes y a los perfiles de los DJs.

### Comportamiento cuando el Inventario es 0:
- Si no hay eventos activos en la combinación (ej. una fecha lejana o un género sin cartelera inmediata):
  - La página **NO se indexa**: Aplica automáticamente `<meta name="robots" content="noindex, follow" />`.
  - En la UI se muestra un mensaje informativo elegante y enlaces a las fiestas activas más cercanas.
  - La URL se **excluye automáticamente del sitemap XML**.

---

## 3. Matriz de Combinaciones Permitidas

| Dimensión A | Dimensión B | ¿Indexable? | Condición de Activación |
|---|---|---|---|
| Ciudad (Panamá) | Categoría (Nightlife, Clubs, Rooftops) | **SÍ** (`index, follow`) | Siempre (Contenido permanente). |
| Barrio (Casco Viejo) | Categoría (Rooftops, Clubs, Restaurants) | **SÍ** (`index, follow`) | Venues activos en ese barrio. |
| Temporalidad (Today, Tomorrow, Weekend) | Ciudad (Panamá) | **SÍ** (`index, follow`) | Al menos 1 evento activo en ese rango de fecha. |
| Género (Reggaeton, Hip Hop, Boiler) | Ciudad (Panamá) | **SÍ** (`index, follow`) | Al menos 1 evento activo con ese tag musical. |
| Barrio + Género + Día (combinación hiperespecífica) | Casco + Reggaeton + Martes | **NO** (`noindex, follow`) | Evitar sobre-fragmentación y canibalización de palabras clave. |
