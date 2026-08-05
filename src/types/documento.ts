// src/types/documento.ts
export type DocumentoCategoria =
  | 'estatuto'
  | 'convenio_colectivo'
  | 'afiliacion'
  | 'otro'

export interface Documento {
  _id: string
  _createdAt: string
  _updatedAt: string
  titulo: string
  slug: {
    current: string
  }
  fecha?: string
  descripcion?: string
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
  categoria?: DocumentoCategoria
  publicado: boolean
}
