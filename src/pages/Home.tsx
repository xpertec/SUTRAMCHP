import { useSeo } from "@/hooks/useSeo";
import HeroSection from "@/components/home/HeroSection";
import NewsSection from "@/components/home/NewsSection";
import AboutSection from "@/components/home/AboutSection";
import LawsSection from "@/components/home/LawsSection";
import FaqSection from "@/components/home/FaqSection";
import AlliesSection from "@/components/home/AlliesSection";
import ContactSection from "@/components/home/ContactSection";

// ── Schema.org para la página de Inicio (SEO+GEO+AEO) ──
const HOME_SCHEMA = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SUTRAMCH",
    alternateName: [
      "SUTRAMCHPERU",
      "Sindicato Chinalco Perú",
      "Sindicato Unificado de Trabajadores Minera Chinalco Perú",
      "SUTRAMCHPERU.COM",
    ],
    url: "https://sutramchperu.com",
    logo: "https://sutramchperu.com/images/logo.jpeg",
    foundingDate: "2014-12-17",
    description:
      "SUTRAMCH (Sindicato Chinalco Perú) es el sindicato de los trabajadores de Minera Chinalco Perú, fundado el 17 de diciembre de 2014. Representa a más de 2,500 trabajadores en la mina Toromocho, Morococha, Junín.",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Av. Minería s/n",
      addressLocality: "Morococha",
      addressRegion: "Junín",
      postalCode: "12454",
      addressCountry: "PE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: -11.60722,
      longitude: -76.16861,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+51-914-130-326",
      email: "secretaria_sindicato@sutramchperu.com",
      contactType: "customer service",
      availableLanguage: "Spanish",
    },
    sameAs: [
      "https://www.facebook.com/SUTRAMCHP",
      "https://sutramchperu.com",
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "SUTRAMCH — Sindicato Chinalco Perú",
    alternateName: "SUTRAMCHPERU.COM",
    url: "https://sutramchperu.com",
    description:
      "Sitio web oficial del Sindicato Chinalco Perú (SUTRAMCH / SUTRAMCHPERU). Noticias sindicales, normativa laboral, directiva y contacto.",
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
        name: "¿Qué es SUTRAMCH?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "SUTRAMCH (también conocido como SUTRAMCHPERU o Sindicato Chinalco) es el Sindicato Unificado de Trabajadores de Minera Chinalco Perú, fundado el 17 de diciembre de 2014. Representa y defiende los derechos laborales de más de 2,500 trabajadores mineros que laboran en la mina Toromocho, ubicada en Morococha, provincia de Yauli, Junín, Perú.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es el Sindicato Chinalco Perú?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "El Sindicato Chinalco Perú es SUTRAMCH (Sindicato Unificado de Trabajadores de Minera Chinalco Perú), también identificado como SUTRAMCHPERU. Es la única organización sindical que representa a los trabajadores de Minera Chinalco Perú en la mina Toromocho, Morococha, Junín.",
        },
      },
      {
        "@type": "Question",
        name: "¿Cómo puedo afiliarme a SUTRAMCH?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Para afiliarse a SUTRAMCH debes ser trabajador de Minera Chinalco Perú. Puedes comunicarte con la secretaría del sindicato al teléfono +51 914 130 326 o escribir al correo secretaria_sindicato@sutramchperu.com con tu solicitud de afiliación.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué beneficios obtienen los afiliados al Sindicato Chinalco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los afiliados a SUTRAMCH (Sindicato Chinalco Perú) acceden a negociación colectiva, defensa laboral, seguro médico familiar, bono educativo, programa de vivienda, atención en el Centro de Salud SUTRAMCH con horario 24/7, y acceso a capacitaciones y actividades culturales.",
        },
      },
      {
        "@type": "Question",
        name: "¿Dónde está ubicada la oficina de SUTRAMCH?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La oficina principal de SUTRAMCH (Sindicato Chinalco Perú) está ubicada en Av. Minería s/n, Morococha, Yauli, Junín - Perú. El horario de atención es de lunes a viernes de 8:00 am a 5:00 pm y sábados de 8:00 am a 12:00 pm.",
        },
      },
      {
        "@type": "Question",
        name: "¿En qué mina trabajan los afiliados del Sindicato Chinalco?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Los afiliados de SUTRAMCH (Sindicato Chinalco Perú) trabajan principalmente en la mina Toromocho, operada por Minera Chinalco Perú, subsidiaria de Aluminum Corporation of China (Chinalco). La mina Toromocho es uno de los yacimientos de cobre más grandes del mundo y está ubicada en Morococha, Junín.",
        },
      },
      {
        "@type": "Question",
        name: "¿SUTRAMCH y SUTRAMCHPERU son el mismo sindicato?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Sí. SUTRAMCH y SUTRAMCHPERU son el mismo sindicato: el Sindicato Chinalco Perú (Sindicato Unificado de Trabajadores de Minera Chinalco Perú). Su sitio web oficial es sutramchperu.com.",
        },
      },
      {
        "@type": "Question",
        name: "¿Qué es la mina Toromocho?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "La mina Toromocho es un yacimiento de cobre ubicado en Morococha, provincia de Yauli, Junín, Perú, operado por Minera Chinalco Perú. Los trabajadores de esta mina están representados por SUTRAMCH (Sindicato Chinalco Perú).",
        },
      },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": "https://sutramchperu.com/#webpage",
    url: "https://sutramchperu.com/",
    name: "SUTRAMCH — Sindicato Chinalco Perú | SUTRAMCHPERU.COM",
    isPartOf: {
      "@type": "WebSite",
      "@id": "https://sutramchperu.com/#website",
      url: "https://sutramchperu.com",
      name: "SUTRAMCH — Sindicato Chinalco Perú",
    },
    about: {
      "@type": "Organization",
      name: "SUTRAMCH",
      alternateName: ["SUTRAMCHPERU", "Sindicato Chinalco Perú"],
    },
    description:
      "Sitio oficial de SUTRAMCH (Sindicato Chinalco Perú / SUTRAMCHPERU). Fundado el 17 de diciembre de 2014 para defender los derechos laborales de más de 2,500 trabajadores mineros en la mina Toromocho, Morococha, Junín, Perú.",
    inLanguage: "es-PE",
    potentialAction: {
      "@type": "ReadAction",
      target: "https://sutramchperu.com/",
    },
  },
];

export default function Home() {
  useSeo({
    title: "Inicio",
    description:
      "SUTRAMCH (Sindicato Chinalco Perú) — sitio oficial de SUTRAMCHPERU.COM. Fundado el 17 dic 2014, defendemos los derechos laborales de más de 2,500 trabajadores en la mina Toromocho, Morococha, Junín.",
    canonical: "https://sutramchperu.com/",
    keywords:
      "SUTRAMCH, SUTRAMCHPERU, Sindicato Chinalco, sindicato Chinalco Perú, sindicato minero Chinalco, Sindicato Chinalco Peru, sindicato Toromocho, trabajadores Chinalco Perú, derechos laborales mineros Junín, mina Toromocho sindicato, negociación colectiva Chinalco, sindicato Morococha",
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