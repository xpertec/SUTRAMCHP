import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Twitter, MessageCircle } from "lucide-react";

const quickLinks = [
  { label: "Inicio", href: "/" },
  { label: "Nosotros", href: "/nosotros" },
  { label: "Noticias", href: "/blog" },
  { label: "Normativa", href: "/normativa" },
  { label: "Contacto", href: "/contacto" },
];

const resourceLinks = [
  { label: "Blog", href: "/blog" },
  { label: "Leyes Laborales", href: "/normativa" },
  { label: "Preguntas Frecuentes", href: "/#" },
  { label: "Afiliación", href: "/#" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: "var(--color-footer)" }}>
      <div className="container-padding mx-auto pt-12 md:pt-16 pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Column 1: About */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/images/logo.jpeg"
                alt="SUTRAMCHP"
                className="h-10 w-10 object-cover rounded-full border-2 border-white/20"
              />
              <span className="text-white font-heading font-bold text-lg">
                SUTRAMCHP
              </span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              Sindicato de Trabajadores Mineros de Chinalco Perú. Defendiendo los
              derechos laborales y construyendo un futuro mejor para nuestros
              agremiados desde 2003.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-4">
              Links Rápidos
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-4">
              Recursos
            </h4>
            <ul className="space-y-2.5">
              {resourceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors py-0.5 inline-block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div>
            <h4 className="text-white font-semibold text-xs sm:text-sm tracking-wider uppercase mb-4">
              Contacto
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5 text-white/60 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>Av. Minera 1234, Morococha, Yauli, Junín, Perú</span>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Phone size={16} className="shrink-0" />
                <a href="tel:+51914130326" className="hover:text-white transition-colors">+51 914 130 326</a>
              </li>
              <li className="flex items-center gap-2.5 text-white/60 text-sm">
                <Mail size={16} className="shrink-0" />
                <a href="mailto:secretaria_sindicato@sutramchp.pe" className="hover:text-white transition-colors break-all">secretaria_sindicato@sutramchp.pe</a>
              </li>
            </ul>

            {/* Social Links */}
            <div className="flex items-center gap-3 mt-5">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-[var(--color-primary)] transition-all"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-[var(--color-primary)] transition-all"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://wa.me/51914130326"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:bg-white hover:text-[var(--color-primary)] transition-all"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-center md:text-left">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} SUTRAMCHP. Todos los derechos reservados.
          </p>
          <p className="text-white/40 text-xs">
            Diseñado con compromiso para los trabajadores mineros
          </p>
        </div>
      </div>
    </footer>
  );
}
