# Sanity Studio - Gestor de Contenido SUTRAMCHP

Este directorio contiene las definiciones de esquemas para **Sanity Studio** correspondiente a las secciones de **Noticias** y **Normativa Laboral** de la web SUTRAMCHP.

## 🛠️ Cómo desplegar / administrar esquemas

### Opción A: Desde la CLI de Sanity (Recomendado)

1. Instala la CLI de Sanity globalmente o ejecuta mediante `npx`:
   ```bash
   npx sanity deploy
   ```
2. Esto compilará y desplegará tu Sanity Studio a una URL alojada gratuitamente en Sanity (ejemplo: `https://sutramchp.sanity.studio`).

### Opción B: Iniciar Sanity Studio Localmente

1. Navega a esta carpeta:
   ```bash
   cd studio
   npm install
   npx sanity dev
   ```
2. Accede a `http://localhost:3333` para crear y editar noticias y normativas directamente desde tu máquina.

---

## 📝 Estructura de Contenidos

1. **Noticias (`noticia`)**:
   - **Título**: Título público del artículo.
   - **Slug**: Generado automáticamente a partir del título.
   - **Fecha**: Fecha de publicación del artículo.
   - **Publicado**: Casilla de verificación (si está activo, se muestra en la web).
   - **Imagen principal**: Imagen con área de enfoque (*hotspot*).
   - **Contenido**: Editor de texto enriquecido (*Rich Text / Portable Text*) con subtítulos H2, H3, negrita, cursiva, enlaces y listas.

2. **Normativa Laboral (`normativa`)**:
   - **Título**: Nombre oficial de la norma/resolución.
   - **Slug**: Generado automáticamente.
   - **Fecha**: Fecha de emisión de la normativa.
   - **Categoría**: Clasificación (`leyes`, `reglamentos`, `convenios`, `resoluciones`).
   - **Documento PDF**: Carga de archivo PDF descargable para los afiliados.
   - **Publicado**: Casilla de activación pública.
