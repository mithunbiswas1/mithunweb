// src/app/(pages)/projects/[slug]/page.jsx

import { notFound } from "next/navigation";
import { PROJECTS, getProjectBySlug, getAllProjectSlugs } from "../_data/projects-data";
import CaseStudyDetailView from "./_components/CaseStudyDetailView";

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Case Study Not Found | Mithun Web",
    };
  }

  const title = project.metaTitle || `${project.title} — Case Study | Mithun Web`;
  const description = project.metaDescription || project.subtitle || project.overview;

  return {
    title,
    description,
    keywords: [
      project.title,
      `${project.title} Case Study`,
      "Mithun Web",
      "UI/UX Design",
      "Product Design",
      "Next.js Development",
      ...(project.tags || []),
    ],
    alternates: {
      canonical: `https://mithunweb.vercel.app/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://mithunweb.vercel.app/projects/${slug}`,
      images: project.image ? [{ url: project.image, width: 1200, height: 630, alt: project.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: project.image ? [project.image] : [],
    },
  };
}

export default async function ProjectCaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const moreProjects = PROJECTS.filter((p) => p.id !== project.id).slice(0, 6);

  // JSON-LD Structured Data for Rich Snippets & Search Engines
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.subtitle,
    description: project.metaDescription || project.subtitle,
    image: project.image ? `https://mithunweb.vercel.app${project.image}` : undefined,
    author: {
      "@type": "Organization",
      name: "Mithun Web",
      url: "https://mithunweb.vercel.app",
    },
    creator: {
      "@type": "Person",
      name: "Mithun Biswas",
    },
    datePublished: "2026-01-01",
    url: `https://mithunweb.vercel.app/projects/${slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CaseStudyDetailView project={project} moreProjects={moreProjects} />
    </>
  );
}
