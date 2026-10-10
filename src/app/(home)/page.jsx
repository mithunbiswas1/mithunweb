// src/app/(home)/page.jsx

import Hero from "./_components/Hero";
import Clients from "./_components/Clients";
import Projects from "./_components/Projects";
import Services from "./_components/Services";
import MetricsAndFounder from "./_components/MetricsAndFounder";
import FAQ from "./_components/FAQ";
import Blog from "./_components/Blog";
import Contact from "./_components/Contact";
import { FAQS } from "./_data/home-data";

export const metadata = {
  title: "Mithun Web | Design Excellence, Websites, SaaS & Applications",
  description:
    "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands seeking design excellence and modern technology.",
  alternates: {
    canonical: "https://mithunweb.vercel.app",
  },
  openGraph: {
    title: "Mithun Web | Design Excellence, Websites, SaaS & Applications",
    description:
      "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands seeking design excellence and modern technology.",
    url: "https://mithunweb.vercel.app",
    siteName: "Mithun Web",
    images: [
      {
        url: "/images/projects/followhr-project.webp",
        width: 1200,
        height: 630,
        alt: "Mithun Web - Design and development of digital products",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mithun Web | Design Excellence, Websites, SaaS & Applications",
    description:
      "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications for forward-thinking brands.",
    images: ["/images/projects/followhr-project.webp"],
  },
};

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": "https://mithunweb.vercel.app/#website",
        url: "https://mithunweb.vercel.app",
        name: "Mithun Web",
        description: "Design and development of digital products",
        publisher: {
          "@id": "https://mithunweb.vercel.app/#organization",
        },
      },
      {
        "@type": "Organization",
        "@id": "https://mithunweb.vercel.app/#organization",
        name: "Mithun Web",
        url: "https://mithunweb.vercel.app",
        logo: "https://mithunweb.vercel.app/images/projects/followhr-project.webp",
        description:
          "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications.",
      },
      {
        "@type": "WebPage",
        "@id": "https://mithunweb.vercel.app/#webpage",
        url: "https://mithunweb.vercel.app",
        name: "Mithun Web | Design Excellence, Websites, SaaS & Applications",
        about: { "@id": "https://mithunweb.vercel.app/#organization" },
        isPartOf: { "@id": "https://mithunweb.vercel.app/#website" },
        inLanguage: "en-US",
      },
      {
        "@type": "FAQPage",
        mainEntity: FAQS.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      },
    ],
  };

  return (
    <main className="bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <Clients />
      <Services />
      <Projects />
      <MetricsAndFounder />
      <FAQ />
      <Blog />
      <Contact />
    </main>
  );
}
