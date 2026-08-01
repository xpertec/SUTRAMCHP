import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search } from "lucide-react";

const navLinks = [
  { label: "INICIO", href: "/" },
  { label: "NOSOTROS", href: "/nosotros" },
  { label: "DIRECTIVA", href: "/directiva" },
  { label: "NOTICIAS", href: "/blog" },
  { label: "NORMATIVA", href: "/normativa" },
  { label: "CONTACTO", href: "/contacto" },
];

// ── Íconos redes sociales ──
function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
function TwitterIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M4 4l16 16M20 4 4 20" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function YoutubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white" />
    </svg>
  );
}
function WhatsappIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
    setShowSearch(false);
  }, [location]);

  return (
    <>
      <header className="w-full bg-white shadow-sm z-50 relative">

        {/* ── Top bar: redes sociales ── */}
        <div className="border-b border-gray-100">
          <div className="container-padding mx-auto flex items-center justify-end h-9 gap-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#1877F2" }}
            >
              <FacebookIcon />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter / X"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#000" }}
            >
              <TwitterIcon />
            </a>
            <a
              href="https://youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="YouTube"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#FF0000" }}
            >
              <YoutubeIcon />
            </a>
            <a
              href="https://wa.me/51914130326"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="w-7 h-7 rounded-full flex items-center justify-center text-white transition-opacity hover:opacity-80"
              style={{ backgroundColor: "#25D366" }}
            >
              <WhatsappIcon />
            </a>
          </div>
        </div>

        {/* ── Main nav bar ── */}
        <nav className="container-padding mx-auto flex items-center justify-between h-16 md:h-20">

          {/* Logo */}
          <Link to="/" className="relative z-30 shrink-0 -mb-[32px] sm:-mb-[47px] md:-mb-[73px] block">
            <div className="bg-white rounded-full p-1 sm:p-1.5 shadow-lg border-2 sm:border-4 border-white w-[76px] h-[76px] sm:w-[104px] sm:h-[104px] md:w-[146px] md:h-[146px] flex items-center justify-center -mt-[14px] sm:-mt-[26px] md:-mt-[47px] transition-transform duration-300 hover:scale-105">
              <img
                src="/images/logo.jpeg"
                alt="SUTRAMCHP"
                className="w-full h-full object-contain rounded-full"
              />
            </div>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-7">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-xs font-semibold tracking-[0.06em] transition-colors relative group ${location.pathname === link.href
                  ? "text-[var(--color-secondary)]"
                  : "text-[var(--color-primary)] hover:text-[var(--color-secondary)]"
                  }`}
              >
                {link.label}
                {/* underline hover animation */}
                <span
                  className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 rounded-full ${location.pathname === link.href
                    ? "w-full"
                    : "w-0 group-hover:w-full"
                    }`}
                  style={{ backgroundColor: "var(--color-secondary)" }}
                />
              </Link>
            ))}

            {/* Search button */}
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="p-1.5 rounded-full transition-colors hover:bg-gray-100"
              style={{ color: "var(--color-primary)" }}
              aria-label="Buscar"
            >
              <Search size={18} />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2.5 rounded-lg hover:bg-gray-100 transition-colors"
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Menú"
          >
            {isMobileOpen ? (
              <X size={24} style={{ color: "var(--color-primary)" }} />
            ) : (
              <Menu size={24} style={{ color: "var(--color-primary)" }} />
            )}
          </button>
        </nav>

        {/* Search bar expandible (desktop) */}
        {showSearch && (
          <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
            <div className="container-padding mx-auto">
              <input
                type="search"
                placeholder="Buscar en el sitio..."
                autoFocus
                className="w-full max-w-lg border border-gray-300 rounded-full px-5 py-2 text-sm outline-none focus:border-[var(--color-primary)] transition-colors"
              />
            </div>
          </div>
        )}
      </header>

      {/* ── Mobile menu overlay ── */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 z-40 flex flex-col items-center justify-start pt-16 pb-10 px-6 overflow-y-auto gap-6 sm:gap-8 animate-fade-in"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <button
            className="absolute top-4 right-4 p-3 text-white rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setIsMobileOpen(false)}
            aria-label="Cerrar menú"
          >
            <X size={28} />
          </button>
          <div className="w-16 h-16 rounded-full bg-white p-1 my-2 shadow-md shrink-0">
            <img src="/images/logo.jpeg" alt="Logo" className="w-full h-full object-contain rounded-full" />
          </div>
          <div className="flex flex-col items-center gap-4 w-full max-w-xs my-auto">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`w-full text-center py-2.5 text-xl sm:text-2xl font-heading font-semibold tracking-wide transition-colors ${
                  location.pathname === link.href
                    ? "text-[var(--color-accent)] font-bold"
                    : "text-white hover:text-[var(--color-accent)]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}

    </>
  );
}
