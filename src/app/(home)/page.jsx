import Navbar from "./_components/Navbar";
import Hero from "./_components/Hero";
import Clients from "./_components/Clients";
import Projects from "./_components/Projects";
import Services from "./_components/Services";
import MetricsAndFounder from "./_components/MetricsAndFounder";
import FAQ from "./_components/FAQ";
import Blog from "./_components/Blog";
import Contact from "./_components/Contact";
import Footer from "./_components/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://mithunweb.vercel.app/#webpage",
        "url": "https://mithunweb.vercel.app",
        "name": "Mithun Web | Design Excellence, Websites, SaaS & Applications",
        "about": { "@id": "https://mithunweb.vercel.app/#organization" },
        "inLanguage": "en-US"
      },
      {
        "@type": "Organization",
        "@id": "https://mithunweb.vercel.app/#organization",
        "name": "Mithun Web",
        "url": "https://mithunweb.vercel.app",
        "logo": "/images/projects/followhr-project.webp",
        "description": "Custom Framer websites, SaaS platforms, bespoke systems, and mobile applications."
      }
    ]
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />
      <Hero />
      <Clients />
      <Projects />
      <Services />
      <MetricsAndFounder />
      <FAQ />
      <Blog />
      <Contact />
      <Footer />
    </main>
  );
}
