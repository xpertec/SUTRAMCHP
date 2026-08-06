import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutSection() {
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
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
