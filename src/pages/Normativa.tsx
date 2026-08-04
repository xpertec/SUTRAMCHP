import { useEffect, useMemo, useState } from "react";
import {
  Scale,
  FileText,
  Shield,
  Users,
  Download,
  Search,
} from "lucide-react";
import {
  obtenerNormativas,
  getPdfUrl,
  getImagenUrl,
} from "@/services/normativasService";
import type { Normativa as NormativaType } from "@/types/normativa";
import { useSeo } from "@/hooks/useSeo";


const categories = [
  { id: "all", label: "Todos" },
  { id: "leyes", label: "Leyes" },
  { id: "reglamentos", label: "Reglamentos" },
  { id: "convenios", label: "Convenios" },
  { id: "resoluciones", label: "Resoluciones" },
];

const CATEGORY_ICONS: Record<string, React.ReactNode> = {
  leyes: <Scale size={24} />,
  reglamentos: <FileText size={24} />,
  convenios: <Users size={24} />,
  resoluciones: <Shield size={24} />,
};

export default function Normativa() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [normativas, setNormativas] = useState<NormativaType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useSeo({
    title: "Normativa Laboral",
    description:
      "Repositorio de leyes, reglamentos, convenios y resoluciones que protegen los derechos de los trabajadores mineros de Chinalco Perú. Descarga documentos laborales vigentes.",
    canonical: "https://sutramchperu.com/normativa",
    keywords:
      "sindicato chinalco, sindicato minero chinalco, SUTRAMCH, SUTRAMCHPERU, chinalco, chinalco peru",
    schema: {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Normativa Laboral Minera — SUTRAMCHP",
      description:
        "Marco legal que protege los derechos de los trabajadores mineros de Chinalco Perú: leyes, reglamentos, convenios y resoluciones laborales.",
      url: "https://sutramchperu.com/normativa",
      isPartOf: {
        "@type": "WebSite",
        name: "SUTRAMCHP",
        url: "https://sutramchperu.com",
      },
    },
  });

  useEffect(() => {
    obtenerNormativas()
      .then(setNormativas)
      .finally(() => setIsLoading(false));
  }, []);

  const documents = useMemo(() => {
    return normativas.filter((doc) => {
      const matchCategory =
        activeCategory === "all" || doc.categoria === activeCategory;
      const matchSearch =
        !searchQuery ||
        doc.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
        doc.descripcion?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [normativas, activeCategory, searchQuery]);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Hero */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)", minHeight: "26vh" }}
      >
        <div className="container-padding mx-auto text-center py-12 md:py-14">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Normativa Laboral
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Marco legal que protege los derechos de los trabajadores mineros
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="container-padding mx-auto pt-10 pb-12 md:pt-14 md:pb-16">
        {/* Section header: barra de acento + título + contador (estilo "Normas") */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
          <div
            className="flex items-start gap-4 pl-4 border-l-4"
            style={{ borderColor: "var(--color-primary)" }}
          >
            <div>
              <h2
                className="font-heading text-2xl sm:text-3xl font-bold"
                style={{ color: "var(--color-text-primary)" }}
              >
                Normas
              </h2>
              <p
                className="text-sm mt-1"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Leyes, reglamentos y resoluciones que amparan a los
                trabajadores mineros
              </p>
            </div>
          </div>
          {!isLoading && (
            <span
              className="text-sm font-semibold shrink-0"
              style={{ color: "var(--color-primary)" }}
            >
              {documents.length}{" "}
              {documents.length === 1 ? "documento" : "documentos"}
            </span>
          )}
        </div>

        {/* Search & Filters */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 mb-8">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              style={{ color: "var(--color-text-muted)" }}
            />
            <input
              type="text"
              placeholder="Buscar documentos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-lg border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)]"
              style={{ borderColor: "var(--color-surface-alt)" }}
            />
          </div>
          <div className="flex overflow-x-auto no-scrollbar pb-2 lg:pb-0 gap-2 shrink-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "text-white shadow-sm"
                    : "bg-white hover:bg-gray-50 text-[var(--color-text-secondary)]"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: "var(--color-primary)" }
                    : {
                        border: "1px solid var(--color-surface-alt)",
                      }
                }
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Documents Grid — tarjeta con miniatura, fecha destacada y título */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 sm:p-5 rounded-xl border bg-white animate-pulse"
                style={{ borderColor: "var(--color-surface-alt)" }}
              >
                <div
                  className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg shrink-0"
                  style={{ backgroundColor: "var(--color-surface-alt)" }}
                />
                <div className="flex-1 min-w-0 space-y-2 pt-1">
                  <div
                    className="h-3 w-1/3 rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                  <div
                    className="h-4 w-full rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                  <div
                    className="h-4 w-2/3 rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                </div>
              </div>
            ))
          ) : documents.length ? (
            documents.map((doc) => {
              const pdfUrl = getPdfUrl(doc.archivoPdf);
              const imagenUrl = getImagenUrl(doc.imagen, 200, 200);
              return (
                <a
                  key={doc._id}
                  href={pdfUrl ?? undefined}
                  target={pdfUrl ? "_blank" : undefined}
                  rel={pdfUrl ? "noreferrer" : undefined}
                  aria-disabled={!pdfUrl}
                  className={`group flex items-start gap-4 p-4 sm:p-5 rounded-xl border bg-white transition-all hover:shadow-md ${
                    pdfUrl ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{ borderColor: "var(--color-surface-alt)" }}
                  onClick={(e) => {
                    if (!pdfUrl) e.preventDefault();
                  }}
                >
                  {/* Miniatura */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {imagenUrl ? (
                      <img
                        src={imagenUrl}
                        alt={doc.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white">
                        {(doc.categoria && CATEGORY_ICONS[doc.categoria]) ?? (
                          <FileText size={26} />
                        )}
                      </span>
                    )}
                  </div>

                  {/* Fecha + título */}
                  <div className="flex-1 min-w-0 pt-0.5">
                    {doc.fecha && (
                      <p
                        className="text-xs sm:text-sm font-bold mb-1"
                        style={{ color: "var(--color-primary)" }}
                      >
                        {new Date(doc.fecha).toLocaleDateString("es-PE", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                    )}
                    <h3
                      className="font-heading text-sm sm:text-base font-bold uppercase leading-snug transition-colors group-hover:text-[var(--color-primary)]"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {doc.titulo}
                    </h3>
                    <div className="flex items-center gap-2 mt-2">
                      {doc.categoria && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase"
                          style={{ backgroundColor: "var(--color-surface-alt)" }}
                        >
                          {doc.categoria}
                        </span>
                      )}
                      {pdfUrl ? (
                        <span
                          className="inline-flex items-center gap-1 text-xs font-medium"
                          style={{ color: "var(--color-secondary)" }}
                        >
                          <Download size={13} /> Descargar
                        </span>
                      ) : (
                        <span className="text-xs opacity-40" style={{ color: "var(--color-text-muted)" }}>
                          No disponible
                        </span>
                      )}
                    </div>
                  </div>
                </a>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10">
              <p
                className="text-lg"
                style={{ color: "var(--color-text-secondary)" }}
              >
                No se encontraron documentos
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
