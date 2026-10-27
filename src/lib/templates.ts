import { useSanityClient, groq } from "astro-sanity";

export interface TemplateItem {
  _id: string;
  templateName: string;
  slug: { current: string };
  tagline?: string;
  price?: string;
  originalPrice?: string;
  gumroadLink?: string;
  demoLink?: string;
  gitHubLink?: string;
  badge?: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
  gallery?: Array<{ asset?: { url?: string } }>;
  highlights?: string[];
  included?: string[];
  excerpt?: any;
  content?: any;
  _createdAt?: string;
  _updatedAt?: string;
}

const TEMPLATE_SLUGS = [
  "lumina-dental-premium-dental-website-template",
  "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template",
];

export const isTemplateSlug = (slug: string): boolean => {
  if (!slug) return false;
  return TEMPLATE_SLUGS.includes(slug) || slug.includes("template");
};

export const normalizeTemplate = (item: any): TemplateItem => {
  const templateName = item.templateName || item.projectName || "Premium Website Template";
  const slugCurrent = item.slug?.current || item.slug || "";
  
  // High-fidelity fallback defaults for the 2 featured templates if they are currently stored in `projects`
  const isApex = slugCurrent.includes("apex-luxury");
  const isLumina = slugCurrent.includes("lumina-dental");

  const defaultTagline = isApex
    ? "Ultra-luxury real estate & architectural web template with property discovery & multilingual support."
    : isLumina
      ? "Modern healthcare & dental clinic platform built with Next.js, Framer Motion & GSAP."
      : "Production-ready website template engineered with modern web architecture.";

  const defaultHighlights = isApex
    ? [
        "Interactive property showcase with interactive map filtering",
        "Refined architectural aesthetic with champagne & obsidian tones",
        "Client-side admin dashboard for managing listings",
        "Multilingual readiness (English, Spanish, German)",
        "Multi-currency dynamic pricing & formatting",
        "100% responsive across desktop, tablet & mobile"
      ]
    : isLumina
      ? [
          "Fluid appointment booking & consultation workflow",
          "Silky smooth GSAP & Framer Motion micro-interactions",
          "Before/After smile comparison slider module",
          "Comprehensive service catalog & doctor profiles",
          "100% PageSpeed performance score",
          "Mobile-first responsive architecture"
        ]
      : [
          "Production-ready modern architecture",
          "Fast loading & 99+ Core Web Vitals",
          "Responsive layouts across all screen sizes",
          "Clean, modular, and maintainable codebase"
        ];

  const defaultIncluded = [
    "Full source code (clean, modular, and fully typed)",
    "Comprehensive setup documentation & quickstart guide",
    "Tailwind CSS configuration & design tokens",
    "Commercial license for unlimited personal & client projects",
    "Lifetime free bug fixes and version updates"
  ];

  const defaultPrice = isApex ? "$49" : isLumina ? "$39" : "$49";
  const defaultOriginalPrice = isApex ? "$89" : isLumina ? "$69" : "$79";
  const defaultBadge = isApex ? "Featured" : isLumina ? "Popular" : (item.badge || "New");
  const defaultCategory = isApex ? "Real Estate" : isLumina ? "Healthcare" : (item.category || "General");

  const imageUrl = item.thumbnailImage?.asset?.url || item.BackgroundImage?.asset?.url || "";

  return {
    _id: item._id,
    templateName,
    slug: { current: slugCurrent },
    tagline: item.tagline || defaultTagline,
    price: item.price || defaultPrice,
    originalPrice: item.originalPrice || defaultOriginalPrice,
    gumroadLink: typeof item.gumroadLink === "string" ? item.gumroadLink : item.gumroadLink?.current,
    demoLink: typeof item.demoLink === "string" ? item.demoLink : item.demoLink?.current,
    gitHubLink: typeof item.gitHubLink === "string" ? item.gitHubLink : item.gitHubLink?.current,
    badge: item.badge || defaultBadge,
    category: defaultCategory,
    tags: item.tags || ["Next.js", "Tailwind CSS", "TypeScript"],
    imageUrl,
    gallery: item.gallery || [],
    highlights: item.highlights?.length ? item.highlights : defaultHighlights,
    included: item.included?.length ? item.included : defaultIncluded,
    excerpt: item.excerpt,
    content: item.templateContent || item.projectcontent,
    _createdAt: item._createdAt,
    _updatedAt: item._updatedAt,
  };
};

export async function fetchAllTemplates(): Promise<TemplateItem[]> {
  try {
    const client = useSanityClient();

    // 1. Fetch any newly created templates from `templates` schema
    const newTemplatesQuery = groq`*[_type == "templates"] | order(_createdAt desc){
      ...,
      thumbnailImage{ asset->{ url } },
      BackgroundImage{ asset->{ url } },
      gallery[]{ asset->{ url } }
    }`;

    let templates = await client.fetch(newTemplatesQuery);

    // 2. Fetch existing templates stored in `projects` (those with gumroadLink or known slugs)
    const legacyTemplatesQuery = groq`*[_type == "projects" && (defined(gumroadLink) || slug.current in [
      "lumina-dental-premium-dental-website-template",
      "apex-luxury-ultra-luxury-real-estate-and-architectural-web-template"
    ])]{
      ...,
      BackgroundImage{ asset->{ url } }
    }`;

    const legacyTemplates = await client.fetch(legacyTemplatesQuery);

    // Combine: prefer new templates schema, add legacy if not duplicate by slug
    const existingSlugs = new Set((templates || []).map((t: any) => t.slug?.current));
    const combined = [...(templates || [])];

    for (const legacy of legacyTemplates || []) {
      if (!existingSlugs.has(legacy.slug?.current)) {
        combined.push(legacy);
      }
    }

    return combined.map(normalizeTemplate);
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return [];
  }
}

export async function fetchTemplateBySlug(slug: string): Promise<TemplateItem | null> {
  try {
    const client = useSanityClient();

    // Check templates first
    const templateQuery = groq`*[_type == "templates" && slug.current == $slug][0]{
      ...,
      thumbnailImage{ asset->{ url } },
      BackgroundImage{ asset->{ url } },
      gallery[]{ asset->{ url } }
    }`;
    const item = await client.fetch(templateQuery, { slug });
    if (item) return normalizeTemplate(item);

    // Fallback to projects query
    const projectQuery = groq`*[_type == "projects" && slug.current == $slug][0]{
      ...,
      BackgroundImage{ asset->{ url } }
    }`;
    const legacyItem = await client.fetch(projectQuery, { slug });
    if (legacyItem) return normalizeTemplate(legacyItem);

    return null;
  } catch (error) {
    console.error(`Failed to fetch template for slug ${slug}:`, error);
    return null;
  }
}
