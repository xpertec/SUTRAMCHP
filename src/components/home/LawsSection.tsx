import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, FileText, Shield, BookOpen, Scale } from "lucide-react";
import {
  obtenerNormativas,
  getPdfUrl as getNormativaPdfUrl,
  getImagenUrl as getNormativaImagenUrl,
} from "@/services/normativasService";
import type { Normativa } from "@/types/normativa";
import { PdfThumbnail } from "@/components/PdfThumbnail";

const NORMATIVA_CATEGORY_ICONS: Record<string, React.ReactNode> = {
  leyes: <Scale size={24} />,
  reglamentos: <FileText size={24} />,
  convenios: <Shield size={24} />,
  resoluciones: <BookOpen size={24} />,
};

export default function LawsSection() {
  const [normativas, setNormativas] = useState<Normativa[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerNormativas()
      .then((data) => setNormativas(data.slice(0, 4)))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-padding mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div
            className="pl-4 border-l-4"
            style={{ borderColor: "var(--color-primary)" }}
          >
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
              Leyes, reglamentos y documentos que amparan a los trabajadores
              mineros
            </p>
          </div>
          <Link
            to="/normativa"
            className="inline-flex items-center gap-1.5 text-sm font-semibold shrink-0 hover:underline"
            style={{ color: "var(--color-primary)" }}
          >
            Ver archivo <ArrowRight size={14} />
          </Link>
        </div>

        {/* Documents Grid */}
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
          ) : normativas.length ? (
            normativas.map((doc) => {
              const pdfUrl = getNormativaPdfUrl(doc.archivoPdf);
              const imagenUrl = getNormativaImagenUrl(doc.imagen, 200, 200);
              return (
                <a
                  key={doc._id}
                  href={pdfUrl ?? undefined}
                  target={pdfUrl ? "_blank" : undefined}
                  rel={pdfUrl ? "noreferrer" : undefined}
                  className={`group flex items-start gap-4 p-4 sm:p-5 rounded-xl border bg-white transition-all hover:shadow-md ${
                    pdfUrl ? "cursor-pointer" : "cursor-default"
                  }`}
                  style={{ borderColor: "var(--color-surface-alt)" }}
                  onClick={(e) => {
                    if (!pdfUrl) e.preventDefault();
                  }}
                >
                  {/* Miniatura: imagen manual > primera página del PDF > ícono */}
                  <div
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-lg overflow-hidden shrink-0 flex items-center justify-center"
                    style={{ backgroundColor: "var(--color-primary)" }}
                  >
                    {imagenUrl ? (
                      <img
                        src={imagenUrl}
                        alt={doc.titulo}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : pdfUrl ? (
                      <PdfThumbnail
                        pdfUrl={pdfUrl}
                        alt={doc.titulo}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-white">
                        {(doc.categoria &&
                          NORMATIVA_CATEGORY_ICONS[doc.categoria]) ?? (
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
                  </div>
                </a>
              );
            })
          ) : (
            <div className="col-span-full text-center py-10">
              <p
                className="text-base"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Aún no hay documentos publicados. Vuelve pronto.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
