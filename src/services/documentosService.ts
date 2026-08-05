// src/services/documentosService.ts
import { client, urlFor } from '../lib/sanityClient'
import type { Documento } from '../types/documento'

// Consulta GROQ para obtener todos los documentos publicados
const documentosQuery = `
  *[_type == "documento" && publicado == true] | order(fecha desc) {
    _id,
    _createdAt,
    _updatedAt,
    titulo,
    slug,
    fecha,
    descripcion,
    imagen,
    archivoPdf,
    categoria,
    publicado
  }
`

// Consulta para un solo documento por slug
const documentoPorSlugQuery = `
  *[_type == "documento" && slug.current == $slug && publicado == true][0] {
    _id,
    _createdAt,
    _updatedAt,
    titulo,
    slug,
    fecha,
    descripcion,
    imagen,
    archivoPdf,
    categoria,
    publicado
  }
`

export async function obtenerDocumentos(): Promise<Documento[]> {
  try {
    const data = await client.fetch<Documento[]>(documentosQuery)
    return data
  } catch (error) {
    console.error('Error al obtener documentos de Sanity:', error)
    return []
  }
}

export async function obtenerDocumentoPorSlug(slug: string): Promise<Documento | null> {
  try {
    const data = await client.fetch<Documento | null>(documentoPorSlugQuery, { slug })
    return data
  } catch (error) {
    console.error('Error al obtener documento de Sanity:', error)
    return null
  }
}

// Función helper para obtener URL de imagen optimizada
export function getImagenUrl(imagen: any, width: number = 400, height?: number) {
  if (!imagen?.asset?._ref) return null

  let imageBuilder = urlFor(imagen).width(width)
  if (height) {
    imageBuilder = imageBuilder.height(height)
  }

  return imageBuilder.quality(80).fit('crop').url()
}

// Función helper para obtener URL del PDF
export function getPdfUrl(archivoPdf: any): string | null {
  if (!archivoPdf?.asset?._ref) return null

  const ref = archivoPdf.asset._ref
  const parts = ref.split('-')
  if (parts.length >= 3) {
    const fileId = parts.slice(1, -1).join('-')
    const extension = parts[parts.length - 1]
    const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || 't7kvp1j8'
    const dataset = import.meta.env.VITE_SANITY_DATASET || 'production'
    return `https://cdn.sanity.io/files/${projectId}/${dataset}/${fileId}.${extension}`
  }

  return null
}
