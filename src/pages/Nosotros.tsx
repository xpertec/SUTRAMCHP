import { Target, Eye, Heart, Shield, Users, Award, BadgeCheck } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";

const NOSOTROS_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  name: "Historia y valores de SUTRAMCH — Sindicato Chinalco Perú",
  description:
    "SUTRAMCH (Sindicato Chinalco Perú) fue fundado el 17 de diciembre de 2014 por trabajadores de Chinalco Perú para defender los derechos laborales. Con más de 11 años, representa a 2,500 agremiados en la mina Toromocho, Morococha, Junín.",
  url: "https://sutramchperu.com/nosotros",
  isPartOf: {
    "@type": "WebSite",
    name: "SUTRAMCH — Sindicato Chinalco Perú",
    url: "https://sutramchperu.com",
  },
  about: {
    "@type": "Organization",
    name: "SUTRAMCH",
    alternateName: ["SUTRAMCHPERU", "Sindicato Chinalco Perú"],
    foundingDate: "2014-12-17",
    numberOfEmployees: {
      "@type": "QuantitativeValue",
      value: 2500,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Morococha",
      addressRegion: "Junín",
      addressCountry: "PE",
    },
  },
};

const values = [
  {
    icon: <Heart size={28} />,
    title: "Solidaridad",
    description:
      "La unión entre los trabajadores es nuestra mayor fortaleza. Juntos enfrentamos los desafíos y celebramos las victorias.",
  },
  {
    icon: <Shield size={28} />,
    title: "Integridad",
    description:
      "Actuamos con honestidad, transparencia y ética en todas nuestras gestiones y negociaciones.",
  },
  {
    icon: <Users size={28} />,
    title: "Compromiso",
    description:
      "Dedicación total a la defensa de los derechos e intereses de nuestros agremiados y sus familias.",
  },
  {
    icon: <Award size={28} />,
    title: "Excelencia",
    description:
      "Buscamos constantemente los mejores resultados en beneficio de los trabajadores mineros de Chinalco Perú.",
  },
];

export default function Nosotros() {
  useSeo({
    title: "Nuestra Historia — Sindicato Chinalco",
    description:
      "Historia del Sindicato Chinalco Perú (SUTRAMCH): 11 años defendiendo derechos laborales de trabajadores de Minera Chinalco. Misión, visión, valores y trayectoria desde el 17 de diciembre de 2014.",
    canonical: "https://sutramchperu.com/nosotros",
    keywords:
      "historia Sindicato Chinalco, SUTRAMCH historia, SUTRAMCHPERU fundación, sindicato minero Chinalco Perú, misión sindicato Chinalco, valores sindicato minero, Chinalco Perú 2014, trabajadores Toromocho Junín",
    schema: NOSOTROS_SCHEMA,
  });

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Hero */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)", minHeight: "32vh" }}
      >
        <div className="container-padding mx-auto text-center py-12 md:py-16">
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Nuestra Historia
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Más de 11 años de lucha y conquistas laborales
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12">
            <div
              className="p-6 sm:p-8 md:p-10 rounded-2xl card-shadow"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: "var(--color-primary)" }}
              >
                <Target size={22} className="text-white" />
              </div>
              <h2
                className="font-heading text-2xl font-bold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Misión
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Representar, defender y promover los derechos e intereses de los
                trabajadores mineros de Chinalco Perú, garantizando condiciones
                dignas de trabajo, salarios justos y un ambiente seguro, a través
                de una gestión sindical transparente, democrática y eficiente.
              </p>
            </div>

            <div
              className="p-8 md:p-10 rounded-2xl"
              style={{ backgroundColor: "var(--color-surface)" }}
            >
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center mb-5"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Eye size={22} className="text-white" />
              </div>
              <h2
                className="font-heading text-2xl font-bold mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Visión
              </h2>
              <p
                className="text-sm md:text-base leading-relaxed"
                style={{ color: "var(--color-text-secondary)" }}
              >
                Ser el sindicato minero de referencia en Perú, reconocido por su
                capacidad de negociación, defensa efectiva de los derechos
                laborales y contribución al desarrollo sostenible de la industria
                minera y el bienestar de sus trabajadores.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section
        className="section-padding"
        style={{ backgroundColor: "var(--color-surface-alt)" }}
      >
        <div className="container-padding mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              NUESTROS VALORES
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Principios que nos guían
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="p-6 rounded-xl text-center"
                style={{ backgroundColor: "var(--color-surface)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <span className="text-white">{value.icon}</span>
                </div>
                <h3
                  className="font-heading text-lg font-semibold mb-2"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  {value.title}
                </h3>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--color-text-secondary)" }}
                >
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fecha de creación */}
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="text-center mb-10">
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              NUESTRA HISTORIA
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Fecha de Creación
            </h2>
          </div>

          <div
            className="max-w-3xl mx-auto p-6 sm:p-8 md:p-10 rounded-2xl card-shadow text-center"
            style={{ backgroundColor: "var(--color-surface)" }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-5"
              style={{ backgroundColor: "var(--color-primary)" }}
            >
              <BadgeCheck size={22} className="text-white" />
            </div>
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: "var(--color-text-secondary)" }}
            >
              Fundado el 17 de diciembre de 2014. Registro Sindical N°
              001-2015 GRJ/GRDS/DRTP/DPSC. del 01 de setiembre de 2015.
              Afiliado a la F.M.R.T.M.M.C. - F.N.T.M.M.S.O. - C.G.T.P.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
