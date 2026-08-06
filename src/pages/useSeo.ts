/**
 * useSeo — Hook para gestión dinámica de SEO, GEO y AEO
 *
 * Inyecta en <head>:
 *  - <title>
 *  - <meta name="description">
 *  - <link rel="canonical">
 *  - Open Graph tags
 *  - Twitter Card tags
 *  - JSON-LD structured data (Schema.org)
 */

import { useEffect } from "react";

const SITE_NAME = "SUTRAMCH";
const SITE_URL = "https://sutramchperu.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-image.jpg`;
const DEFAULT_DESCRIPTION =
  "SUTRAMCH (Sindicato Unificado de Trabajadores de Minera Chinalco Perú) es el sindicato minero de Chinalco Perú, fundado el 17 de diciembre de 2014 para defender los derechos laborales de más de 2,500 trabajadores mineros en Toromocho, Junín, Perú.";

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
  /** Palabras clave SEO, separadas por coma. Ej: "sindicato chinalco, SUTRAMCH" */
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
  keywords,
  noIndex = false,
}: SeoProps = {}) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} | ${SITE_NAME}`
      : `${SITE_NAME} — Sindicato Unificado de Trabajadores Minera Chinalco Perú`;

    const canonicalUrl = canonical ?? `${SITE_URL}${window.location.pathname}`;

    // Title
    document.title = pageTitle;

    // Description
    setMeta('meta[name="description"]', "name", "description", description);

    // Keywords
    if (keywords) {
      setMeta('meta[name="keywords"]', "name", "keywords", keywords);
    }

    // Robots
    setMeta(
      'meta[name="robots"]',
      "name",
      "robots",
      noIndex
        ? "noindex, nofollow"
        : "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1"
    );

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
      // Limpiar JSON-LD al cambiar de página
      removeSchema("schema-org-page");
    };
  }, [title, description, canonical, ogImage, ogType, schema, keywords, noIndex]);
}
