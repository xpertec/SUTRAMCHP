import { useEffect, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ChevronDown,
  FileText,
  Shield,
  BookOpen,
  Scale,
  Send,
  MapPin,
  Phone,
  Mail,
  Clock,
  Facebook,
  Twitter,
  MessageCircle,
  ChevronDown as ChevronDownIcon,
} from "lucide-react";
import { obtenerNoticias, getImagenUrl } from "@/services/noticiasService";
import type { Noticia } from "@/types/noticia";
import {
  obtenerNormativas,
  getPdfUrl as getNormativaPdfUrl,
  getImagenUrl as getNormativaImagenUrl,
} from "@/services/normativasService";
import type { Normativa } from "@/types/normativa";
import { PdfThumbnail } from "@/components/PdfThumbnail";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useSeo } from "@/hooks/useSeo";

gsap.registerPlugin(ScrollTrigger);

// ── Schema.org para la página de Inicio (SEO+GEO+AEO) ──
const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SUTRAMCHP",
    alternateName: [
      "Sindicato Unificado de Trabajadores Minera Chinalco Perú",
      "SUTRAMCHPERU",
      "Sindicato Minero Chinalco",
    ],
    url: "https://sutramchperu.com",
    logo: "https://sutramchperu.com/images/logo.png",
    foundingDate: "2014-12-17",
    description:
      "SUTRAMCHP es el sindicato minero de Chinalco Perú, fundado el 17 de diciembre de 2014. Representa a más de 2,500 trabajadores en la mina Toromocho, Morococha, Junín.",
    keywords:
      "sindicato chinalco, sindicato minero chinalco, SUTRAMCH, SUTRAMCHPERU, chinalco, chinalco peru",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Minería s/n",
      addressLocality: "Morococha",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-914-130-326",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.facebook.com/SUTRAMCHP",
      "https://github.com/xpertec/SUTRAMCHP",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SUTRAMCHP",
    url: "https://sutramchperu.com",
    description:
      "Sitio web oficial del Sindicato Unificado de Trabajadores Minera Chinalco Perú (SUTRAMCHPERU)",
    keywords:
      "sindicato chinalco, sindicato minero chinalco, SUTRAMCH, SUTRAMCHPERU, chinalco, chinalco peru",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://sutramchperu.com/blog?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "¿Qué es SUTRAMCHP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SUTRAMCHP es el Sindicato Unificado de Trabajadores de Minera Chinalco Perú, fundado el 17 de diciembre de 2014. Representa y defiende los derechos laborales de más de 2,500 trabajadores mineros que laboran en la mina Toromocho, ubicada en Morococha, provincia de Yauli, Junín, Perú.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo afiliarme a SUTRAMCHP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para afiliarse a SUTRAMCHP debes ser trabajador de Minera Chinalco Perú. Puedes comunicarte con la secretaría del sindicato al teléfono +51 914 130 326 o escribir al correo secretaria_sindicato@sutramchperu.com con tu solicitud de afiliación.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué beneficios obtienen los afiliados a SUTRAMCHP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los afiliados a SUTRAMCHP acceden a negociación colectiva, defensa laboral, seguro médico familiar, bono educativo, programa de vivienda, atención en el Centro de Salud SUTRAMCHP con horario 24/7, y acceso a capacitaciones y actividades culturales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde está ubicada la oficina de SUTRAMCHP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La oficina principal de SUTRAMCHP está ubicada en Av. Minería s/n, Morococha, Yauli, Junín - Perú. El horario de atención es de lunes a viernes de 8:00 am a 5:00 pm y sábados de 8:00 am a 12:00 pm.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué mina trabajan los afiliados de SUTRAMCHP?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los afiliados de SUTRAMCHP trabajan principalmente en la mina Toromocho, operada por Minera Chinalco Perú, una subsidiaria de Aluminum Corporation of China (Chinalco). La mina Toromocho es uno de los yacimientos de cobre más grandes del mundo y está ubicada en Morococha, Junín.",
        },
      },
      {
        "@type": "Question",
        name: "¿SUTRAMCHP y SUTRAMCHPERU son el mismo sindicato?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. SUTRAMCHP, también identificado como SUTRAMCHPERU, es el sindicato minero de Chinalco Perú (Sindicato Unificado de Trabajadores de Minera Chinalco Perú). Es la única organización sindical que representa a los trabajadores de Minera Chinalco Perú en la mina Toromocho, Morococha, Junín.",
        },
      },
    ],
  },
];

// ─── Hero Section ───
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slideIndexRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      type: "video" as const,
      src: "/images/video_1080p.mp4",      // ← editar nombre luego
      alt: "Video institucional SUTRAMCH",

    },
    {
      type: "video" as const,
      src: "/images/video2.mp4",   // ← editar nombre luego
      alt: "Video institucional",
    },
    {
      type: "image" as const,
      src: "/images/slide1.jpeg",
      alt: "Mina a cielo abierto",
    },
  ];

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index);
    slideIndexRef.current = index;
  }, []);

  const next = useCallback(() => {
    goTo((slideIndexRef.current + 1) % slides.length);
  }, [goTo, slides.length]);

  const prev = useCallback(() => {
    goTo((slideIndexRef.current - 1 + slides.length) % slides.length);
  }, [goTo, slides.length]);

  // Auto-play
  useEffect(() => {
    intervalRef.current = setInterval(next, 6000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [next]);

  return (
    <section
      ref={heroRef}
      className="relative min-h-[100dvh] flex items-center overflow-hidden"
    >
      {/* ── Slides ── */}
      <div className="absolute inset-0">
        {slides.map((slide, i) => (
          <div
            key={i}
            className="absolute inset-0 transition-opacity duration-700 flex items-center justify-center bg-black"
            style={{ opacity: i === currentSlide ? 1 : 0, zIndex: i === currentSlide ? 1 : 0 }}
          >
            {slide.type === "image" ? (
              <>
                {/* Capa de opacidad añadida para el tercer slide (índice 2) */}
                {i === 2 && (
                  <div className="absolute inset-0 bg-black/60 z-10" />
                )}
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-black">
                {/* Background image behind the video, showing its left and right sides in the empty spaces */}
                <img
                  src="/images/slide1.png"
                  alt="Fondo Toromocho"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 select-none pointer-events-none"
                />
                {/* Sharp foreground main video */}
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="relative z-10"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                    imageRendering: "-webkit-optimize-contrast" as any,
                  }}
                />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Prev / Next arrows ── */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all duration-200"
        aria-label="Slide anterior"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white bg-black/40 hover:bg-black/70 backdrop-blur-sm transition-all duration-200"
        aria-label="Siguiente slide"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
      </button>

      {/* ── Dot indicators ── */}
      <div className="absolute bottom-14 sm:bottom-16 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className="transition-all duration-300"
            style={{
              width: i === currentSlide ? "28px" : "8px",
              height: "8px",
              borderRadius: "9999px",
              backgroundColor: i === currentSlide ? "white" : "rgba(255,255,255,0.45)",
            }}
          />
        ))}
      </div>

      {/* ── Content ── */}
      <div
        ref={contentRef}
        className="relative z-10 container-padding mx-auto w-full pt-16 sm:pt-20 pb-12"
      >
        <div className="max-w-3xl">
          <p
            className="hero-headline text-xs sm:text-base md:text-lg font-semibold tracking-wider uppercase mb-3 text-[var(--color-accent)]"
            style={{ textShadow: "0 2px 8px rgba(0, 0, 0, 0.9)" }}
          >
            Te damos la bienvenida a un espacio de unión, compromiso y bienestar para todos los trabajadores
          </p>
          <h1
            className="hero-headline font-heading text-white text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ textShadow: "0 4px 16px rgba(0, 0, 0, 0.9)" }}
          >
            Sindicato Unificado de Trabajadores<br className="hidden sm:block" />
            {" "}Minera Chinalco Perú
          </h1>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2 z-10 animate-bounce-slow pointer-events-none">
        <ChevronDown size={28} className="text-white/70" />
      </div>

      {/* ── Botón flotante de WhatsApp ── */}
      <a
        href="https://wa.me/51914130326"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Escríbenos por WhatsApp"
        className="fixed bottom-5 right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-white shadow-xl hover:scale-110 transition-transform duration-300 animate-bounce-slow"
        style={{ backgroundColor: "#25D366" }}
      >
        <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
        </svg>
      </a>
    </section>
  );
}

// ─── News Section ───
function NewsSection() {
  const [noticias, setNoticias] = useState<Noticia[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    obtenerNoticias()
      .then((data) => setNoticias(data.slice(0, 3)))
      .finally(() => setIsLoading(false));
  }, []);

  const sectionRef = useRef<HTMLDivElement>(null);

  const categoryColors: Record<string, string> = {
    "Negociación Colectiva": "bg-blue-50 text-blue-700",
    "Seguridad Laboral": "bg-green-50 text-green-700",
    "Derechos Sindicales": "bg-purple-50 text-purple-700",
    Noticias: "bg-red-50 text-red-700",
    Eventos: "bg-amber-50 text-amber-700",
    Capacitación: "bg-teal-50 text-teal-700",
  };

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

// ─── About Section ───
function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text */}
          <div className="about-left">
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              SOBRE NOSOTROS
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-6 leading-tight"
              style={{ color: "var(--color-text-primary)" }}
            >
              Representando a los
              <br />
              Trabajadores Mineros
            </h2>
            <p
              className="text-base md:text-lg leading-relaxed mb-4"
              style={{ color: "var(--color-text-secondary)" }}
            >
              El Sindicato de Trabajadores Mineros de Chinalco Perú (SUTRAMCH),
              también conocido como SUTRAMCHPERU, es el sindicato minero de
              Chinalco que nació de la necesidad de proteger y promover los
              derechos laborales de los trabajadores de la industria minera en
              Perú.
            </p>
            <p
              className="text-sm md:text-base leading-relaxed mb-6"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Como sindicato de Chinalco Perú, trabajamos incansablemente para
              garantizar condiciones justas de trabajo, salarios dignos y un
              ambiente seguro para todos nuestros agremiados.
            </p>
            <Link
              to="/nosotros"
              className="inline-flex items-center gap-1.5 text-sm font-semibold link-underline"
              style={{ color: "var(--color-primary)" }}
            >
              Conoce nuestra historia <ArrowRight size={16} />
            </Link>
          </div>

          {/* Right: Image */}
          <div className="about-right">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <img
                src="/images/toromocho.png"
                alt="Trabajadores mineros de SUTRAMCH"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



// ─── Laws Section ───
const NORMATIVA_CATEGORY_ICONS: Record<string, React.ReactNode> = {
  leyes: <Scale size={24} />,
  reglamentos: <FileText size={24} />,
  convenios: <Shield size={24} />,
  resoluciones: <BookOpen size={24} />,
};

function LawsSection() {
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
        {/* Section Header: barra de acento + título + "Ver archivo" */}
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

// ─── Contact Section ───
function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div className="contact-left lg:col-span-3">
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              CONTÁCTANOS
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "var(--color-text-primary)" }}
            >
              Estamos para
              <br />
              ayudarte
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  placeholder="Nombre completo"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
                <input
                  type="email"
                  placeholder="Correo electrónico"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  placeholder="Teléfono"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
                <select
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)", color: "var(--color-text-secondary)" }}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta general</option>
                  <option value="afiliacion">Afiliación</option>
                  <option value="reclamo">Reclamo laboral</option>
                  <option value="capacitacion">Capacitación</option>
                </select>
              </div>
              <textarea
                placeholder="Tu mensaje"
                rows={5}
                className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                style={{ borderColor: "var(--color-surface-alt)" }}
              />
              <button
                type="submit"
                className="w-full py-4 rounded-full text-white text-sm font-semibold hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Send size={16} />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Right: Info */}
          <div className="contact-right lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Dirección
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Av. Minería s/n, Morococha
                    <br />
                    Yauli, Junín, Perú
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Teléfono
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    +51 914 130 326
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Email
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    secretaria_sindicato@sutramchperu.com
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Horario de atención
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Lunes a Viernes: 8:00 am - 5:00 pm
                    <br />
                    Sábados: 8:00 am - 12:00 pm
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div className="pt-4">
                <h4
                  className="font-semibold text-sm mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Síguenos
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── FAQ Section (AEO: respuestas directas para motores de IA) ──
const FAQ_DATA = [
  {
    q: "¿Qué es SUTRAMCH?",
    a: "SUTRAMCH (SUTRAMCHPERU) es el Sindicato Unificado de Trabajadores de Minera Chinalco Perú, fundado el 17 de diciembre de 2014. Representa y defiende los derechos laborales de más de 2,500 trabajadores mineros en la mina Toromocho, Morococha, Junín.",
  },
  {
    q: "¿Cómo puedo afiliarme a SUTRAMCH?",
    a: "Para afiliarse debes ser trabajador de Minera Chinalco Perú. Contáctanos al +51 914 130 326 o escribe a secretaria_sindicato@sutramchperu.com con tu solicitud de afiliación.",
  },
  {
    q: "¿Qué beneficios tienen los afiliados?",
    a: "Los afiliados acceden a negociación colectiva, defensa laboral, seguro médico familiar, bono educativo, programa de vivienda, Centro de Salud propio 24/7, capacitaciones y actividades culturales.",
  },
  {
    q: "¿Dónde está ubicada la oficina de SUTRAMCH?",
    a: "Av. Minería s/n, Morococha, Yauli, Junín - Perú. Atención: lunes a viernes 8:00 am–5:00 pm | sábados 8:00 am–12:00 pm.",
  },
  {
    q: "¿En qué mina trabajan los afiliados de SUTRAMCH?",
    a: "En la mina Toromocho, operada por Minera Chinalco Perú (subsidiaria de Aluminum Corporation of China). Es uno de los yacimientos de cobre más grandes del mundo, en Morococha, Junín.",
  },
];

function FaqSection() {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-surface-alt)" }}
      aria-labelledby="faq-heading"
      itemScope
      itemType="https://schema.org/FAQPage"
    >
      <div className="container-padding mx-auto">
        <div className="text-center mb-10">
          <p
            className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
            style={{ color: "var(--color-secondary)" }}
          >
            PREGUNTAS FRECUENTES
          </p>
          <h2
            id="faq-heading"
            className="font-heading text-3xl md:text-4xl font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            Todo lo que necesitas saber
          </h2>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQ_DATA.map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-xl card-shadow overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-5 sm:px-6 py-4 text-left font-heading font-semibold text-sm sm:text-base transition-colors hover:text-[var(--color-primary)]"
                style={{ color: open === i ? "var(--color-primary)" : "var(--color-text-primary)" }}
                onClick={() => setOpen(open === i ? null : i)}
                aria-expanded={open === i}
                itemProp="name"
              >
                {item.q}
                <ChevronDown
                  size={18}
                  className="shrink-0 transition-transform duration-300"
                  style={{ transform: open === i ? "rotate(180deg)" : "rotate(0deg)" }}
                />
              </button>
              <div
                className="overflow-hidden transition-all duration-300"
                style={{ maxHeight: open === i ? "400px" : "0px" }}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
              >
                <p
                  className="px-5 sm:px-6 pb-4 text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                  itemProp="text"
                >
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Aliados y enlaces de interés (carrusel infinito de logos) ──
const ALLIES = [
  { name: "IESI - Instituto Sociolaboral y Ambiental", img: "/images/aliados/iesi.png" },
  { name: "EsSalud", img: "/images/aliados/essalud.png" },
  { name: "SUNAFIL", img: "/images/aliados/sunafil.png" },
  { name: "SERVIR - Autoridad Nacional del Servicio Civil", img: "/images/aliados/servir.png" },
  { name: "Ministerio de Trabajo y Promoción del Empleo", img: "/images/aliados/mtpe.png" },
  { name: "Federación Sindical Mundial", img: "/images/aliados/fsm.png" },
  { name: "OIT - Organización Internacional del Trabajo", img: "/images/aliados/oit.png" },
];

const SUNAFIL_LINKS = [
  {
    name: "SUNAFIL - Consulta tu Trámite",
    img: "/images/aliados/sunafil-consulta-tramite.jpg",
    href: "https://aplicativosweb7.sunafil.gob.pe/si.consultaTramite",
  },
  {
    name: "SUNAFIL - Denuncia Virtual",
    img: "/images/aliados/sunafil-denuncia-virtual.jpg",
    href: "https://aplicativosweb2.sunafil.gob.pe/si.denunciasVirtuales/",
  },
];

function AlliesSection() {
  // Se duplica el arreglo para lograr un loop infinito sin cortes
  const track = [...ALLIES, ...ALLIES];

  return (
    <section
      className="py-14 md:py-16 overflow-hidden"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="container-padding mx-auto mb-8 text-center">
        <p
          className="text-xs font-medium tracking-[0.08em] uppercase mb-2"
          style={{ color: "var(--color-secondary)" }}
        >
          ALIADOS Y ENLACES DE INTERÉS
        </p>
        <h2
          className="font-heading text-2xl sm:text-3xl font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          Trabajamos junto a
        </h2>
      </div>

      {/* Carrusel infinito de logos institucionales */}
      <div className="allies-marquee relative w-full">
        <div className="allies-marquee-track">
          {track.map((ally, i) => (
            <div
              key={`${ally.name}-${i}`}
              className="allies-logo-card shrink-0 flex items-center justify-center rounded-xl bg-white border"
              style={{ borderColor: "var(--color-surface-alt)" }}
              title={ally.name}
            >
              <img
                src={ally.img}
                alt={ally.name}
                className="max-h-14 max-w-[120px] w-auto h-auto object-contain"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Accesos directos a trámites de SUNAFIL */}
      <div className="container-padding mx-auto mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {SUNAFIL_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              className="group block rounded-xl overflow-hidden border card-shadow hover:shadow-lg transition-all"
              style={{ borderColor: "var(--color-surface-alt)" }}
            >
              <img
                src={link.img}
                alt={link.name}
                className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-300"
                loading="lazy"
              />
            </a>
          ))}
        </div>
      </div>

      {/* Animación del carrusel + pausa en hover/accesibilidad */}
      <style>{`
        .allies-marquee-track {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          width: max-content;
          animation: allies-scroll 32s linear infinite;
          padding: 0 1rem;
        }
        .allies-marquee:hover .allies-marquee-track {
          animation-play-state: paused;
        }
        .allies-logo-card {
          width: 160px;
          height: 96px;
          padding: 1rem;
        }
        @keyframes allies-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .allies-marquee-track {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
export default function Home() {
  useSeo({
    title: "Inicio",
    description:
      "SUTRAMCHP (SUTRAMCHPERU) — sindicato minero de Chinalco Perú. Fundado el 17 de diciembre de 2014, defendemos los derechos laborales de más de 2,500 trabajadores en la mina Toromocho, Junín.",
    canonical: "https://sutramchperu.com/",
    keywords:
      "sindicato chinalco, sindicato minero chinalco, SUTRAMCH, SUTRAMCHPERU, chinalco, chinalco peru",
    schema: HOME_SCHEMA,
  });

  return (
    <main>
      <HeroSection />
      <NewsSection />
      <AboutSection />
      <LawsSection />
      <FaqSection />
      <AlliesSection />
      <ContactSection />
    </main>
  );
}