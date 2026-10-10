// src/app/(home)/_data/home-data.js

export const NAV_LINKS = [
  { label: "clients", href: "/#clients" },
  { label: "projects", href: "/projects" },
  { label: "services", href: "/#services" },
  { label: "about", href: "/#about" },
  { label: "blog", href: "/blog" },
];

export const HERO_CARDS = [
  {
    id: 1,
    image: "/images/hero/followhr-hero.webp",
    alt: "Follow HR - AI Recruitment Platform",
    rotate: -42,
    zIndex: 50,
  },
  {
    id: 2,
    image: "/images/hero/followhr-app-hero.webp",
    alt: "Follow HR App - Recruitment Dashboard",
    rotate: -30,
    zIndex: 100,
  },
  {
    id: 3,
    image: "/images/hero/followhr-jobs-hero.webp",
    alt: "Follow HR Jobs - AI Job Search",
    rotate: -18,
    zIndex: 150,
  },
  {
    id: 4,
    image: "/images/hero/meragadi-hero.webp",
    alt: "MeraGadi - Auto Marketplace & Vehicle Discovery",
    rotate: -6,
    zIndex: 200,
  },
  {
    id: 5,
    image: "/images/hero/xengo-hero.webp",
    alt: "Xengo Mart - Streetwear & Urban Apparel",
    rotate: 6,
    zIndex: 250,
  },
  {
    id: 6,
    image: "/images/hero/western-loom-hero.webp",
    alt: "Western Loom - Luxury Handcrafted Leather",
    rotate: 18,
    zIndex: 300,
  },
  {
    id: 7,
    image: "/images/hero/crostini-hero.webp",
    alt: "Crostini - Restaurant & Culinary Experience",
    rotate: 30,
    zIndex: 350,
  },
  {
    id: 8,
    image: "/images/hero/edcl-hero.webp",
    alt: "EDCL - Exclusive Distribution E-Commerce",
    rotate: 42,
    zIndex: 400,
  },
];

export const PROJECTS = [
  {
    "id": "follow-hr",
    "title": "Follow HR",
    "tags": [
      "AI Platform",
      "Website",
      "Next.js",
      "Recruitment"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/follow-hr-macbook.webp",
    "hoverImage": "/project_image/follow-hr-laptop-mobile.webp",
    "desktopImage": "/images/projects/follow-hr-desktop.webp",
    "laptopImage": "/project_image/follow-hr-macbook.webp",
    "mobileImage": "/project_image/follow-hr-laptop-mobile.webp",
    "images": [
      "/images/projects/follow-hr-desktop.webp",
      "/images/projects/follow-hr-laptop.webp",
      "/images/projects/follow-hr-mobile.webp",
      "/images/projects/follow-hr-project.webp"
    ],
    "video": null
  },
  {
    "id": "follow-hr-app",
    "title": "Follow HR App",
    "tags": [
      "SaaS Dashboard",
      "Web App",
      "UI/UX",
      "Analytics"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/follow-hr-app-macbook.webp",
    "hoverImage": "/project_image/follow-hr-app-laptop-mobile.webp",
    "desktopImage": "/images/projects/follow-hr-app-desktop.webp",
    "laptopImage": "/project_image/follow-hr-app-macbook.webp",
    "mobileImage": "/project_image/follow-hr-app-laptop-mobile.webp",
    "images": [
      "/images/projects/follow-hr-app-desktop.webp",
      "/images/projects/follow-hr-app-laptop.webp",
      "/images/projects/follow-hr-app-mobile.webp",
      "/images/projects/follow-hr-app-project.webp"
    ],
    "video": null
  },
  {
    "id": "follow-hr-jobs",
    "title": "Follow HR Jobs",
    "tags": [
      "AI Job Portal",
      "Marketplace",
      "Next.js",
      "Web App"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/follow-hr-jobs-macbook.webp",
    "hoverImage": "/project_image/follow-hr-jobs-laptop-mobile.webp",
    "desktopImage": "/images/projects/follow-hr-jobs-desktop.webp",
    "laptopImage": "/project_image/follow-hr-jobs-macbook.webp",
    "mobileImage": "/project_image/follow-hr-jobs-laptop-mobile.webp",
    "images": [
      "/images/projects/follow-hr-jobs-desktop.webp",
      "/images/projects/follow-hr-jobs-laptop.webp",
      "/images/projects/follow-hr-jobs-mobile.webp",
      "/images/projects/follow-hr-jobs-project.webp"
    ],
    "video": null
  },
  {
    "id": "western-loom",
    "title": "Western Loom",
    "tags": [
      "Luxury Fashion",
      "E-Commerce",
      "Next.js",
      "Brand Identity"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/western-loom-macbook.webp",
    "hoverImage": "/project_image/western-loom-laptop-mobile.webp",
    "desktopImage": "/images/projects/western-loom-desktop.webp",
    "laptopImage": "/project_image/western-loom-macbook.webp",
    "mobileImage": "/project_image/western-loom-laptop-mobile.webp",
    "images": [
      "/images/projects/western-loom-desktop.webp",
      "/images/projects/western-loom-laptop.webp",
      "/images/projects/western-loom-mobile.webp",
      "/images/projects/western-loom-project.webp"
    ],
    "video": null
  },
  {
    "id": "crostini",
    "title": "Crostini",
    "tags": [
      "Restaurant",
      "Mobile-First",
      "Web App",
      "Culinary"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/crostini-macbook.webp",
    "hoverImage": "/project_image/crostini-laptop-mobile.webp",
    "desktopImage": "/images/projects/crostini-desktop.webp",
    "laptopImage": "/project_image/crostini-macbook.webp",
    "mobileImage": "/project_image/crostini-laptop-mobile.webp",
    "images": [
      "/images/projects/crostini-desktop.webp",
      "/images/projects/crostini-laptop.webp",
      "/images/projects/crostini-mobile.webp",
      "/images/projects/crostini-project.webp"
    ],
    "video": null
  },
  {
    "id": "edcl",
    "title": "EDCL",
    "tags": [
      "E-Commerce",
      "Distribution",
      "Next.js",
      "Web App"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/edcl-macbook.webp",
    "hoverImage": "/project_image/edcl-laptop-mobile.webp",
    "desktopImage": "/images/projects/edcl-desktop.webp",
    "laptopImage": "/project_image/edcl-macbook.webp",
    "mobileImage": "/project_image/edcl-laptop-mobile.webp",
    "images": [
      "/images/projects/edcl-desktop.webp",
      "/images/projects/edcl-laptop.webp",
      "/images/projects/edcl-mobile.webp",
      "/images/projects/edcl-project.webp"
    ],
    "video": null
  },
  {
    "id": "xengo-mart",
    "title": "Xengo Mart",
    "tags": [
      "Streetwear",
      "E-Commerce",
      "Mobile-First",
      "Next.js"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/xengo-mart-macbook.webp",
    "hoverImage": "/project_image/xengo-mart-laptop-mobile.webp",
    "desktopImage": "/images/projects/xengo-mart-desktop.webp",
    "laptopImage": "/project_image/xengo-mart-macbook.webp",
    "mobileImage": "/project_image/xengo-mart-laptop-mobile.webp",
    "images": [
      "/images/projects/xengo-mart-desktop.webp",
      "/images/projects/xengo-mart-laptop.webp",
      "/images/projects/xengo-mart-mobile.webp",
      "/images/projects/xengo-mart-project.webp"
    ],
    "video": null
  },
  {
    "id": "meragadi",
    "title": "MeraGadi",
    "tags": [
      "Automotive",
      "Marketplace",
      "Next.js",
      "Web App"
    ],
    "colSpan": "col-span-1",
    "image": "/project_image/meragadi-macbook.webp",
    "hoverImage": "/project_image/meragadi-laptop-mobile.webp",
    "desktopImage": "/images/projects/meragadi-desktop.webp",
    "laptopImage": "/project_image/meragadi-macbook.webp",
    "mobileImage": "/project_image/meragadi-laptop-mobile.webp",
    "images": [
      "/images/projects/meragadi-desktop.webp",
      "/images/projects/meragadi-laptop.webp",
      "/images/projects/meragadi-mobile.webp",
      "/images/projects/meragadi-project.webp"
    ],
    "video": null
  }
];

export const SERVICES = [
  {
    number: "01",
    title: "Product Strategy & Design",
    description: "We define product priorities, roadmap key features, and architect the path from MVP to market leader.",
    video: "https://framerusercontent.com/assets/pxVHhGW0K6amRwUEQeabZJQ93U.mp4",
  },
  {
    number: "02",
    title: "Interface Design (UI/UX)",
    description: "We craft intuitive, user-centered digital interfaces and software experiences that drive high engagement.",
    video: "https://framerusercontent.com/assets/6TngZItYMgOV1ciEZj2fPYd0rGA.mp4",
  },
  {
    number: "03",
    title: "Software Development",
    description: "We engineer scalable full-stack software, APIs, and cloud architectures built for speed and stability.",
    video: "https://framerusercontent.com/assets/awNZsjrGSbJ4Apr0RyrWaQ8wLU.mp4",
  },
  {
    number: "04",
    title: "Web Application Development",
    description: "We build bespoke, ultra-fast web applications and SaaS platforms powered by modern web technologies.",
    video: "https://framerusercontent.com/assets/bRbG2FcQB9V1eZUv44eVXm6WXA.mp4",
  },
  {
    number: "05",
    title: "Apps Development",
    description: "We design and develop high-performance cross-platform mobile and desktop apps with native fluid feel.",
    video: "https://framerusercontent.com/assets/fPJ3kuu119zPmxe3ZGMFKdgqeY.mp4",
  },
  {
    number: "06",
    title: "AI & Web Automation",
    description: "We streamline complex business workflows, integrate AI agents, and build automated systems that scale.",
    video: "https://framerusercontent.com/assets/ZcZ1tmIyyqOiWgrsvI67MZYzb8.mp4",
  },
];

export const METRICS = [
  { value: "+200", label: "Businesses Transformed" },
  { value: "+50", label: "Framer ™ Projects" },
  { value: "+6", label: "Years of Excellence" },
  { value: "#1 Studio", label: "Top Framer Expert PRO Studio" },
];

export const FOUNDER = {
  quote: "To deliver a disruptive project, it is essential to have design that breaks through the ordinary — and that is what we guarantee.",
  name: "Mithun Biswas",
  role: "Founder & Creative Director, Mithun Web",
  photo: "/images/blog/5KmJL4BaxcMrUFM3FUWLMKMZyU.png",
  background: "/images/projects/followhr-project.webp"
};

export const FAQS = [
  {
    question: "How do you define the timeline for a project?",
    answer: "The timeline is established once we assess the scope of the project, required features, and milestones involved. Before starting, we map out the complete workflow and deliver a clear schedule with key deliverables and target dates for each phase."
  },
  {
    question: "Can Mithun Web handle just a specific phase?",
    answer: "Yes. We can manage your project end-to-end or jump in for a specific phase based on your immediate needs — whether that's strategy, UI/UX design, custom development, launch support, or product scaling."
  },
  {
    question: "Who will be working on my project?",
    answer: "Each project is matched with dedicated specialists tailored to your industry and requirements. You'll communicate directly with the team executing the work, avoiding unnecessary handoffs between account managers and creators."
  },
  {
    question: "Do I need a fully structured project before reaching out?",
    answer: "Not at all. You can come to us with just an idea, a problem to solve, or an early-stage concept. Part of our role is organizing requirements and turning loose concepts into an actionable, high-impact product roadmap."
  },
  {
    question: "How does pricing and quotation work?",
    answer: "First, we clarify your objectives, technical scope, and project scale. Then, we provide a transparent proposal detailing the scope, milestones, timeline, and investment so you know exactly what is included before kickoff."
  },
  {
    question: "Does Mithun Web offer support and maintenance after launch?",
    answer: "Yes. A project doesn't have to end at deployment. We offer ongoing support, post-launch optimizations, new feature additions, and continuous design evolution as your business scales."
  },
  {
    question: "Do you work on existing products already live in production?",
    answer: "Absolutely. You don't have to start from scratch. We frequently partner on live products to modernize UI/UX, optimize workflows, resolve usability issues, add features, and re-engineer legacy experiences."
  },
  {
    question: "Is it possible to deliver on an expedited timeline?",
    answer: "In many cases, yes. We evaluate project scope and priorities to determine feasibility. When tight deadlines exist, we establish an accelerated sprint plan without ever compromising design excellence."
  },
  {
    question: "How does communication work during the project?",
    answer: "We maintain close, collaborative communication throughout the process, particularly during design reviews, milestone demos, and approvals. You stay fully informed on progress without having to micromanage daily tasks."
  },
  {
    question: "Do I own the source code and design files after delivery?",
    answer: "Yes. Upon project completion and handover, you receive complete ownership of all design files, production code, assets, and documentation. You maintain full independence with zero vendor lock-in."
  }
];

export { BLOG_POSTS, getBlogPostBySlug } from "@/app/(pages)/blog/_data/blog-data";

export const SERVICE_OPTIONS = [
  "Website",
  "Landing Page",
  "Web Application",
  "Mobile App",
  "SaaS Platform",
  "Blog",
  "Design System",
  "Consulting",
  "Custom UI/UX",
  "Monthly Retainer",
  "Dedicated Sprints"
];

export const BUDGET_OPTIONS = [
  "Under $5,000",
  "$5,000 to $15,000",
  "$15,000+"
];
