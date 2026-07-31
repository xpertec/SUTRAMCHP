import { useRef, useEffect } from "react";
import { Target, Eye, Heart, Shield, Users, Award } from "lucide-react";
import gsap from "gsap";

const timeline = [
  {
    year: "2003",
    title: "Fundación de SUTRAMCHP",
    description:
      "Un grupo de valientes trabajadores mineros funda el Sindicato de Trabajadores Mineros de Chinalco Perú con la misión de defender los derechos laborales en la industria minera.",
  },
  {
    year: "2008",
    title: "Primera Convención Colectiva",
    description:
      "Se logra la primera convención colectiva histórica, estableciendo beneficios sin precedentes para los trabajadores incluyendo seguro médico familiar y bono educativo.",
  },
  {
    year: "2012",
    title: "Construcción de la Casa del Minero",
    description:
      "Inauguración de la Casa del Minero, un espacio de encuentro, capacitación y recreación para todos los agremiados y sus familias.",
  },
  {
    year: "2015",
    title: "Programa de Vivienda",
    description:
      "Lanzamiento del programa de vivienda que ha beneficiado a más de 500 familias de trabajadores mineros con subsidios y créditos preferenciales.",
  },
  {
    year: "2019",
    title: "Centro de Salud Propio",
    description:
      "Apertura del Centro de Salud SUTRAMCHP con atención médica 24/7, especializada en salud ocupacional y medicina familiar.",
  },
  {
    year: "2024",
    title: "22 Años de Lucha y Conquistas",
    description:
      "Celebración de 22 años de historia sindical con más de 2,500 agremiados activos y un legado de conquistas laborales que mejoran la vida de los trabajadores mineros.",
  },
];

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
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".timeline-item", {
        opacity: 0,
        y: 40,
        duration: 0.6,
        stagger: 0.15,
        ease: "expo.out",
        scrollTrigger: { trigger: timelineRef.current, start: "top 75%" },
      });
    }, timelineRef);
    return () => ctx.revert();
  }, []);

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Hero */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)", minHeight: "50vh" }}
      >
        <div className="container-padding mx-auto text-center py-20">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
            Nuestra Historia
          </h1>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            Más de dos décadas de lucha y conquistas laborales
          </p>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div
              className="p-8 md:p-10 rounded-2xl"
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

      {/* Timeline */}
      <section ref={timelineRef} className="section-padding">
        <div className="container-padding mx-auto">
          <div className="text-center mb-12">
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              LÍNEA DE TIEMPO
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold"
              style={{ color: "var(--color-text-primary)" }}
            >
              Nuestra Trayectoria
            </h2>
          </div>

          <div className="max-w-3xl mx-auto relative">
            {/* Line */}
            <div
              className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2"
              style={{ backgroundColor: "var(--color-primary)" }}
            />

            {timeline.map((item, index) => (
              <div
                key={item.year}
                className={`timeline-item relative flex items-start gap-6 mb-10 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Year Badge */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 z-10">
                  <div
                    className="w-16 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ backgroundColor: "var(--color-secondary)" }}
                  >
                    {item.year}
                  </div>
                </div>

                {/* Content */}
                <div
                  className={`ml-14 md:ml-0 md:w-1/2 ${
                    index % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"
                  }`}
                >
                  <h3
                    className="font-heading text-lg font-semibold mb-2"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {item.description}
                  </p>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
