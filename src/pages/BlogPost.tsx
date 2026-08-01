import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Facebook, Twitter, MessageCircle, Home, ChevronRight, Clock } from "lucide-react";
import { obtenerNoticiaPorSlug, getImagenUrl, contenidoToHtml } from "@/services/noticiasService";
import type { Noticia } from "@/types/noticia";
import { useSeo } from "@/hooks/useSeo";

/** Extrae texto plano del contenido Sanity para usar como descripción */
function extraerExtracto(contenido: any[], maxLen = 160): string {
  if (!contenido || !Array.isArray(contenido)) return "";
  const texto = contenido
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c: any) => c.text || "").join("") || "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  return texto.length > maxLen ? texto.slice(0, maxLen - 3) + "…" : texto;
}

/** Calcula minutos de lectura estimados */
function minutosLectura(contenido: any[]): number {
  if (!contenido || !Array.isArray(contenido)) return 1;
  const palabras = contenido
    .filter((b) => b._type === "block")
    .map((b) => b.children?.map((c: any) => c.text || "").join(" ") || "")
    .join(" ")
    .split(/\s+/).length;
  return Math.max(1, Math.round(palabras / 200));
}

const SITE_URL = "https://sutramchperu.com";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Noticia | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    setPost(undefined);
    obtenerNoticiaPorSlug(slug).then(setPost);
  }, [slug]);

  // SEO dinámico por artículo
  const postUrl = `${SITE_URL}/blog/${slug}`;
  const ogImage = post ? getImagenUrl(post.imagen, 1200, 630) ?? `${SITE_URL}/images/og-image.jpg` : `${SITE_URL}/images/og-image.jpg`;
  const extracto = post ? extraerExtracto(post.contenido) : "";
  const newsSchema = post
    ? {
        "@context": "https://schema.org",
        "@type": "NewsArticle",
        headline: post.titulo,
        description: extracto,
        url: postUrl,
        image: ogImage,
        datePublished: post.fecha ?? post._createdAt,
        dateModified: post._updatedAt ?? post.fecha ?? post._createdAt,
        author: {
          "@type": "Organization",
          name: "SUTRAMCHP",
          url: SITE_URL,
        },
        publisher: {
          "@type": "Organization",
          name: "SUTRAMCHP",
          url: SITE_URL,
          logo: {
            "@type": "ImageObject",
            url: `${SITE_URL}/images/logo.png`,
          },
        },
        isPartOf: {
          "@type": "Blog",
          name: "Blog Sindical SUTRAMCHP",
          url: `${SITE_URL}/blog`,
        },
      }
    : undefined;

  useSeo({
    title: post?.titulo,
    description: extracto || "Noticias y novedades del Sindicato SUTRAMCHP, los trabajadores mineros de Chinalco Perú.",
    canonical: postUrl,
    ogImage,
    ogType: "article",
    schema: newsSchema,
  });

  if (post === undefined) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[var(--color-primary)] border-t-transparent" />
      </div>
    );
  }

  if (!post) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ backgroundColor: "var(--color-background)" }}
      >
        <div className="text-center">
          <h2
            className="font-heading text-2xl font-bold mb-2"
            style={{ color: "var(--color-text-primary)" }}
          >
            Artículo no encontrado
          </h2>
          <Link
            to="/blog"
            className="text-sm font-medium"
            style={{ color: "var(--color-primary)" }}
          >
            Volver al blog
          </Link>
        </div>
      </div>
    );
  }

  const mins = minutosLectura(post.contenido);
  const shareText = encodeURIComponent(post.titulo);
  const shareUrl = encodeURIComponent(postUrl);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Featured Image Header */}
      <div className="relative min-h-[45vh] md:min-h-[50vh] flex flex-col justify-end overflow-hidden py-8 md:py-12">
        <img
          src={getImagenUrl(post.imagen, 1600, 900) || "/images/news-1.jpg"}
          alt={post.titulo}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,45,74,0.4) 0%, rgba(22,45,74,0.92) 100%)",
          }}
        />
        <div className="relative z-10 container-padding mx-auto w-full">
          {/* Breadcrumb */}
          <nav aria-label="Ruta de navegación" className="flex items-center gap-1.5 text-white/60 text-xs mb-3">
            <Link to="/" className="hover:text-white transition-colors flex items-center gap-1">
              <Home size={12} /> Inicio
            </Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-white transition-colors">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-white/90 truncate max-w-[200px]">{post.titulo}</span>
          </nav>
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-[10px] font-semibold tracking-wider uppercase mb-2.5 shadow-sm"
              style={{
                backgroundColor: "var(--color-secondary)",
                color: "white",
              }}
            >
              Noticias
            </span>
            <h1 className="font-heading text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
              {post.titulo}
            </h1>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container-padding mx-auto py-8 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div
            className="flex flex-wrap items-center gap-4 sm:gap-6 pb-6 mb-8 border-b"
            style={{
              borderColor: "var(--color-surface-alt)",
              color: "var(--color-text-muted)",
            }}
          >
            <span className="flex items-center gap-1.5 text-sm">
              <Calendar size={14} />
              {post.fecha
                ? new Date(post.fecha).toLocaleDateString("es-PE", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })
                : ""}
            </span>
            <span className="flex items-center gap-1.5 text-sm">
              <Clock size={14} />
              {mins} min de lectura
            </span>
          </div>

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none"
            style={{ color: "var(--color-text-secondary)" }}
            dangerouslySetInnerHTML={{
              __html: contenidoToHtml(post.contenido),
            }}
          />

          {/* Share */}
          <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--color-surface-alt)" }}>
            <h4
              className="text-sm font-semibold mb-3"
              style={{ color: "var(--color-text-primary)" }}
            >
              Compartir este artículo
            </h4>
            <div className="flex items-center gap-3">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Facebook"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{ backgroundColor: "#1877F2" }}
              >
                <Facebook size={18} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${shareText}&url=${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir en Twitter/X"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{ backgroundColor: "#1DA1F2" }}
              >
                <Twitter size={18} />
              </a>
              <a
                href={`https://wa.me/?text=${shareText}%20${shareUrl}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Compartir por WhatsApp"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{ backgroundColor: "#25D366" }}
              >
                <MessageCircle size={18} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

