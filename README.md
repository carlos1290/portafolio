# Carlos Gonzalez — Portafolio "El 90% bajo el agua"

Portafolio web interactivo con la metáfora de un **iceberg**: solo el 10% se ve
desde la superficie, y a medida que hacés scroll te sumergís en un océano
animado que revela distintas capas de mi perfil profesional.

 **Sitio en vivo:** https://carlos1290.github.io/portafolio/

---

## Índice

- [Stack tecnológico](#stack-tecnológico)
- [Cómo funciona la experiencia](#cómo-funciona-la-experiencia)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Las zonas de profundidad](#las-zonas-de-profundidad)
- [La pasarela de proyectos](#la-pasarela-de-proyectos)
- [Contacto](#contacto)
- [Accesibilidad y rendimiento](#accesibilidad-y-rendimiento)
- [Desarrollo local](#desarrollo-local)
- [Despliegue continuo con GitHub Pages](#despliegue-continuo-con-github-pages)
- [Personalización](#personalización)

---

## Stack tecnológico

| Capa | Tecnología |
|------|------------|
| Framework | React 18 |
| Build / dev server | Vite 5 |
| Estilos | CSS3 puro (custom properties, sin frameworks ni Tailwind) |
| Animaciones | CSS keyframes + scroll-driven variables (cero librerías de animación) |
| Lenguaje | JavaScript (ESM, JSX) |
| Hosting | GitHub Pages vía GitHub Actions |

**Sin dependencias de runtime además de React**: las olas, el iceberg, las
burbujas y los rayos son SVG + CSS; la lógica de scroll son ~60 líneas de JS.

---

## Cómo funciona la experiencia

El corazón es una única variable CSS — `--p` (progreso de scroll de `0` a `1`)
— alimentada por un listener de scroll con `requestAnimationFrame`
(`src/hooks/useScrollDepth.js`). Todo lo demás se deriva de ella por CSS:

```
scroll ──▶ rAF ──▶ documentElement.style.setProperty('--p', 0..1)
                        │
        ┌───────────────┼──────────────────┬─────────────────┐
        ▼               ▼                  ▼                 ▼
  Iceberg SVG      Línea de agua      Degradado del      Opacidad de
  (se hunde)       (sube y sale)      océano (oscurece)  rayos/burbujas
```

- **`<Ocean />`** (`components/Ocean.jsx`): escena fija (`position: fixed`,
  `z-index: -1`) que vive detrás del contenido: cielo, agua con degradado de
  profundidad, olas SVG animadas, rayos de luz, 16 burbujas y 24 partículas
  bioluminiscentes. El iceberg es un SVG con dos masas: la punta visible (10%)
  y la masa sumergida (90%), que se hunde con `top: calc(... var(--p) ...)`.
- **`<DepthGauge />`**: HUD estilo sonar (abajo a la izquierda) que muestra la
  profundidad actual (0 → −900 m), la zona en la que estás y una barra de
  inmersión. Se actualiza por manipulación DOM directa desde el mismo rAF, sin
  re-renders de React.
- **Reveals**: `useReveal()` usa un `IntersectionObserver` que agrega
  `.is-visible` a los elementos con `data-reveal` (fade + slide-up escalonado).

## Estructura del proyecto

```
├── .github/workflows/deploy-pages.yml   # CI/CD → GitHub Pages
├── index.html                           # Fuentes (Unbounded, Sora, IBM Plex Mono)
├── vite.config.js                       # base: '/portafolio/' para Pages
├── src/
│   ├── main.jsx / App.jsx               # Composición + hooks de scroll
│   ├── index.css                        # Tema completo (custom properties)
│   ├── data/
│   │   └── projects.json                # ← fichas de la pasarela (editable)
│   ├── hooks/
│   │   └── useScrollDepth.js            # --p, HUD, zonas, reveals
│   └── components/
│       ├── Ocean.jsx                    # Escena marina fija
│       ├── DepthGauge.jsx               # HUD de profundidad
│       ├── Navbar.jsx / Footer.jsx
│       ├── Hero.jsx                     # Superficie (0 m)
│       ├── About.jsx                    # Bitácora + educación
│       ├── Skills.jsx                   # Competencias + formaciones
│       ├── Projects.jsx                 # Pasarela (carrusel flotante)
│       ├── ProjectCard.jsx              # Ficha individual
│       ├── ProjectModal.jsx             # Ficha extendida (overlay)
│       ├── Experience.jsx               # Equipos Consultores
│       └── Contact.jsx                  # Contacto + referencia
```

## Las zonas de profundidad

El contenido del CV está mapeado a zonas reales del océano:

| Zona | Profundidad | Sección | Contenido |
|------|-------------|---------|-----------|
| Superficie | 0 m | Hero | Presentación — "lo que ves es solo el 10%" |
| Zona iluminada | −040 m | Bitácora de buceo | Sobre mí + educación (UDELAR, ÁNMA TEC) |
| Zona crepuscular | −180 m | El arsenal | Competencias técnicas y transversales + formaciones (Senpai, Hattrick, Evertec/Scrum) |
| Zona de penumbra | −280 m | Pasarela de proyectos | Carrusel de proyectos |
| Zona de medianoche | −450 m | Expedición | Experiencia en Equipos Consultores (BI, QA, georreferenciación) |
| El abismo | −900 m | Fondo del océano | Contacto + referencia profesional |

## La pasarela de proyectos

`Projects.jsx` implementa un carrusel "flotante":

- **Autoplay en bucle**: avanza una ficha cada 3,5 s (`AUTOPLAY_MS`) con
  transición suave; al llegar al final vuelve al inicio.
- **Navegación solo por flechas** ‹/›: el arrastre manual y la scrollbar están
  deshabilitados (`overflow-x: hidden` + `touch-action: pan-y`).
- **Pausas inteligentes**: el autoplay se detiene con hover sobre la galería,
  con foco de teclado en las flechas, al ocultar la pestaña
  (`visibilitychange`) y permanentemente con `prefers-reduced-motion`.
- **Ficha activa** destacada con borde turquesa + glow; indicador de puntos
  (solo visual) debajo.
- **Modal de detalle** (`ProjectModal.jsx`): accesible — `role="dialog"`,
  `aria-modal`, foco inicial en el botón cerrar, cierre con `Escape` o click
  en el backdrop, scroll del body bloqueado. Muestra resumen, arquitectura,
  métricas clave y enlaces.

## Contacto

- El correo es **una sola etiqueta**: al hacer clic copia el mail al
  portapapeles (con toast de confirmación `role="status"`) y abre **Gmail web**
  en una pestaña nueva (`https://mail.google.com/mail/?view=cm&fs=1&to=…`),
  evitando la app nativa de correo.
- El formulario no tiene backend: al enviarlo compone el mail en Gmail con
  asunto y cuerpo prellenados desde los campos.
- Fallback de copiado con `document.execCommand('copy')` para navegadores sin
  Clipboard API.

## Accesibilidad y rendimiento

- `prefers-reduced-motion`: desactiva olas, rayos, iceberg flotando, burbujas,
  autoplay del carrusel y animaciones del modal.
- HTML semántico (`section`, `article`, `nav`, `blockquote`), jerarquía de
  encabezados, `:focus-visible` con outline turquesa, labels reales en el
  formulario, contraste AA sobre fondos oscuros.
- Escena fija con `pointer-events: none` y `aria-hidden="true"`.
- Bundle: ~54 kB JS gzip + ~5 kB CSS gzip, sin librerías extra. El scroll
  listener usa un único `requestAnimationFrame` y escribe solo propiedades CSS.

## Desarrollo local

```bash
npm install
npm run dev        # http://localhost:5173/portafolio/
npm run build      # genera dist/
npm run preview    # sirve el build
```

## Despliegue continuo con GitHub Pages

`.github/workflows/deploy-pages.yml` se ejecuta en **cada push a `main`**:

1. `npm ci` + `npm run build` (Node 20)
2. `actions/configure-pages@v5` con `enablement: true` (crea el sitio Pages si no existe)
3. `actions/upload-pages-artifact@v3` publica `dist/`
4. `actions/deploy-pages@v4` despliega

Requisitos del repo: **público** (plan gratuito) y Pages con *source*
**GitHub Actions** (o dejar que `enablement: true` lo configure).
Gracias a `base: '/portafolio/'` en `vite.config.js`, el sitio funciona bajo
la ruta `/portafolio/` tanto en el build como en el dev server local.

## Personalización

| Quiero cambiar… | Editar |
|-----------------|--------|
| Un proyecto de la pasarela | `src/data/projects.json` (título, rol, descripción, tags, `captura_o_demo`, enlaces, arquitectura, métricas) |
| Una captura real | `captura_o_demo` en `projects.json` con una ruta (ej. `"/portafolio/img/proyecto.png"`, archivo en `public/img/`) |
| Colores / tipografías | Bloque `:root` de `src/index.css` |
| Velocidad del autoplay | `AUTOPLAY_MS` en `src/components/Projects.jsx` |
| Profundidad de cada zona | `zone-marker` en cada componente + escala `p * 900` en `useScrollDepth.js` |
| Mis datos de contacto | `src/components/Contact.jsx` (constantes `EMAIL` / `GMAIL_COMPOSE`) |

---

© 2026 Carlos Gonzalez — Montevideo, Uruguay.
