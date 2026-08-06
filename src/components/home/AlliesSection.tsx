const ALLIES = [
  { name: "IESI - Instituto Sociolaboral y Ambiental",      img: "/images/aliados/iesi.png",    href: "https://www.iesi.pe" },
  { name: "EsSalud",                                        img: "/images/aliados/essalud.png", href: "https://www.essalud.gob.pe" },
  { name: "SUNAFIL",                                        img: "/images/aliados/sunafil.png", href: "https://www.sunafil.gob.pe" },
  { name: "SERVIR - Autoridad Nacional del Servicio Civil", img: "/images/aliados/servir.png",  href: "https://www.servir.gob.pe" },
  { name: "Ministerio de Trabajo y Promoción del Empleo",  img: "/images/aliados/mtpe.png",    href: "https://www.gob.pe/mtpe" },
  { name: "Federación Sindical Mundial",                   img: "/images/aliados/fsm.png",     href: "https://www.fsm.int" },
  { name: "OIT - Organización Internacional del Trabajo",  img: "/images/aliados/oit.png",     href: "https://www.ilo.org/es" },
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

export default function AlliesSection() {
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
            <a
              key={`${ally.name}-${i}`}
              href={ally.href}
              target="_blank"
              rel="noopener noreferrer"
              className="allies-logo-card shrink-0 flex items-center justify-center"
              title={ally.name}
              aria-label={ally.name}
            >
              <img
                src={ally.img}
                alt={ally.name}
                className="max-h-[91px] max-w-[195px] w-auto h-auto object-contain transition-opacity duration-200 hover:opacity-75"
                loading="lazy"
              />
            </a>
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
          width: 260px;
          height: 156px;
          padding: 0.5rem;
          cursor: pointer;
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
