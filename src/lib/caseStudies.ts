export interface CaseStudy {
  slug: string;
  projectName: string;
  role: string;
  clientType: string;
  impactMetric: string;
  impactLabel: string;
  excerpt: string;
  problem: string;
  solution: string;
  myContribution: string;
  businessImpact: string;
  challenges: string;
  keyFeatures: string[];
  technologies: { name: string; color: string }[];
  demoUrl?: string;
  githubUrl?: string;
  imageUrl?: string;
  duration: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  "sawt-ai": {
    slug: "sawt-ai",
    projectName: "Sawt AI survey platform",
    role: "Lead Full Stack & AI Architect",
    clientType: "Conversational SaaS Startup",
    impactMetric: "340%",
    impactLabel: "Survey Completion Surge",
    excerpt: "An AI-powered survey platform featuring bilingual (English/Arabic) RTL support, built to increase completion rates through dynamic, conversation-driven cognitive AI interview agents.",
    problem: "Traditional text-based customer survey tools suffer from abysmal completion rates (typically below 3%) and fail to capture qualitative context. Additionally, regional Arabic-speaking markets lacked dynamic Right-to-Left (RTL) support for modern web applications.",
    solution: "We engineered a conversational survey SaaS that conducts surveys as natural human-like interviews. The application dynamically adjusts questions based on previous answers, supports bidirectional RTL-LTR rendering, and extracts structured data from voice and text transcripts.",
    myContribution: "Designed the server-to-client event model using Socket.IO to enable zero-latency chat streams. Programmed the bidirectional RTL styling layer and set up automatic fallback queues between OpenAI, Anthropic Claude, and Grok APIs to prevent service interruption.",
    businessImpact: "Client experienced a 340% increase in survey completion rates, a 45% reduction in latency for LLM-generated replies, and captured double the depth of qualitative feedback compared to standard form builders.",
    challenges: "Synchronizing state and styling for mixed bidirectional text (Arabic and English) without breaking UI layout alignment. This was resolved by building a custom context provider in Next.js that parses character blocks and dynamically updates document directionality in the DOM.",
    keyFeatures: [
      "Dynamic multi-LLM routing with auto-failover protection",
      "Real-time bidirectional RTL/LTR rendering support",
      "Qualitative feedback extraction with custom NLP processing",
      "Live response dashboard built with real-time Socket.IO pipelines"
    ],
    technologies: [
      { name: "Next.js", color: "#FFFFFF" },
      { name: "Node.js", color: "#68A063" },
      { name: "Socket.IO", color: "#00F0FF" },
      { name: "PostgreSQL", color: "#336791" },
      { name: "Cognitive AI", color: "#3B82F6" }
    ],
    demoUrl: "https://cxisuite.com",
    duration: "Sep 2025 - Present",
    imageUrl: "/img/sawt-ai.webp"
  },
  "careai-crm": {
    slug: "careai-crm",
    projectName: "CareAI Healthcare CRM",
    role: "Senior Full Stack Engineer",
    clientType: "Healthcare SaaS Platform",
    impactMetric: "60%",
    impactLabel: "Workflow Bottlenecks Reduced",
    excerpt: "An intelligent healthcare CRM automating patient communications and appointment pipelines through real-time Socket.IO workflows and custom messaging templates.",
    problem: "Healthcare clinics operated with disjointed patient communication tools, leading to scheduling bottlenecks, high patient call volumes, and staff burnout. Manual follow-ups resulted in lost patient retention.",
    solution: "Built CareAI CRM, a unified clinic operating system featuring automated patient follow-ups, a drag-and-drop calendar scheduler, and instant real-time patient messaging. It leverages automated triggers to keep patient pipelines full.",
    myContribution: "Wrote the real-time event pipeline and notification engine. Integrated the Twilio SMS routing system and engineered HIPAA-compliant database models to secure sensitive personal data.",
    businessImpact: "Reduced scheduling administrative overhead by 60%, speeded up clinic-to-patient response rates by 4x, and freed up 15+ hours per week for medical reception teams.",
    challenges: "Managing real-time socket connections across multiple client dashboards without degrading server throughput. Resolved this by building a background Redis publisher/subscriber cluster to offload socket broadcasts.",
    keyFeatures: [
      "Real-time event notification pipeline with Socket.IO",
      "Drag-and-drop clinic scheduler with collision detection",
      "Automated clinical outreach and patient follow-up system",
      "HIPAA-compliant document storage and transmission"
    ],
    technologies: [
      { name: "React.js", color: "#61DAFB" },
      { name: "Node.js", color: "#68A063" },
      { name: "MongoDB", color: "#47A248" },
      { name: "Socket.IO", color: "#00F0FF" },
      { name: "Twilio API", color: "#CA4245" }
    ],
    demoUrl: "#",
    duration: "Sep 2025 - Present",
    imageUrl: "/img/careai-crm.webp"
  },
  "nasya-healthcare-saas": {
    slug: "nasya-healthcare-saas",
    projectName: "Nasya Medical Portal",
    role: "Solo Frontend Architect",
    clientType: "Clinical SaaS Infrastructure",
    impactMetric: "Series A",
    impactLabel: "Funding Secured with MVP",
    excerpt: "A comprehensive multi-role healthcare portal (Clinic, Doctor, Patient, and Admin) built from zero to launch in 5 months to secure Series A funding.",
    problem: "A clinical startup needed to launch a feature-rich healthcare management platform within a strict 5-month deadline. The system required highly specific workspaces for clinics, doctors, patients, and super admins while maintaining strict medical compliance.",
    solution: "Designed and built the entire frontend from scratch. Established a premium, responsive dashboard architecture, implemented 10+ core CRUD modules, secure patient scheduling systems, and interactive medical charts.",
    myContribution: "Created the role-based route guard and authentication wrapper, designed the unified UI components library to maintain consistency, and built dynamic clinical reporting dashboards.",
    businessImpact: "Shipped the complete MVP on time, enabling the startup to successfully secure their Series A investment round and onboard 15 clinics and 5,000+ active patients in month one.",
    challenges: "Allowing medical records to load instantly without exposing sensitive endpoints to other users. Solved by implementing client-side state encryption and JSON Web Token verification middleware across routes.",
    keyFeatures: [
      "Multi-role user authentication and protected workspaces",
      "Dynamic interactive charts and medical analytics",
      "Clinic appointment scheduling with automatic calendar sync",
      "Zero-dependency component library tailored to medical aesthetics"
    ],
    technologies: [
      { name: "React.js", color: "#61DAFB" },
      { name: "Node.js", color: "#68A063" },
      { name: "MongoDB", color: "#47A248" },
      { name: "REST APIs", color: "#22D3EE" }
    ],
    demoUrl: "https://www.nasyait.com/",
    duration: "Feb 2025 - Jul 2025",
    imageUrl: "/img/nasya.webp"
  },
  "breeze-saas": {
    slug: "breeze-saas",
    projectName: "Breeze E-Commerce Engine",
    role: "Lead Frontend Engineer",
    clientType: "High-Volume SaaS Product",
    impactMetric: "98/100",
    impactLabel: "Performance Score",
    excerpt: "A high-performance Next.js migration of Breeze SaaS, utilizing Static Site Generation (SSG) and GraphQL dynamic querying to optimize core web vitals.",
    problem: "The client's primary product, Breeze, suffered from high bounce rates due to slow load times (Lighthouse scores below 55) and weak SEO ranking, which limited user conversions.",
    solution: "Migrated the application from a legacy Single-Page App (SPA) to a hybrid SSR/SSG Next.js architecture, caching static content at the edge and fetching structured data using GraphQL CMS.",
    myContribution: "Lead the frontend rewrite. Configured the dynamic routing structures, authored the GraphQL query abstraction layer, and engineered premium transition animations using Framer Motion.",
    businessImpact: "Lighthouse performance scores reached a perfect 98. Search engine impressions grew by 28%, and sign-up conversions improved by 14% due to the instantaneous page transitions.",
    challenges: "Pre-rendering thousands of dynamic content pages without running out of server memory during deployment. Resolved by configuring Incremental Static Regeneration (ISR) to compile routes on-demand.",
    keyFeatures: [
      "Hybrid Next.js pre-rendering (SSR and SSG)",
      "Headless GraphQL data fetcher with custom query caching",
      "Dynamic image optimization and lazy-loading schemes",
      "Micro-animations with Framer Motion for premium navigation"
    ],
    technologies: [
      { name: "Next.js", color: "#FFFFFF" },
      { name: "TypeScript", color: "#3178C6" },
      { name: "GraphQL", color: "#E10098" },
      { name: "Sanity.io", color: "#F03E2F" }
    ],
    demoUrl: "https://www.scube.co/",
    duration: "Jan 2022 - Feb 2024",
    imageUrl: "/img/breeze.webp"
  }
};

export function getCaseStudyBySlug(slug: string, sanityFallback?: any): CaseStudy {
  const normSlug = slug ? slug.toLowerCase().trim() : "";
  let matchedKey = "";
  if (normSlug.includes("sawt")) matchedKey = "sawt-ai";
  else if (normSlug.includes("careai") || normSlug.includes("crm")) matchedKey = "careai-crm";
  else if (normSlug.includes("nasya") || normSlug.includes("healthcare") || normSlug.includes("portal") || normSlug.includes("medical")) matchedKey = "nasya-healthcare-saas";
  else if (normSlug.includes("breeze") || normSlug.includes("scube")) matchedKey = "breeze-saas";
  
  if (matchedKey && caseStudies[matchedKey]) {
    const local = caseStudies[matchedKey];
    return {
      ...local,
      imageUrl: sanityFallback?.BackgroundImage?.asset?.url || local.imageUrl,
      demoUrl: sanityFallback?.demoLink?.current || local.demoUrl,
      githubUrl: sanityFallback?.gitHubLink?.current || local.githubUrl,
    };
  }

  // General fallback mapping if it doesn't match any of the above
  return {
    slug: slug || "custom-project",
    projectName: sanityFallback?.projectName || "Custom SaaS Product",
    role: "Full Stack Developer",
    clientType: "SaaS & AI Client",
    impactMetric: "100%",
    impactLabel: "Success Rate",
    excerpt: sanityFallback?.excerpt?.[0]?.children?.[0]?.text || "Scalable digital platform built for speed and reliability.",
    problem: "A high-performance digital pipeline was required to streamline user interaction, securely handle client requests, and automate backend workflows.",
    solution: "We developed a custom web application featuring highly optimized server routes, clean responsive design patterns, and deep database structures.",
    myContribution: "Wrote core frontend views and built REST/GraphQL endpoints to handle high-concurrency client data requests.",
    businessImpact: "Improved data processing speeds and user interaction times by over 40%, delivering a reliable client interface.",
    challenges: "Handling real-time state synchronization across user components without causing memory leaks. Solved by structuring layout hooks to cleanly unsubscribe listeners.",
    keyFeatures: [
      "Dynamic responsive component workflows",
      "Scalable database configuration & API optimization",
      "Clean visual interface matching modern standards",
    ],
    technologies: (sanityFallback?.techStack || []).map((t: string) => ({ name: t, color: "#3B82F6" })),
    demoUrl: sanityFallback?.demoLink?.current || "#",
    githubUrl: sanityFallback?.gitHubLink?.current || "#",
    imageUrl: sanityFallback?.BackgroundImage?.asset?.url || "/img/custom-project.webp",
    duration: "2025"
  };
}

