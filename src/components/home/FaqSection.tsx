import { useState } from "react";
import { ChevronDown } from "lucide-react";

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
    a: "Av. Minería s/n, Morococha, Yauli, Junín - Perú. Atención: lunes a viernes 8:00 am–5:00 pm | sábados 8:00 am–12:00 pm.",
  },
  {
    q: "¿En qué mina trabajan los afiliados de SUTRAMCH?",
    a: "En la mina Toromocho, operada por Minera Chinalco Perú (subsidiaria de Aluminum Corporation of China). Es uno de los yacimientos de cobre más grandes del mundo, en Morococha, Junín.",
  },
];

export default function FaqSection() {
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
