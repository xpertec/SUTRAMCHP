import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  Facebook,
  Twitter,
  MessageCircle,
} from "lucide-react";

export default function Contacto() {
  return (
    <div style={{ backgroundColor: "var(--color-background)" }}>
      {/* Map Embed */}
      <div className="w-full h-[300px] md:h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15623.803455407803!2d-76.1424922!3d-11.72693745!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9106df37c11f6465%3A0xef40d229dd8dd9!2sMorococha%2C%20Jun%C3%ADn!5e0!3m2!1ses!2spe!4v1700000000000!5m2!1ses!2spe"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Ubicación SUTRAMCHP"
        />
      </div>

      {/* Content */}
      <div className="container-padding mx-auto py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Form */}
          <div>
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              CONTÁCTANOS
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "var(--color-text-primary)" }}
            >
              Envíanos un mensaje
            </h2>

            <form className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Nombre completo
                  </label>
                  <input
                    type="text"
                    placeholder="Tu nombre"
                    className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    style={{ borderColor: "var(--color-surface-alt)" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Correo electrónico
                  </label>
                  <input
                    type="email"
                    placeholder="tu@email.com"
                    className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    style={{ borderColor: "var(--color-surface-alt)" }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    placeholder="+51 914 130 326"
                    className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    style={{ borderColor: "var(--color-surface-alt)" }}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1.5"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Asunto
                  </label>
                  <select
                    className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                    style={{
                      borderColor: "var(--color-surface-alt)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <option value="">Selecciona un asunto</option>
                    <option value="consulta">Consulta general</option>
                    <option value="afiliacion">Afiliación</option>
                    <option value="reclamo">Reclamo laboral</option>
                    <option value="capacitacion">Capacitación</option>
                  </select>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-1.5"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Mensaje
                </label>
                <textarea
                  placeholder="Escribe tu mensaje..."
                  rows={6}
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full text-white text-sm font-semibold hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                style={{ backgroundColor: "var(--color-secondary)" }}
              >
                <Send size={16} />
                Enviar mensaje
              </button>
            </form>
          </div>

          {/* Info */}
          <div>
            <p
              className="text-xs font-medium tracking-[0.08em] uppercase mb-3"
              style={{ color: "var(--color-secondary)" }}
            >
              INFORMACIÓN DE CONTACTO
            </p>
            <h2
              className="font-heading text-3xl md:text-4xl font-bold mb-8"
              style={{ color: "var(--color-text-primary)" }}
            >
              Estamos aquí para ti
            </h2>

            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <MapPin size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Dirección
                  </h4>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Av. Minera 1234, Morococha
                    <br />
                    Yauli, Junín, Perú
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Phone size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Teléfono
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    +51 914 130 326
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Mail size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Email
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    secretaria_sindicato@sutramchp.pe
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center shrink-0"
                  style={{ backgroundColor: "var(--color-primary)" }}
                >
                  <Clock size={18} className="text-white" />
                </div>
                <div>
                  <h4
                    className="font-semibold text-sm mb-1"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    Horario de atención
                  </h4>
                  <p
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Lunes a Viernes: 8:00 am - 5:00 pm
                    <br />
                    Sábados: 8:00 am - 12:00 pm
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div>
              <h4
                className="font-semibold text-sm mb-4"
                style={{ color: "var(--color-text-primary)" }}
              >
                Síguenos en redes sociales
              </h4>
              <div className="flex items-center gap-3">
                <a
                  href="#"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ backgroundColor: "#1877F2" }}
                >
                  <Facebook size={18} />
                </a>
                <a
                  href="#"
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ backgroundColor: "#1DA1F2" }}
                >
                  <Twitter size={18} />
                </a>
                <a
                  href="https://wa.me/51914130326" // Reemplaza con tu número real (código país + número, sin símbolos)
                  target="_blank" // Abre en una nueva pestaña (opcional pero recomendado)
                  rel="noopener noreferrer" // Seguridad para nuevas pestañas
                  className="w-11 h-11 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                  style={{ backgroundColor: "#25D366" }}
                  aria-label="Contactar por WhatsApp" // Accesibilidad
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
