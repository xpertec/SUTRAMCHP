// src/services/noticiasService.ts
import { client, urlFor } from '../lib/sanityClient'
import type { Noticia } from '../types/noticia'

// Consulta GROQ para obtener todas las noticias publicadas
const noticiasQuery = `
  *[_type == "noticia" && publicado == true] | order(fecha desc) {
    _id,
    _createdAt,
    _updatedAt,
    titulo,
    slug,
    fecha,
    contenido,
    imagen,
    publicado
  }
`

// Consulta para una sola noticia por slug
const noticiaPorSlugQuery = `
  *[_type == "noticia" && slug.current == $slug && publicado == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    titulo,
    slug,
    fecha,
    contenido,
    imagen,
    publicado
  }
`

export async function obtenerNoticias(): Promise<Noticia[]> {
  try {
    const data = await client.fetch<Noticia[]>(noticiasQuery)
    return data
  } catch (error) {
    console.error('Error al obtener noticias de Sanity:', error)
    return []
  }
}

export async function obtenerNoticiaPorSlug(slug: string): Promise<Noticia | null> {
  try {
    const data = await client.fetch<Noticia | null>(noticiaPorSlugQuery, { slug })
    return data
  } catch (error) {
    console.error('Error al obtener noticia de Sanity:', error)
    return null
  }
}

// Función helper para obtener URL de imagen optimizada
export function getImagenUrl(imagen: any, width: number = 800, height?: number) {
  if (!imagen?.asset?._ref) return null

  let imageBuilder = urlFor(imagen).width(width)
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.quality(80).fit('crop').url()
}

// Función para convertir el contenido de bloques de Sanity a HTML simple
export function contenidoToHtml(contenido: any[]): string {
  if (!contenido || !Array.isArray(contenido)) return ''

  return contenido.map(block => {
    if (block._type === 'block') {
      const style = block.style || 'normal'
      const tag = style === 'h1' ? 'h2' :
        style === 'h2' ? 'h3' :
          style === 'h3' ? 'h4' :
            style === 'blockquote' ? 'blockquote' : 'p'

      const text = block.children?.map((child: any) => child.text).join('') || ''
      return `<${tag}>${text}</${tag}>`
    }
    return ''
  }).join('')
}