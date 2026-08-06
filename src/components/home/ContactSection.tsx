import { useRef } from "react";
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

const CONTACT_EMAIL = "secretaria_sindicato@sutramchperu.com";

function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const form = e.currentTarget;
  const nombre = (form.elements.namedItem("nombre") as HTMLInputElement)?.value || "";
  const email = (form.elements.namedItem("email") as HTMLInputElement)?.value || "";
  const telefono = (form.elements.namedItem("telefono") as HTMLInputElement)?.value || "";
  const asunto = (form.elements.namedItem("asunto") as HTMLSelectElement)?.value || "";
  const mensaje = (form.elements.namedItem("mensaje") as HTMLTextAreaElement)?.value || "";

  const subject = encodeURIComponent(`[SUTRAMCH Web] ${asunto || "Consulta"}`);
  const body = encodeURIComponent(
    `Nombre: ${nombre}\nEmail: ${email}\nTeléfono: ${telefono}\n\nMensaje:\n${mensaje}`
  );
  window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
}

export default function ContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="section-padding"
      style={{ backgroundColor: "var(--color-background)" }}
    >
      <div className="container-padding mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left: Form */}
          <div className="contact-left lg:col-span-3">
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
              Estamos para
              <br />
              ayudarte
            </h2>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="text"
                  name="nombre"
                  placeholder="Nombre completo"
                  aria-label="Nombre completo"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                  aria-label="Correo electrónico"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <input
                  type="tel"
                  name="telefono"
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)" }}
                />
                <select
                  name="asunto"
                  aria-label="Asunto"
                  className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors"
                  style={{ borderColor: "var(--color-surface-alt)", color: "var(--color-text-secondary)" }}
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="consulta">Consulta general</option>
                  <option value="afiliacion">Afiliación</option>
                  <option value="reclamo">Reclamo laboral</option>
                  <option value="capacitacion">Capacitación</option>
                </select>
              </div>
              <textarea
                name="mensaje"
                placeholder="Tu mensaje"
                aria-label="Mensaje"
                rows={5}
                className="w-full px-4 py-3.5 rounded-md border bg-white text-sm focus:outline-none focus:border-[var(--color-primary)] transition-colors resize-none"
                style={{ borderColor: "var(--color-surface-alt)" }}
              />
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

          {/* Right: Info */}
          <div className="contact-right lg:col-span-2">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
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
                    className="text-sm"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    Av. Minería s/n, Morococha
                    <br />
                    Yauli, Junín, Perú
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
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
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
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
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-sm hover:underline"
                    style={{ color: "var(--color-text-secondary)" }}
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
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

              {/* Social Links */}
              <div className="pt-4">
                <h4
                  className="font-semibold text-sm mb-3"
                  style={{ color: "var(--color-text-primary)" }}
                >
                  Síguenos
                </h4>
                <div className="flex items-center gap-3">
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                    aria-label="Facebook"
                  >
                    <Facebook size={18} />
                  </a>
                  <a
                    href="#"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                    aria-label="Twitter"
                  >
                    <Twitter size={18} />
                  </a>
                  <a
                    href="https://wa.me/51914130326"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border flex items-center justify-center transition-all hover:bg-[var(--color-primary)] hover:text-white hover:border-[var(--color-primary)]"
                    style={{
                      borderColor: "var(--color-primary)",
                      color: "var(--color-primary)",
                    }}
                    aria-label="WhatsApp"
                  >
                    <MessageCircle size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
