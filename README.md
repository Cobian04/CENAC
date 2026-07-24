# CENAC

Sitio web editorial para CENAC, un espacio cultural enfocado en arte, comunidad y aprendizaje. La interfaz presenta una experiencia limpia tipo galeria/museo moderno, con fotografias curadas, animaciones de scroll, navegacion interna, cambio de idioma y modo oscuro.

## Caracteristicas

- Hero editorial responsivo con fotografia destacada.
- Ticker inferior dentro de la pantalla inicial con clases disponibles:
  - Computacion
  - Danza
  - Pintura
  - Dibujo
  - Ingles
- Secciones independientes en una misma pagina:
  - Quienes somos
  - Clases y cursos
  - Donaciones
- Animaciones de entrada y salida ligadas al scroll.
- Cada imagen usa un estilo de movimiento distinto.
- Estilo visual minimalista tipo galeria/museo.
- Footer contrastante con derechos reservados.
- Soporte de idioma Espanol/Ingles.
- Modo claro y modo oscuro.

## Stack

- React 19
- Vinext
- Vite
- Tailwind CSS
- TypeScript

## Requisitos

- Node.js `>=22.13.0`
- pnpm recomendado

## Instalacion

```bash
pnpm install
```

## Desarrollo

```bash
pnpm run dev
```

Despues abre:

```text
http://localhost:3000
```

## Build

```bash
pnpm run build
```

## GitHub Pages

La publicacion se realiza desde la rama `gh-pages`. El sitio se genera como artefacto estatico y se publica en la raiz de esa rama.

URL esperada:

```text
https://cobian04.github.io/CENAC/
```

Para publicar una nueva version:

```bash
pnpm run build
pnpm run pages:prepare
```

Despues se sube el contenido de `dist/client` a la rama `gh-pages`.

## Estructura Principal

```text
app/
  globals.css      Estilos globales, responsive, animaciones y tema
  layout.tsx       Layout principal
  page.tsx         Pagina principal de CENAC
public/assets/     Imagenes optimizadas usadas por la web
tests/             Pruebas del render
```

## Scripts

```bash
pnpm run dev       Inicia el servidor local
pnpm run build     Genera y valida el build
pnpm run pages:prepare Prepara el artefacto para GitHub Pages
pnpm run start     Inicia el servidor de produccion
pnpm run test      Ejecuta build y pruebas
pnpm run lint      Ejecuta ESLint
```

## Creditos

Proyecto desarrollado para CENAC.

© 2026 CENAC. Todos los derechos reservados al autor.
