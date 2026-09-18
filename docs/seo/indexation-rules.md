# ARRIVE Indexation Rules & Gestión del Ciclo de Vida de Eventos Pasados

Este documento establece las políticas de indexación y el tratamiento de eventos que ya finalizaron para preservar el link equity sin degradar la experiencia de búsqueda.

---

## 1. Matriz de Indexación Global

| Tipo de Página | Directiva Robots | Inclusión en Sitemap |
|---|---|---|
| Home (`/es/`, `/en/`) | `index, follow` | SÍ (`priority: 1.0`) |
| Hubs de Categoría (`/panama/nightlife/`, `/rooftops/`) | `index, follow` | SÍ (`priority: 0.9`) |
| Hubs de Barrio (`/casco-viejo/clubs/`) | `index, follow` | SÍ (`priority: 0.8`) |
| Hubs Temporales (`/events/today/`, `/this-weekend/`) | `index, follow` | SÍ (`priority: 0.9`, actualización diaria) |
| Perfiles de Venue (`/venues/furia-club/`) | `index, follow` | SÍ (`priority: 0.8`) |
| Eventos Activos (`/events/furia-tini-after-party/`) | `index, follow` | SÍ (`priority: 0.7`) |
| Eventos Pasados (< 30 días) | `index, follow` | SÍ (`priority: 0.4`) |
| Eventos Pasados (> 60 días sin backlinks) | `noindex, follow` | NO (Removido del sitemap) |
| Resultados de Búsqueda Interna (`?q=*`) | `noindex, follow` | NO |
| Modales Técnicos (Admin, Pases, Cupones) | `noindex, nofollow` | NO |

---

## 2. Estrategia para Eventos Expirados / Finalizados

**Regla Mandatoria**: NUNCA devolver un error 404 para un evento expirado reciente, ya que destruiría enlaces entrantes y señales de autoridad acumuladas.

### Ciclo de Vida de la URL de un Evento:

1. **Fase Activa (Antes del Evento)**:
   - Estado: `eventStatus: "EventScheduled"`.
   - Botón visible: *Obtener Pase Digital / Reserva VIP*.
   - Meta robots: `index, follow`.

2. **Fase Inmediata Post-Evento (Día 1 a Día 30)**:
   - La URL se mantiene activa.
   - En la parte superior de la página se inyecta un banner informativo elegante:
     `"Este evento finalizó el [Fecha]. Mira los próximos eventos programados en [Venue] o eventos similares este fin de semana."`
   - El Schema se actualiza a `eventStatus: "EventEnded"`.
   - Se muestran tarjetas de **Próximos Eventos Recomendados**.

3. **Fase de Archivo (Día 31 en adelante)**:
   - Si la URL tiene tráfico orgánico o enlaces externos, se mantiene activa con enlaces a eventos futuros.
   - Si no tiene tráfico ni enlaces, se aplica `noindex, follow` para conservar crawl budget o se redirige mediante 301 al perfil permanente del Venue (`/venues/{slug}/`).
