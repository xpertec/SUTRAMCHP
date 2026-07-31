// src/types/noticia.ts
export interface Noticia {
  _id: string
  _createdAt: string
  titulo: string
  slug: {
    current: string
  }
  fecha: string
  contenido: any[]
  imagen?: {
    asset?: {
      _ref: string
    }
  }
  publicado: boolean
}