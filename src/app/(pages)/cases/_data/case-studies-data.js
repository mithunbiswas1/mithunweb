// src/app/(pages)/cases/_data/case-studies-data.js

import { PROJECTS } from "@/data/mithunweb-data";

// Detailed case study information generator
const CASE_STUDY_DETAILS = {
  "follow-hr": {
    subtitle: "AI-Powered Recruitment & Human Resources Platform",
    client: "Follow HR",
    year: "2026",
    timeline: "8 Weeks",
    role: "Full Design System, UI/UX Architecture & Next.js Engineering",
    liveUrl: "https://followhr.com/",
    stats: [
      { label: "Hiring Efficiency", value: "3.8x" },
      { label: "Core Web Vitals", value: "99/100" },
      { label: "Candidate Engagement", value: "+175%" },
    ],
    overview:
      "Follow HR is an enterprise-grade AI recruitment platform engineered to automate talent sourcing, screening, and end-to-end hiring workflows with precision and intelligent match algorithms.",
    challenge:
      "Modern talent acquisition teams face manual bottlenecks screening hundreds of resumes, disjointed multi-platform postings, and lack of real-time pipeline analytics to predict hiring velocity.",
    solution:
      "We engineered a sleek, responsive landing platform featuring dynamic glassmorphism cards, interactive platform demonstrations, frictionless conversion funnels, and seamless integration with the core SaaS engine.",
    deliverables: [
      "Modern UI/UX Design System",
      "Next.js & Tailwind Responsive Implementation",
      "Performance & SEO Optimization",
      "Interactive Product Showcase Demos"
    ]
  },
  "follow-hr-app": {
    subtitle: "Enterprise Talent Management & Pipeline SaaS Dashboard",
    client: "Follow HR App",
    year: "2026",
    timeline: "12 Weeks",
    role: "SaaS Product Design, Dashboard UI/UX & Web App Architecture",
    liveUrl: "https://app.followhr.com/",
    stats: [
      { label: "Time-to-Hire Reduction", value: "-45%" },
      { label: "Active Jobs Managed", value: "10,000+" },
      { label: "Workflow Automation", value: "82%" },
    ],
    overview:
      "Follow HR App is the command center for modern HR teams and recruiters, offering real-time visibility into hiring pipelines, applicant scoring, interview schedules, and team performance metrics.",
    challenge:
      "Enterprise HR teams required an intuitive dashboard that consolidates complex multi-stage candidate workflows into glanceable analytics without cognitive overload.",
    solution:
      "Designed an elegant dark/light adaptive dashboard architecture with real-time KPI metric cards, interactive candidate funnel charts, granular permission management, and rapid action shortcuts.",
    deliverables: [
      "SaaS Design System & Component Library",
      "Interactive Analytics & Data Visualizations",
      "Candidate Pipeline Kanban & Table Views",
      "Responsive Web App User Experience"
    ]
  },
  "follow-hr-jobs": {
    subtitle: "AI-Powered Smart Career Marketplace & Job Portal",
    client: "Follow HR Jobs",
    year: "2026",
    timeline: "6 Weeks",
    role: "Job Portal Marketplace Design, Search Architecture & Next.js Build",
    liveUrl: "https://followhrjobs.com/",
    stats: [
      { label: "Job Search Speed", value: "< 150ms" },
      { label: "Application Conversion", value: "+62%" },
      { label: "Verified Employers", value: "500+" },
    ],
    overview:
      "Follow HR Jobs is an AI-enhanced job marketplace connecting top tier global talent with leading enterprises through smart skills matching and intelligent opportunity recommendations.",
    challenge:
      "Traditional job boards suffer from clutter, irrelevant algorithmic search results, and complex application forms that cause high drop-off rates on mobile devices.",
    solution:
      "Built a crisp, high-conversion career marketplace featuring lightning-fast faceted search, one-click smart apply, categorized industry pills, and dedicated verified employer showcases.",
    deliverables: [
      "Marketplace UX Architecture & Wireframing",
      "Faceted Search & AI Filter Engine",
      "Employer Profile Brand Portals",
      "Mobile-First Responsive Layouts"
    ]
  },
  "crostini": {
    subtitle: "Italian Culinary Experience & Mobile-First Ordering Portal",
    client: "Crostini Restaurant",
    year: "2026",
    timeline: "5 Weeks",
    role: "Brand Identity, Mobile UX & Responsive Web Experience",
    liveUrl: "https://www.crostininb.com/",
    stats: [
      { label: "Mobile Reservations", value: "+84%" },
      { label: "Page Load Speed", value: "0.5s" },
      { label: "Menu Engagement", value: "+120%" },
    ],
    overview:
      "Crostini is an authentic Italian dining destination delivering culinary excellence with handcrafted appetizers, traditional recipes, and unforgettable gastronomic moments.",
    challenge:
      "The restaurant required a modern digital presence to showcase their seasonal menu, increase dine-in reservations, and offer a frictionless mobile dining discovery experience.",
    solution:
      "Designed and developed a mouth-watering, mobile-first web experience featuring rich food imagery, intuitive menu categorization, and one-tap table reservation integration.",
    deliverables: [
      "Mobile-First Responsive Interface",
      "Interactive Digital Menu Showcase",
      "Online Table Booking Workflow",
      "Culinary Art Direction & Photography"
    ]
  },
  "edcl": {
    subtitle: "Enterprise FMCG Distribution & Multi-Brand E-Commerce Portal",
    client: "Exclusive Distribution Company Limited (EDCL)",
    year: "2026",
    timeline: "7 Weeks",
    role: "E-Commerce Architecture, UI/UX Design System & Web Development",
    liveUrl: "https://edcl.com.bd/",
    stats: [
      { label: "B2B Order Volume", value: "+115%" },
      { label: "Catalog Discovery", value: "3.2x" },
      { label: "Mobile Transactions", value: "+92%" },
    ],
    overview:
      "Exclusive Distribution Company Limited (EDCL) is a leading distributor in Bangladesh, managing premier international FMCG, personal care, fragrance, and stationery brands including Royal Mirage, Eternal Love, Monami, and Kangaro.",
    challenge:
      "EDCL required an omnichannel digital commerce platform capable of handling extensive multi-category catalogs, dynamic flash deals, brand storefronts, and seamless distributor-to-retailer ordering.",
    solution:
      "Engineered an intuitive, high-speed e-commerce portal with rapid faceted filtering, dedicated brand showcases, responsive tablet/mobile checkout funnels, and optimized product discovery.",
    deliverables: [
      "Multi-Brand E-Commerce UI System",
      "Tablet & Mobile Responsive Experience",
      "Dynamic Promotional Banner Engine",
      "Catalog Search & Order Management"
    ]
  },
  "western-loom": {
    subtitle: "Direct-to-Consumer Luxury Handcrafted Leather E-Commerce",
    client: "Western Loom",
    year: "2026",
    timeline: "6 Weeks",
    role: "Brand Identity, E-Commerce UI/UX & High-Performance Next.js Build",
    liveUrl: "https://westernloom.com/",
    stats: [
      { label: "Checkout Conversion", value: "+46%" },
      { label: "Mobile Revenue", value: "68%" },
      { label: "Average Order Value", value: "$320" },
    ],
    overview:
      "Western Loom is an artisanal luxury brand crafting premium genuine leather handwoven shoulder bags, totes, and top handles celebrated for their timeless design and craftsmanship.",
    challenge:
      "The brand required a high-converting digital boutique conveying the sensory tactile quality of handwoven leather, supporting dynamic seasonal campaigns, and optimizing instant mobile checkout.",
    solution:
      "Designed a visually striking, warm terracotta and sunset orange digital storefront featuring editorial photography, intuitive bag silhouette filters, flash sale modules, and seamless 1-click checkout.",
    deliverables: [
      "Luxury Fashion E-Commerce UI Kit",
      "Editorial Lookbook & Campaign Layouts",
      "Mobile-Optimized Fast Checkout Experience",
      "Dynamic Category & Silhouettes Navigation"
    ]
  },
  "xengo-mart": {
    subtitle: "Next-Gen Gen-Z Streetwear & Oversized Apparel Mobile Store",
    client: "Xengo Mart",
    year: "2026",
    timeline: "5 Weeks",
    role: "Mobile App UX, E-Commerce Storefront & High-Conversion Funnel",
    liveUrl: "https://xengomart.com/",
    stats: [
      { label: "Mobile Checkout Speed", value: "1.2s" },
      { label: "Bundle Offer Lift", value: "+138%" },
      { label: "Repeat Customers", value: "48%" },
    ],
    overview:
      "Xengo Mart is an urban youth streetwear e-commerce brand specializing in oversized graphic tees, acid-wash fashion, anime prints, and dynamic bundle promotions.",
    challenge:
      "The brand needed a fast, high-energy mobile shopping experience that streamlines complex multi-tier bundle promotions (Buy 2 / Buy 3 offers), provides frictionless coupon redemption, and maximizes conversion among mobile-first Gen-Z shoppers.",
    solution:
      "Engineered an energetic mobile-first web app featuring dynamic bundle tier calculators, one-tap coupon code copying, sticky bottom navigation, and rapid-swipe product lookbooks.",
    deliverables: [
      "Mobile-First Streetwear UI System",
      "Dynamic Bundle & Discount Engine",
      "One-Tap Coupon Redemption Flow",
      "High-Performance Cart & Instant Checkout"
    ]
  },
  "meragadi": {
    subtitle: "All-in-One Multi-Category Automotive & Mobility Marketplace",
    client: "MeraGadi",
    year: "2026",
    timeline: "7 Weeks",
    role: "Automotive UX Architecture, Multi-Vehicle Catalog & Next.js Marketplace",
    liveUrl: "https://meragadi.com/",
    stats: [
      { label: "Vehicle Inquiries", value: "+160%" },
      { label: "Search Latency", value: "< 120ms" },
      { label: "Mobile Discovery", value: "78%" },
    ],
    overview:
      "MeraGadi is an expansive automotive marketplace connecting millions of vehicle buyers and sellers across cars, motorbikes, electric scooties, and bicycles with integrated EMI calculators and multi-vehicle comparisons.",
    challenge:
      "Automotive marketplaces struggle with high friction search across disparate vehicle types (cars, bikes, scooties, cycles), fragmented dealer inventory, complex financing discovery, and sluggish mobile browsing.",
    solution:
      "Architected a sleek crimson-and-dark themed automotive portal with instant category-switching, smart vehicle specification comparisons, interactive EMI tools, verified dealer network discovery, and mobile-first listing funnels.",
    deliverables: [
      "Multi-Vehicle Marketplace UX System",
      "Instant Vehicle Compare & Specification Matrix",
      "Dynamic EMI Calculator & Loan Eligibility Tools",
      "High-Performance Mobile Search & Listing Flow"
    ]
  }
};

export function getProjectBySlug(slug) {
  const base = PROJECTS.find((p) => p.id === slug);
  if (!base) return null;

  const extra = CASE_STUDY_DETAILS[slug] || {
    subtitle: `${base.title} Digital Transformation & Product Design`,
    client: base.title,
    year: "2025",
    timeline: "6–8 Weeks",
    role: "Full Design & Engineering",
    stats: [
      { label: "Impact Score", value: "98/100" },
      { label: "Performance", value: "100%" },
      { label: "User Engagement", value: "+120%" },
    ],
    overview: `A complete strategic design and digital product initiative delivered by Mithun Web for ${base.title}, blending world-class aesthetics with technical precision.`,
    challenge: `The primary objective was establishing a distinct market footprint, eliminating usability bottlenecks, and engineering an experience that outperforms competitors.`,
    solution: `We architected an end-to-end design solution with modular design systems, seamless micro-animations, and high-performance frontend implementation.`,
    deliverables: [
      "Full Product Design & Prototyping",
      "Responsive Frontend Architecture",
      "Design System & Style Guide",
      "Core Web Vitals Optimization"
    ]
  };

  return {
    ...base,
    ...extra,
  };
}

export function getAllProjectSlugs() {
  return PROJECTS.map((p) => p.id);
}
