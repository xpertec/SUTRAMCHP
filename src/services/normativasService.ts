// src/services/normativasService.ts
import { client, urlFor } from '../lib/sanityClient'
import type { Normativa } from '../types/normativa'

// Consulta GROQ para obtener todas las normativas publicadas
const normativasQuery = `
  *[_type == "normativa" && publicado == true] | order(fecha desc) {
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

// Consulta para una sola normativa por slug
const normativaPorSlugQuery = `
  *[_type == "normativa" && slug.current == $slug && publicado == true][0] {
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

export async function obtenerNormativas(): Promise<Normativa[]> {
  try {
    const data = await client.fetch<Normativa[]>(normativasQuery)
    return data
  } catch (error) {
    console.error('Error al obtener normativas de Sanity:', error)
    return []
  }
}

export async function obtenerNormativaPorSlug(slug: string): Promise<Normativa | null> {
  try {
    const data = await client.fetch<Normativa | null>(normativaPorSlugQuery, { slug })
    return data
  } catch (error) {
    console.error('Error al obtener normativa de Sanity:', error)
    return null
  }
}

// Función helper para obtener URL de imagen optimizada (miniatura de tarjeta)
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

// Función para obtener el nombre del archivo
export function getNombreArchivo(archivoPdf: any): string {
  if (!archivoPdf?.asset?._ref) return 'documento.pdf'

  return 'normativa.pdf'
}

// Función para descargar el PDF
export async function descargarPdf(archivoPdf: any, titulo: string) {
  const url = getPdfUrl(archivoPdf)
  if (!url) {
    console.error('No se pudo obtener la URL del PDF')
    return
  }

  try {
    const link = document.createElement('a')
    link.href = url
    link.download = `${titulo.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.pdf`
    link.target = '_blank'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  } catch (error) {
    console.error('Error al descargar el PDF:', error)
    window.open(url, '_blank')
  }
}