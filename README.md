# SUTRAMCH

Sitio web de SUTRAMCH. Frontend estático (React + Vite) + Sanity.io como CMS
headless para noticias/blog y normativa laboral.

No hay backend Node.js: el sitio se compila a archivos estáticos y el
contenido se administra en Sanity Studio.

## Requisitos

- Node.js 20+ (solo para desarrollo/compilación local, no en el hosting)
- Una cuenta y proyecto en [sanity.io](https://www.sanity.io)

## Desarrollo local

```bash
npm install
cp .env.example .env   # completar VITE_SANITY_PROJECT_ID y VITE_SANITY_DATASET
npm run dev
```

## Compilar para producción

```bash
npm install
npm run build
```

Esto genera la carpeta `dist/` con el sitio estático completo, listo para
subir a cualquier hosting (incluido cPanel).

## Publicar en cPanel (hosting compartido)

1. Corre `npm run build` en tu máquina (o donde tengas Node).
2. Entra al **Administrador de Archivos** de cPanel (o usa FTP) y ve a
   `public_html` (o la subcarpeta de tu dominio/subdominio).
3. Sube **todo el contenido** de la carpeta `dist/` (no la carpeta en sí,
   sino lo que hay dentro: `index.html`, `assets/`, `images/`, `.htaccess`,
   `favicon.ico`) directo a `public_html`.
4. El archivo `.htaccess` ya incluido es necesario para que las rutas de
   React Router (`/blog`, `/normativa`, etc.) funcionen al recargar la
   página o entrar directo por URL. No lo borres.
5. Verifica que `VITE_SANITY_PROJECT_ID` y `VITE_SANITY_DATASET` estén
   correctos en tu `.env` **antes** de compilar — esas variables quedan
   incrustadas en el build (no se leen en tiempo de ejecución en el
   servidor, es un sitio estático).

Cada vez que cambies contenido en Sanity Studio, el sitio ya lo refleja
automáticamente (consulta la API de Sanity en cada carga). Solo necesitas
volver a compilar y resubir si cambias **código**, no contenido.

## Administrar contenido (noticias y normativa)

Todo el contenido se edita en **Sanity Studio**, no hay panel `/admin` en
el sitio. Accede a tu proyecto en https://www.sanity.io/manage o a la URL
de tu Studio desplegado.

## Estructura del proyecto

```
src/
  components/     Componentes reutilizables (UI, navegación, footer)
  pages/          Páginas (Home, Blog, Normativa, Nosotros, etc.)
  services/       Consultas a Sanity (noticiasService, normativasService)
  lib/            Cliente de Sanity
  types/          Tipos TypeScript (Noticia, Normativa)
public/           Archivos estáticos (imágenes, favicon, .htaccess)
```
