// studio/schemas/noticia.ts
export default {
  name: 'noticia',
  title: 'Noticias',
  type: 'document',
  fields: [
    {
      name: 'titulo',
      title: 'Título',
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
      title: 'Fecha de publicación',
      type: 'date',
      options: {
        dateFormat: 'YYYY-MM-DD',
      },
      validation: (Rule: any) => Rule.required(),
    },
    {
      name: 'publicado',
      title: '¿Publicado en la web?',
      type: 'boolean',
      initialValue: true,
    },
    {
      name: 'imagen',
      title: 'Imagen principal',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'contenido',
      title: 'Contenido del Artículo',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Subtítulo Principal (H2)', value: 'h2' },
            { title: 'Subtítulo Secundario (H3)', value: 'h3' },
            { title: 'Cita destacada', value: 'blockquote' },
          ],
          lists: [
            { title: 'Viñetas (Puntos)', value: 'bullet' },
            { title: 'Lista numerada', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Negrita', value: 'strong' },
              { title: 'Cursiva', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Enlace Web',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'titulo',
      subtitle: 'fecha',
      media: 'imagen',
    },
  },
}
