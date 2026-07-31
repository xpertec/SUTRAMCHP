import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, Facebook, Twitter, MessageCircle } from "lucide-react";
import { obtenerNoticiaPorSlug, getImagenUrl, contenidoToHtml } from "@/services/noticiasService";
import type { Noticia } from "@/types/noticia";

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Noticia | null | undefined>(undefined);

  useEffect(() => {
    if (!slug) return;
    setPost(undefined);
    obtenerNoticiaPorSlug(slug).then(setPost);
  }, [slug]);

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

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Featured Image Header */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img
          src={getImagenUrl(post.imagen, 1600, 900) || "/images/news-1.jpg"}
          alt={post.titulo}
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(22,45,74,0.3) 0%, rgba(22,45,74,0.8) 100%)",
          }}
        />
        <div className="absolute bottom-0 left-0 right-0 container-padding mx-auto pb-8">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1.5 text-white/70 text-sm mb-4 hover:text-white transition-colors"
          >
            <ArrowLeft size={16} />
            Volver al blog
          </Link>
          <span
            className="inline-block px-3 py-1 rounded-full text-[10px] font-medium tracking-wider uppercase mb-3"
            style={{
              backgroundColor: "var(--color-secondary)",
              color: "white",
            }}
          >
            Noticias
          </span>
          <h1 className="font-heading text-2xl md:text-4xl lg:text-5xl font-bold text-white leading-tight max-w-4xl">
            {post.titulo}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="container-padding mx-auto py-10 md:py-16">
        <div className="max-w-3xl mx-auto">
          {/* Meta */}
          <div
            className="flex items-center gap-6 pb-6 mb-8 border-b"
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
              Compartir
            </h4>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{ backgroundColor: "#1877F2" }}
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="w-10 h-10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                style={{ backgroundColor: "#1DA1F2" }}
              >
                <Twitter size={18} />
              </a>
              <a
                href="#"
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
