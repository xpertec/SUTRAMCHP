// studio/schemas/normativa.ts
export default {
  name: 'normativa',
  title: 'Normativa Laboral',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título de la Normativa / Ley / Resolución',
      type: 'string',
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug (URL amigable)',
      type: 'slug',
      options: {
        source: 'titulo',
        maxLength: 96,
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'fecha',
      title: 'Fecha de emisión / publicación',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'descripcion',
      title: 'Descripción o Resumen ejecutivo',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imagen',
      title: 'Imagen de portada (miniatura de la tarjeta)',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categoria',
      title: 'Categoría de la Normativa',
      type: 'string',
      options: {
        list: [
          { title: 'Leyes', value: 'leyes' },
          { title: 'Reglamentos', value: 'reglamentos' },
          { title: 'Convenios Colectivos', value: 'convenios' },
          { title: 'Resoluciones', value: 'resoluciones' },
        ],
        layout: 'radio',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'archivoPdf',
      title: 'Documento PDF para Descarga',
      type: 'file',
      options: {
        accept: '.pdf',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publicado',
      title: '¿Publicado en la web?',
      type: 'boolean',
      initialValue: true,
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'categoria',
    },
  },
}
