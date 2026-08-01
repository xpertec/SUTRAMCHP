import { Mail, Phone } from "lucide-react";
import { useSeo } from "@/hooks/useSeo";


interface Miembro {
  cargo: string;
  nombre: string;
  correos: string[];
  telefono: string;
}

const directiva: Miembro[] = [
  {
    cargo: "Secretario General",
    nombre: "David Galindo Romero",
    correos: ["sindicato@sutramchperu.com", "dgalindoromero15@gmail.com"],
    telefono: "944 861 467",
  },
  {
    cargo: "Secretario General Adjunto",
    nombre: "Yosmir Dario Torres Marchena",
    correos: ["sindicato@sutramchperu.com", "ydtorresm@gmail.com"],
    telefono: "997 774 705",
  },
  {
    cargo: "Secretario de Organización",
    nombre: "Emer Fernández Mena",
    correos: ["secretario_organizacion@sutramchperu.com"],
    telefono: "966 369 566",
  },
  {
    cargo: "Secretario de Organización Adjunto",
    nombre: "Saul Akiro Collachagua Huancaya",
    correos: ["secretario_organizacion@sutramchperu.com"],
    telefono: "954 191 385",
  },
  {
    cargo: "Secretaria de Defensa y Asuntos Laborales",
    nombre: "Pedro Juan Rojas León",
    correos: ["secretario_defensa@sutramchperu.com"],
    telefono: "993 000 967",
  },
  {
    cargo: "Secretaria de Defensa y Asuntos Laborales Adjunto",
    nombre: "Tunshuruco Macle Chuquivilca Cordova",
    correos: ["secretario_defensa@sutramchperu.com"],
    telefono: "994 872 911",
  },
  {
    cargo: "Secretaria de Defensa y Asuntos Laborales Adjunto",
    nombre: "Tuctu Ever Orlando Medina Montecinos",
    correos: ["secretario_defensa@sutramchperu.com"],
    telefono: "991 973 351",
  },
  {
    cargo: "Secretario de Economía y Patrimonio Sindical",
    nombre: "Arturo Johel Calsin Torres",
    correos: ["secretario_economia@sutramchperu.com"],
    telefono: "986 287 840",
  },
  {
    cargo: "Secretario de Bienestar Social",
    nombre: "Plinio Alejandro Poma Condor",
    correos: ["secretario_bienestar_social@sutramchperu.com"],
    telefono: "913 043 049",
  },
  {
    cargo: "Secretario de Bienestar Social Adjunto",
    nombre: "Elvis Jhonatan Hinostroza Antonio",
    correos: ["secretario_bienestar_social@sutramchperu.com"],
    telefono: "963 101 714",
  },
  {
    cargo: "Secretario de Control y Disciplina",
    nombre: "Andy Mijael Tacuri Victorio",
    correos: ["secretario_control_disciplina@sutramchperu.com"],
    telefono: "989 197 300",
  },
  {
    cargo: "Secretario de Control y Disciplina Adjunto",
    nombre: "Pablo Leonardo Gazane Valencia",
    correos: ["secretario_control_disciplina@sutramchperu.com"],
    telefono: "944 271 162",
  },
  {
    cargo: "Secretario de Prensa y Propaganda",
    nombre: "Alexanders Alfredo Ramos Avila",
    correos: ["secretario_prensa@sutramchperu.com"],
    telefono: "989 502 592",
  },
  {
    cargo: "Secretario de Prensa y Propaganda Adjunto",
    nombre: "Félix Hitoshi Granados Caballero",
    correos: ["secretario_prensa@sutramchperu.com"],
    telefono: "980 763 686",
  },
  {
    cargo: "Secretario de Actas y Archivo",
    nombre: "Ingrid del Milagro Armas Temoche",
    correos: ["secretario_actas_archivos@sutramchperu.com"],
    telefono: "987 323 006",
  },
  {
    cargo: "Secretario de Cultura y Deportes",
    nombre: "Miguel Ángel Ticona Zumaran",
    correos: ["secretario_cultura_deportes@sutramchperu.com"],
    telefono: "964 332 600",
  },
  {
    cargo: "Secretario de Técnica y Estadística",
    nombre: "David Jerson Huamán Alcocer",
    correos: ["secretario_tecnica@sutramchperu.com"],
    telefono: "993 685 701",
  },
  {
    cargo: "Secretario de Seguridad e Higiene Minera",
    nombre: "Paul Eduardo Soto Gomez",
    correos: ["secretario_seguridad@sutramchperu.com"],
    telefono: "912 055 959",
  },
];

function iniciales(nombre: string) {
  const partes = nombre.trim().split(/\s+/);
  const primera = partes[0]?.[0] ?? "";
  const segunda = partes.length > 1 ? partes[1][0] : "";
  return (primera + segunda).toUpperCase();
}

function MiembroCard({ miembro }: { miembro: Miembro }) {
  return (
    <div
      className="p-5 sm:p-6 rounded-2xl flex flex-col h-full card-shadow hover:card-shadow-hover transition-all duration-300"
      style={{ backgroundColor: "var(--color-surface)" }}
    >
      <div className="flex items-start gap-3.5 sm:gap-4 mb-4">
        <div
          className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shrink-0 text-white font-heading text-base sm:text-lg font-bold shadow-sm"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          {iniciales(miembro.nombre)}
        </div>
        <div className="min-w-0 flex-1">
          <p
            className="text-[10px] sm:text-[11px] font-semibold tracking-wider uppercase mb-1 leading-tight"
            style={{ color: "var(--color-secondary)" }}
          >
            {miembro.cargo}
          </p>
          <h3
            className="font-heading text-base font-semibold leading-snug"
            style={{ color: "var(--color-text-primary)" }}
          >
            {miembro.nombre}
          </h3>
        </div>
      </div>

      <div className="mt-auto space-y-2 pt-3 border-t" style={{ borderColor: "var(--color-surface-alt)" }}>
        {miembro.correos.map((correo) => (
          <a
            key={correo}
            href={`mailto:${correo}`}
            className="flex items-center gap-2 text-xs sm:text-sm break-all transition-colors hover:text-[var(--color-secondary)] py-0.5"
            style={{ color: "var(--color-text-secondary)" }}
          >
            <Mail size={15} className="shrink-0" />
            <span className="truncate">{correo}</span>
          </a>
        ))}
        <a
          href={`tel:+51${miembro.telefono.replace(/\s+/g, "")}`}
          className="flex items-center gap-2 text-xs sm:text-sm transition-colors hover:text-[var(--color-secondary)] py-0.5"
          style={{ color: "var(--color-text-secondary)" }}
        >
          <Phone size={15} className="shrink-0" />
          {miembro.telefono}
        </a>
      </div>
    </div>
  );
}

export default function Directiva() {
  const personSchema = directiva.map((m) => ({
    "@context": "https://schema.org",
    "@type": "Person",
    name: m.nombre,
    jobTitle: m.cargo,
    email: m.correos[0],
    telephone: `+51${m.telefono.replace(/\s+/g, "")}`,
    worksFor: {
      "@type": "Organization",
      name: "SUTRAMCHP",
      url: "https://sutramchperu.com",
    },
  }));

  useSeo({
    title: "Nuestra Directiva",
    description:
      "Conoce a los dirigentes del Sindicato Unificado de Trabajadores de Minera Chinalco Perú (SUTRAMCHP): Secretario General, Secretarios de Área y toda la estructura sindical 2024-2026.",
    canonical: "https://sutramchperu.com/directiva",
    schema: personSchema,
  });

  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Hero */}
      <div
        className="relative flex items-center justify-center"
        style={{ backgroundColor: "var(--color-primary)", minHeight: "32vh" }}
      >
        <div className="container-padding mx-auto text-center py-12 md:py-16">
          <p
            className="text-xs font-medium tracking-wider uppercase mb-2 sm:mb-3"
            style={{ color: "var(--color-accent)" }}
          >
            SUTRAMCHP
          </p>
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 sm:mb-4">
            Nuestra Directiva
          </h1>
          <p
            className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto"
            style={{ color: "rgba(255,255,255,0.75)" }}
          >
            Conoce a los dirigentes que representan y defienden los derechos de los
            trabajadores mineros de Chinalco Perú
          </p>
        </div>
      </div>

      {/* Grid de miembros */}
      <section className="section-padding">
        <div className="container-padding mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {directiva.map((miembro, index) => (
              <MiembroCard key={`${miembro.nombre}-${index}`} miembro={miembro} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
