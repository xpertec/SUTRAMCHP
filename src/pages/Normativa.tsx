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
        <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 mb-10">
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
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "text-white"
                    : "bg-white hover:bg-gray-50"
                }`}
                style={
                  activeCategory === cat.id
                    ? { backgroundColor: "var(--color-primary)" }
                    : {
                        color: "var(--color-text-secondary)",
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
                className="flex items-start gap-5 p-5 md:p-6 rounded-xl bg-white card-shadow animate-pulse"
              >
                <div
                  className="w-12 h-12 rounded-lg shrink-0"
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
                  className="flex items-start gap-5 p-5 md:p-6 rounded-xl bg-white card-shadow hover:shadow-lg transition-all"
                >
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: "var(--color-primary)",
                      color: "white",
                    }}
                  >
                    {(doc.categoria && CATEGORY_ICONS[doc.categoria]) ?? (
                      <FileText size={24} />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-heading text-base md:text-lg font-semibold mb-1.5"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {doc.titulo}
                    </h3>
                    <p
                      className="text-sm leading-relaxed mb-3"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {doc.descripcion}
                    </p>
                    <div
                      className="flex items-center gap-4 text-xs"
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
                  {pdfUrl ? (
                    <a
                      href={pdfUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                      title="Descargar"
                    >
                      <Download size={18} />
                    </a>
                  ) : (
                    <button
                      disabled
                      className="shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white opacity-40 cursor-not-allowed"
                      style={{ backgroundColor: "var(--color-secondary)" }}
                      title="Sin archivo disponible"
                    >
                      <Download size={18} />
                    </button>
                  )}
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
