// studio/schemas/documento.ts
export default {
  name: 'documento',
  title: 'Documentos Sindicales',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título del Documento',
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
      title: 'Fecha del documento',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
    },
    {
      name: 'descripcion',
      title: 'Descripción o Resumen',
      type: 'text',
      rows: 3,
    },
    {
      name: 'imagen',
      title: 'Imagen de portada (miniatura de la tarjeta)',
      type: 'image',
      description:
        'Opcional. Si no subes una imagen, la página usará la primera página del PDF como miniatura.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categoria',
      title: 'Categoría del Documento',
      type: 'string',
      options: {
        list: [
          { title: 'Estatutos', value: 'estatuto' },
          { title: 'Convenios Colectivos', value: 'convenio_colectivo' },
          { title: 'Hojas de Afiliación', value: 'afiliacion' },
          { title: 'Otros', value: 'otro' },
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
