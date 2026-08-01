import { useEffect, useMemo, useState } from "react";
import {
  Scale,
  FileText,
  Shield,
  Users,
  Download,
  Search,
} from "lucide-react";
import { obtenerNormativas, getPdfUrl } from "@/services/normativasService";
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
      <div className="container-padding mx-auto pt-10 pb-12 md:pt-12 md:pb-14">
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

        {/* Documents List */}
        <div className="space-y-4">
          {isLoading ? (
            [...Array(4)].map((_, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 sm:p-6 rounded-xl bg-white card-shadow animate-pulse"
              >
                <div
                  className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg shrink-0"
                  style={{ backgroundColor: "var(--color-surface-alt)" }}
                />
                <div className="flex-1 min-w-0 space-y-2">
                  <div
                    className="h-4 w-2/3 rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                  <div
                    className="h-3 w-full rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                  <div
                    className="h-3 w-1/3 rounded"
                    style={{ backgroundColor: "var(--color-surface-alt)" }}
                  />
                </div>
              </div>
            ))
          ) : documents.length ? (
            documents.map((doc) => {
              const pdfUrl = getPdfUrl(doc.archivoPdf);
              return (
                <div
                  key={doc._id}
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-4 p-4 sm:p-6 rounded-xl bg-white card-shadow hover:shadow-md transition-all"
                >
                  <div className="flex items-center gap-3.5 w-full sm:w-auto">
                    <div
                      className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: "var(--color-primary)",
                        color: "white",
                      }}
                    >
                      {(doc.categoria && CATEGORY_ICONS[doc.categoria]) ?? (
                        <FileText size={22} />
                      )}
                    </div>
                    <div className="sm:hidden flex-1 min-w-0">
                      <h3
                        className="font-heading text-base font-semibold leading-snug"
                        style={{ color: "var(--color-text-primary)" }}
                      >
                        {doc.titulo}
                      </h3>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0 w-full">
                    <h3
                      className="hidden sm:block font-heading text-base sm:text-lg font-semibold mb-1.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {doc.titulo}
                    </h3>
                    <p
                      className="text-xs sm:text-sm leading-relaxed mb-2.5"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {doc.descripcion}
                    </p>
                    <div
                      className="flex items-center gap-3 text-xs"
                      style={{ color: "var(--color-text-muted)" }}
                    >
                      {doc.fecha && (
                        <span>
                          {new Date(doc.fecha).toLocaleDateString("es-PE", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </span>
                      )}
                      {doc.categoria && (
                        <span
                          className="px-2.5 py-0.5 rounded-full text-[10px] font-medium uppercase"
                          style={{
                            backgroundColor: "var(--color-surface-alt)",
                          }}
                        >
                          {doc.categoria}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="self-end sm:self-center shrink-0 pt-2 sm:pt-0">
                    {pdfUrl ? (
                      <a
                        href={pdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 sm:p-2.5 rounded-full sm:rounded-full bg-[var(--color-secondary)] text-white text-xs sm:text-sm font-medium transition-all hover:scale-105"
                        title="Descargar PDF"
                      >
                        <Download size={16} />
                        <span className="sm:hidden">Descargar PDF</span>
                      </a>
                    ) : (
                      <button
                        disabled
                        className="inline-flex items-center gap-2 px-4 py-2 sm:p-2.5 rounded-full bg-[var(--color-secondary)] text-white opacity-40 cursor-not-allowed text-xs sm:text-sm"
                        title="Sin archivo disponible"
                      >
                        <Download size={16} />
                        <span className="sm:hidden">No disponible</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10">
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
