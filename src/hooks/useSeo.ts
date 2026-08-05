/**
 * useSeo — Hook para gestión dinámica de SEO, GEO y AEO
 *
 * Inyecta en <head>:
 *  - <title>
 *  - <meta name="description">
 *  - <meta name="keywords">
 *  - <link rel="canonical">
 *  - Metatags GEO (geo.region, geo.placename, geo.position, ICBM)
 *  - Open Graph tags
 *  - Twitter Card tags
 *  - JSON-LD structured data (Schema.org)
 */

import { useEffect } from "react";

const SITE_NAME = "SUTRAMCH";
const SITE_FULL = "SUTRAMCH — Sindicato Chinalco Perú";
const SITE_URL = "https://sutramchperu.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
const DEFAULT_DESCRIPTION =
  "SUTRAMCH es el Sindicato Chinalco Perú (SUTRAMCHPERU), fundado el 17 de diciembre de 2014 para defender los derechos laborales de más de 2,500 trabajadores mineros en la mina Toromocho, Morococha, Junín, Perú.";
const DEFAULT_KEYWORDS =
  "SUTRAMCH, SUTRAMCHPERU, Sindicato Chinalco, sindicato Chinalco Perú, sindicato minero Chinalco, sindicato Toromocho, trabajadores Chinalco Perú, derechos laborales mineros Junín";

export interface SeoProps {
  /** Título de la página (sin el nombre del sitio). Ej: "Nuestra Historia" */
  title?: string;
  /** Descripción de la página (120-160 caracteres recomendado) */
  description?: string;
  /** URL canónica completa. Si se omite, se construye desde la URL actual */
  canonical?: string;
  /** URL de imagen Open Graph (1200×630 recomendado) */
  ogImage?: string;
  /** Tipo Open Graph */
  ogType?: "website" | "article";
  /** JSON-LD structured data object(s) para Schema.org */
  schema?: object | object[];
  /** Palabras clave SEO, separadas por coma */
  keywords?: string;
  /** Si true, noindex para bots */
  noIndex?: boolean;
}

function setMeta(selector: string, attrName: string, attrValue: string, content: string) {
  let el = document.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}

function injectSchema(schema: object | object[], scriptId: string) {
  let el = document.getElementById(scriptId) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = scriptId;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.textContent = JSON.stringify(Array.isArray(schema) ? schema : [schema]);
}

function removeSchema(scriptId: string) {
  document.getElementById(scriptId)?.remove();
}

export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  schema,
  keywords = DEFAULT_KEYWORDS,
  noIndex = false,
}: SeoProps = {}) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${SITE_NAME} — Sindicato Chinalco Perú`
      : `${SITE_FULL} | SUTRAMCHPERU.COM`;

    const canonicalUrl = canonical ?? `${SITE_URL}${window.location.pathname}`;

    // Title
    document.title = pageTitle;

    // Description
    setMeta('meta[name="description"]', "name", "description", description);

    // Keywords
    setMeta('meta[name="keywords"]', "name", "keywords", keywords);

    // Robots
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

    // GEO metatags (posicionamiento local Perú / Junín)
    setMeta('meta[name="geo.region"]', "name", "geo.region", "PE-JUN");
    setMeta('meta[name="geo.placename"]', "name", "geo.placename", "Morococha, Yauli, Junín, Perú");
    setMeta('meta[name="geo.position"]', "name", "geo.position", "-11.60722;-76.16861");
    setMeta('meta[name="ICBM"]', "name", "ICBM", "-11.60722, -76.16861");

    // Canonical
    setLink("canonical", canonicalUrl);

    // Open Graph
    setMeta('meta[property="og:title"]', "property", "og:title", pageTitle);
    setMeta('meta[property="og:description"]', "property", "og:description", description);
    setMeta('meta[property="og:url"]', "property", "og:url", canonicalUrl);
    setMeta('meta[property="og:image"]', "property", "og:image", ogImage);
    setMeta('meta[property="og:type"]', "property", "og:type", ogType);

    // Twitter
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", pageTitle);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", description);
    setMeta('meta[name="twitter:image"]', "name", "twitter:image", ogImage);

    // JSON-LD Schema
    if (schema) {
      injectSchema(schema, "schema-org-page");
    }

    return () => {
      removeSchema("schema-org-page");
    };
  }, [title, description, canonical, ogImage, ogType, schema, keywords, noIndex]);
}
