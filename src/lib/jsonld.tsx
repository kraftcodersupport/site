import { brand, FAQS } from "@/lib/niches";
import { SITE_URL } from "@/lib/site";

export const BASE_URL = SITE_URL;

// ── Organization ──────────────────────────────────────────────
export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: brand.name,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    email: brand.email,
    description: brand.tagline,
    foundingDate: "2024",
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address,
      addressLocality: brand.addressLocality,
      addressRegion: brand.addressRegion,
      addressCountry: brand.addressCountry,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: brand.phones[0],
      email: brand.email,
      contactType: "sales",
      availableLanguage: ["English"],
    },
  };
}

// ── WebSite (enables sitelinks searchbox) ─────────────────────
export function getWebSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: brand.name,
    url: BASE_URL,
    description: brand.tagline,
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${BASE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ── ProfessionalService (for GEO local ranking) ───────────────
export function getProfessionalServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brand.name,
    url: BASE_URL,
    logo: `${BASE_URL}/logo.png`,
    image: `${BASE_URL}/logo.png`,
    email: brand.email,
    description:
      "Enterprise AI consulting and strategy firm helping organizations turn AI into measurable business outcomes through governed delivery models.",
    priceRange: "$$$$",
    address: {
      "@type": "PostalAddress",
      streetAddress: brand.address,
      addressLocality: brand.addressLocality,
      addressRegion: brand.addressRegion,
      addressCountry: brand.addressCountry,
    },
    telephone: brand.phones.join(", "),
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: { "@type": "GeoCoordinates", latitude: 23.0225, longitude: 72.5714 },
      geoRadius: "50000",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "AI Strategy",
      "AI Consulting",
      "AI Agent Development",
      "RAG Systems",
      "Enterprise AI",
      "Machine Learning",
      "Chatbot Development",
      "AI Automation",
      "Cloud & DevOps",
    ],
  };
}

// ── Service ───────────────────────────────────────────────────
export function getServiceSchema(service: {
  title: string;
  description: string;
  bullets?: string[];
}) {
  return {
    "@type": "Service",
    name: service.title,
    description: service.description,
    provider: {
      "@type": "Organization",
      name: brand.name,
      url: BASE_URL,
    },
    ...(service.bullets && {
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: service.title,
        itemListElement: service.bullets.map((b, i) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: b,
          },
        })),
      },
    }),
  };
}

// ── Service ItemList ──────────────────────────────────────────
export function getServiceListSchema(
  services: { title: string; description: string; bullets?: string[] }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${brand.name} Services`,
    description: "AI consulting services offered by KraftCoder",
    numberOfItems: services.length,
    itemListElement: services.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: getServiceSchema(s),
    })),
  };
}

// ── BlogPosting ───────────────────────────────────────────────
export function getBlogPostingSchema(post: {
  title: string;
  description?: string;
  category?: string;
  published?: string;
  readTime?: string;
  slug?: string;
  content?: string;
}) {
  const slug =
    typeof post.slug === "string"
      ? post.slug
      : post.title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "");

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || "",
    url: `${BASE_URL}/blog/${slug}`,
    datePublished: post.published || new Date().toISOString(),
    dateModified: post.published || new Date().toISOString(),
    author: {
      "@type": "Organization",
      name: brand.name,
      url: BASE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: brand.name,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${BASE_URL}/blog/${slug}`,
    },
    ...(post.category && { articleSection: post.category }),
    ...(post.readTime && {
      timeRequired: `PT${parseInt(post.readTime) || 5}M`,
    }),
    inLanguage: "en",
  };
}

// ── FAQPage ───────────────────────────────────────────────────
export function getFAQSchema(
  faqs: { question: string; answer: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

// ── HowTo ─────────────────────────────────────────────────────
export function getHowToSchema(
  steps: { step: string; title: string; description: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "KraftCoder AI Delivery Process",
    description:
      "A disciplined 4-phase delivery model that moves organizations from AI curiosity to production systems.",
    totalTime: "P12W",
    step: steps.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.description,
      url: `${BASE_URL}/how-it-works#step-${s.step}`,
    })),
  };
}

// ── BreadcrumbList ────────────────────────────────────────────
export function getBreadcrumbSchema(
  items: { name: string; href?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href && { item: `${BASE_URL}${item.href}` }),
    })),
  };
}

// ── Generic ItemList ──────────────────────────────────────────
export function getItemListSchema(
  name: string,
  items: { name: string; description?: string; url?: string }[]
) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.description && { description: item.description }),
      ...(item.url && { url: `${BASE_URL}${item.url}` }),
    })),
  };
}

// ── Render helper ─────────────────────────────────────────────
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
