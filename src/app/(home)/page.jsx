import Navbar from "@/components/wama/Navbar";
import Hero from "@/components/wama/Hero";
import Clients from "@/components/wama/Clients";
import Projects from "@/components/wama/Projects";
import Services from "@/components/wama/Services";
import MetricsAndFounder from "@/components/wama/MetricsAndFounder";
import FAQ from "@/components/wama/FAQ";
import Blog from "@/components/wama/Blog";
import Contact from "@/components/wama/Contact";
import Footer from "@/components/wama/Footer";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": "https://wama.com.br/#webpage",
        "url": "https://wama.com.br",
        "name": "Wama | Agência de Design, Sites, SaaS e Aplicativos",
        "about": { "@id": "https://wama.com.br/#organization" },
        "inLanguage": "pt-BR"
      },
      {
        "@type": "Organization",
        "@id": "https://wama.com.br/#organization",
        "name": "Wama",
        "url": "https://wama.com.br",
        "logo": "https://framerusercontent.com/images/hxiEcAniRHQ0i8LJkuyQQyJc.png",
        "description": "Sites em Framer, SaaS, sistemas e aplicativos personalizados."
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
