// src/types/normativa.ts
export interface Normativa {
  _id: string
  _createdAt: string
  _updatedAt: string
  titulo: string
  slug: {
    current: string
  }
  fecha: string
  descripcion: string
  imagen?: {
    asset?: {
      _ref: string
      _type: string
    }
  }
  archivoPdf: {
    asset?: {
      _ref: string
      _type: string
    }
  }
  categoria?: string
  publicado: boolean
}