// src/components/PdfThumbnail.tsx
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

// Cache en memoria para no re-renderizar el mismo PDF varias veces
// mientras dure la sesión (por ejemplo al filtrar/buscar en la lista).
const thumbnailCache = new Map<string, string>();

// pdfjs-dist es una librería pesada (~1MB con su worker), así que se
// carga de forma diferida (code-split) y solo una vez, para no afectar
// el tiempo de carga de páginas que no usan miniaturas de PDF.
let pdfjsLoader: Promise<typeof import("pdfjs-dist")> | null = null;
function loadPdfjs() {
  if (!pdfjsLoader) {
    pdfjsLoader = Promise.all([
      import("pdfjs-dist"),
      import("pdfjs-dist/build/pdf.worker.min.mjs?url"),
    ]).then(([pdfjsLib, worker]) => {
      pdfjsLib.GlobalWorkerOptions.workerSrc = worker.default;
      return pdfjsLib;
    });
  }
  return pdfjsLoader;
}

interface PdfThumbnailProps {
  pdfUrl: string;
  alt: string;
  className?: string;
}

/**
 * Muestra la primera página de un PDF como imagen (miniatura).
 * Se usa como respaldo automático cuando el documento no tiene
 * una imagen de portada cargada manualmente en Sanity.
 */
export function PdfThumbnail({ pdfUrl, alt, className }: PdfThumbnailProps) {
  const [imageSrc, setImageSrc] = useState<string | null>(
    thumbnailCache.get(pdfUrl) ?? null
  );
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (imageSrc || failed || !pdfUrl) return;

    let cancelled = false;

    async function renderFirstPage() {
      try {
        const pdfjsLib = await loadPdfjs();
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        const page = await pdf.getPage(1);

        // Escala pensada para una miniatura de tarjeta (no el PDF completo)
        const viewport = page.getViewport({ scale: 0.5 });
        const canvas = document.createElement("canvas");
        const context = canvas.getContext("2d");
        if (!context) throw new Error("No se pudo crear el contexto 2D");

        canvas.width = viewport.width;
        canvas.height = viewport.height;

        await page.render({ canvasContext: context, viewport }).promise;

        if (cancelled) return;

        const dataUrl = canvas.toDataURL("image/jpeg", 0.85);
        thumbnailCache.set(pdfUrl, dataUrl);
        setImageSrc(dataUrl);
      } catch (err) {
        console.error("No se pudo generar la miniatura del PDF:", err);
        if (!cancelled) setFailed(true);
      }
    }

    renderFirstPage();
    return () => {
      cancelled = true;
    };
  }, [pdfUrl, imageSrc, failed]);

  if (failed) {
    return (
      <div
        className={`${className} flex items-center justify-center`}
        style={{ backgroundColor: "var(--color-primary)" }}
      >
        <FileText size={26} className="text-white" />
      </div>
    );
  }

  if (!imageSrc) {
    return (
      <div className={`${className} bg-gray-200 animate-pulse`} />
    );
  }

  return <img src={imageSrc} alt={alt} className={className} />;
}
