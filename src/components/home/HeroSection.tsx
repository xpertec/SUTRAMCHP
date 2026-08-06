import { useEffect, useRef, useState, useCallback } from "react";
import { ChevronDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    type: "video" as const,
    src: "/images/video2.mp4",
    alt: "Video institucional",
  },
  {
    type: "video" as const,
    src: "/images/video_1080p.mp4",
    alt: "Video institucional SUTRAMCH",
  },
  {
    type: "image" as const,
    src: "/images/slide1.jpeg",
    alt: "Mina a cielo abierto",
  },
];

export default function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slideIndexRef = useRef<number>(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const goTo = useCallback((index: number) => {
    setCurrentSlide(index);
    slideIndexRef.current = index;
  }, []);

  const next = useCallback(() => {
    goTo((slideIndexRef.current + 1) % slides.length);
  }, [goTo]);

  const prev = useCallback(() => {
    goTo((slideIndexRef.current - 1 + slides.length) % slides.length);
  }, [goTo]);

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
            className="absolute inset-0 transition-opacity duration-700"
            style={{ opacity: i === currentSlide ? 1 : 0, zIndex: i === currentSlide ? 1 : 0 }}
          >
            {slide.type === "image" ? (
              <>
                <div className="absolute inset-0 bg-black/60 z-10" />
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-full object-cover"
                />
              </>
            ) : (
              <div className="absolute inset-0 w-full h-full overflow-hidden bg-black">
                {/* Fondo desenfocado para rellenar los lados en pantallas muy anchas */}
                <img
                  src="/images/slide1.png"
                  alt=""
                  role="presentation"
                  className="absolute inset-0 w-full h-full object-cover opacity-30 select-none pointer-events-none blur-sm"
                />
                {/* Video principal */}
                <video
                  src={slide.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                  className="absolute inset-0 w-full h-full object-cover z-10"
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
            className="hero-headline text-xs sm:text-base md:text-lg font-semibold tracking-wider uppercase mb-3 text-white"
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
