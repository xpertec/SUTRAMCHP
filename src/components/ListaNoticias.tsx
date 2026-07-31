// src/components/ListaNoticias.tsx
import { useEffect, useState } from 'react'
import { obtenerNoticias, getImagenUrl, contenidoToHtml } from '../services/noticiasService'
import type { Noticia } from '../types/noticia'

export function ListaNoticias() {
  const [noticias, setNoticias] = useState<Noticia[]>([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const cargarNoticias = async () => {
      try {
        setCargando(true)
        setError(null)
        const datos = await obtenerNoticias()
        setNoticias(datos)
      } catch (err) {
        setError('Error al cargar las noticias')
        console.error(err)
      } finally {
        setCargando(false)
      }
    }

    cargarNoticias()
  }, [])

  if (cargando) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        {error}
      </div>
    )
  }

  if (noticias.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p className="text-lg">No hay noticias disponibles</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {noticias.map((noticia) => (
        <article 
          key={noticia._id} 
          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
        >
          {/* Imagen destacada */}
          {noticia.imagen && getImagenUrl(noticia.imagen) && (
            <div className="h-48 overflow-hidden">
              <img
                src={getImagenUrl(noticia.imagen, 800, 400)!}
                alt={noticia.titulo}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
            </div>
          )}

          {/* Contenido */}
          <div className="p-6">
            {/* Fecha */}
            <time className="text-sm text-gray-500 mb-2 block">
              {new Date(noticia.fecha).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>

            {/* Título */}
            <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
              {noticia.titulo}
            </h3>

            {/* Extracto del contenido */}
            <div 
              className="text-gray-600 line-clamp-3 mb-4"
              dangerouslySetInnerHTML={{ 
                __html: contenidoToHtml(noticia.contenido) 
              }}
            />

            {/* Botón leer más */}
            <button 
              className="text-blue-600 hover:text-blue-800 font-medium transition-colors"
              onClick={() => {
                // Aquí puedes navegar a la página de detalle
                console.log('Ver noticia:', noticia.slug.current)
              }}
            >
              Leer más →
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}