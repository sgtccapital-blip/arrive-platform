# ARRIVE URL Structure: Taxonomía y Jerarquía de Rutas

Este documento define la taxonomía estricta para la construcción de URLs canónicas en ARRIVE.

---

## 1. Convenciones Globales
- Todas las URLs se escriben en **minúsculas** (`lowercase`).
- Los espacios se reemplazan por **guiones medios** (`kebab-case`).
- Se eliminan acentos, diacríticos y caracteres especiales (`ñ` -> `n`, `á` -> `a`).
- Todas las URLs canónicas terminan con barra final (`trailing slash /`).
- La estructura de primer nivel define el código de idioma ISO 639-1: `/es/` o `/en/`.

---

## 2. Jerarquía de Rutas

### 2.1 Home y Hubs Principales
```
https://arrivepanama.com/es/
https://arrivepanama.com/en/
```

### 2.2 Hubs de Categoría por Ciudad
```
https://arrivepanama.com/es/panama/nightlife/
https://arrivepanama.com/es/panama/clubs/
https://arrivepanama.com/es/panama/parties/
https://arrivepanama.com/es/panama/events/
https://arrivepanama.com/es/panama/rooftops/
https://arrivepanama.com/es/panama/restaurants/
https://arrivepanama.com/es/panama/concierge/
```

### 2.3 Hubs por Barrio
```
https://arrivepanama.com/es/panama/casco-viejo/nightlife/
https://arrivepanama.com/es/panama/casco-viejo/clubs/
https://arrivepanama.com/es/panama/casco-viejo/restaurants/
https://arrivepanama.com/es/panama/casco-viejo/rooftops/

https://arrivepanama.com/es/panama/bella-vista/nightlife/
https://arrivepanama.com/es/panama/costa-del-este/rooftops/
```

### 2.4 Páginas Temporales
```
https://arrivepanama.com/es/panama/events/today/
https://arrivepanama.com/es/panama/events/tomorrow/
https://arrivepanama.com/es/panama/events/this-weekend/
https://arrivepanama.com/es/panama/events/friday/
https://arrivepanama.com/es/panama/events/saturday/
```

### 2.5 Entidades Singulares Canónicas
```
https://arrivepanama.com/es/events/{event-slug}/
https://arrivepanama.com/es/venues/{venue-slug}/
https://arrivepanama.com/es/restaurants/{restaurant-slug}/
https://arrivepanama.com/es/experiences/{experience-slug}/
```

*Ejemplos Reales:*
- `/es/events/furia-tini-after-party/`
- `/es/events/furia-midweek-boiler-reggaeton/`
- `/es/events/terraplen-hiphop-reggaeton-party/`
- `/es/events/terraplen-reggaeton-viejito-party/`
- `/es/venues/furia-club/`
- `/es/venues/terraplen-rooftop/`
- `/es/venues/piano-bar-panama/`
- `/es/venues/primavera-rooftop/`
- `/es/venues/cielo-rooftop/`
- `/es/restaurants/furia-club/`
- `/es/restaurants/terraplen-rooftop/`

---

## 3. Manejo de Parámetros y Filtros
Los parámetros técnicos de la UI nunca deben generar URLs indexables alternativas:
- `?utm_source=*`, `?fbclid=*` -> Redirigen o tienen como canonical la URL base limpia.
- Filtros interactivos temporales en la UI (ej. selector de fecha en vivo) mantienen la canonical apuntando al hub correspondiente (`/panama/events/`).
