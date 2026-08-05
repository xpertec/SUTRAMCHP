import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Calendar, Home, ChevronRight } from "lucide-react";
import { obtenerNoticias, getImagenUrl } from "@/services/noticiasService";
import type { Noticia } from "@/types/noticia";
import { useSeo } from "@/hooks/useSeo";


export default function Blog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useSeo({
    title: "Noticias Sindicales — Sindicato Chinalco",
    description:
      "Noticias del Sindicato Chinalco Perú (SUTRAMCH): negociación colectiva, derechos laborales mineros, seguridad en Toromocho y novedades de los trabajadores de Chinalco Perú.",
    canonical: "https://sutramchperu.com/blog",
    keywords:
      "noticias Sindicato Chinalco, noticias SUTRAMCH, noticias laborales mineros Peru, negociación colectiva Chinalco, derechos mineros Toromocho, novedades SUTRAMCHPERU, noticias sindicales Junín",
    schema: {
      "@context": "https://schema.org",
      "@type": "Blog",
      name: "Noticias Sindicales — SUTRAMCH Sindicato Chinalco Perú",
      description:
        "Noticias y análisis sobre derechos laborales, negociación colectiva y vida sindical de los trabajadores de Chinalco Perú (Sindicato Chinalco).",
      url: "https://sutramchperu.com/blog",
      publisher: {
        "@type": "Organization",
        name: "SUTRAMCH — Sindicato Chinalco Perú",
        url: "https://sutramchperu.com",
      },
    },
  });

  useEffect(() => {
    obtenerNoticias()
      .then(setNoticias)
      .finally(() => setIsLoading(false));
  }, []);

  const noticiasFiltradas = useMemo(() => {
    if (!searchQuery) return noticias;
    const q = searchQuery.toLowerCase();
    return noticias.filter((n) => n.titulo.toLowerCase().includes(q));
  }, [noticias, searchQuery]);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Header */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)", minHeight: "32vh" }}
      >
        <div className="container-padding mx-auto text-center py-12 md:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="flex items-center justify-center gap-1.5 text-xs text-white/60 mb-4">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={12} /> Inicio
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/90">Blog</span>
          </nav>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Blog Sindical
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Noticias, análisis y recursos para nuestros agremiados
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-padding mx-auto py-8 md:py-16">
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-10">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-xl p-4 sm:p-5 card-shadow">
              <h3
                className="font-heading font-semibold text-base sm:text-lg mb-2.5"
                style={{ color: "var(--color-text-primary)" }}
              >
                Buscar
              </h3>
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-3 top-1/2 -translate-y-1/2"
                  style={{ color: "var(--color-text-muted)" }}
                />
                <input
                  type="text"
                  placeholder="Buscar artículos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-lg border text-sm focus:outline-none focus:border-[var(--color-primary)]"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
              </div>
            </div>
          </aside>

          {/* Posts Grid */}
          <div className="lg:w-3/4">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="bg-white rounded-lg overflow-hidden card-shadow"
                  >
                    <div className="aspect-video bg-gray-200 animate-pulse" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                      <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : noticiasFiltradas.length ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {noticiasFiltradas.map((noticia) => (
                  <Link
                    key={noticia._id}
                    to={`/blog/${noticia.slug.current}`}
                    className="group bg-white rounded-lg overflow-hidden card-shadow hover:shadow-xl transition-all duration-400"
                  >
                    <div className="overflow-hidden aspect-video">
                      <img
                        src={getImagenUrl(noticia.imagen, 800, 450) || "/images/news-1.jpg"}
                        alt={noticia.titulo}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                      />
                    </div>
                    <div className="p-5">
                      <span
                        className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase mb-3 bg-red-50 text-red-700"
                      >
                        Noticias
                      </span>
                      <h3
                        className="font-heading text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {noticia.titulo}
                      </h3>
                      <div
                        className="flex items-center gap-4 text-xs"
                        style={{ color: "var(--color-text-muted)" }}
                      >
                        <span className="flex items-center gap-1">
                          <Calendar size={12} />
                          {noticia.fecha
                            ? new Date(noticia.fecha).toLocaleDateString("es-PE", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              })
                            : ""}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p
                  className="text-lg"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  No se encontraron artículos
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
