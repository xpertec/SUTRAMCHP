import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { obtenerNoticias, getImagenUrl } from "@/services/noticiasService";
import type { Noticia } from "@/types/noticia";

const categoryColors: Record<string, string> = {
  "Negociación Colectiva": "bg-blue-50 text-blue-700",
  "Seguridad Laboral": "bg-green-50 text-green-700",
  "Derechos Sindicales": "bg-purple-50 text-purple-700",
  Noticias: "bg-red-50 text-red-700",
  Eventos: "bg-amber-50 text-amber-700",
  Capacitación: "bg-teal-50 text-teal-700",
};

export default function NewsSection() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    obtenerNoticias()
      .then((data) => setNoticias(data.slice(0, 3)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-padding mx-auto">
        {/* Section Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-2"
              style={{ color: "var(--color-secondary)" }}
            >
              NOTICIAS
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Actualidad Sindical
            </h2>
          </div>
          <Link
            to="/blog"
            className="hidden sm:flex items-center gap-1.5 text-sm font-semibold hover:gap-2.5 transition-all"
            style={{ color: "var(--color-primary)" }}
          >
            Ver todas <ArrowRight size={16} />
          </Link>
        </div>

        {/* News Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card-shadow rounded-lg overflow-hidden bg-white"
              >
                <div className="aspect-video bg-gray-200 animate-pulse" />
                <div className="p-5 space-y-3">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse" />
                  <div className="h-5 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-4 w-full bg-gray-200 rounded animate-pulse" />
                  <div className="h-3 w-24 bg-gray-200 rounded animate-pulse" />
                </div>
              </div>
            ))}
          </div>
        ) : noticias.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {noticias.map((post) => (
              <Link
                key={post._id}
                to={`/blog/${post.slug.current}`}
                className="news-card group block card-shadow rounded-lg overflow-hidden bg-white hover:shadow-xl transition-all duration-400"
              >
                <div className="overflow-hidden aspect-video">
                  <img
                    src={getImagenUrl(post.imagen, 800, 450) || "/images/news-1.jpg"}
                    alt={post.titulo}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
                    loading="lazy"
                  />
                </div>
                <div className="p-5">
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase mb-3 ${categoryColors["Noticias"] ||
                      "bg-gray-50 text-gray-600"
                      }`}
                  >
                    Noticias
                  </span>
                  <h3
                    className="font-heading text-lg font-semibold mb-2 line-clamp-2 group-hover:text-[var(--color-primary)] transition-colors"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {post.titulo}
                  </h3>
                  <p
                    className="text-xs"
                    style={{ color: "var(--color-text-muted)" }}
                  >
                    {post.fecha
                      ? new Date(post.fecha).toLocaleDateString("es-PE", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                      : ""}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div
            className="text-center py-16 rounded-xl"
            style={{ backgroundColor: "var(--color-surface-alt)" }}
          >
            <p
              className="text-base"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Aún no hay noticias publicadas. Vuelve pronto.
            </p>
          </div>
        )}

        <div className="sm:hidden mt-6 text-center">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-sm font-semibold"
            style={{ color: "var(--color-primary)" }}
          >
            Ver todas <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
