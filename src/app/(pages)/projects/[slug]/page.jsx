// src/app/(pages)/projects/[slug]/page.jsx

import { notFound } from "next/navigation";
import { getProjectBySlug, getAllProjectSlugs } from "@/app/(pages)/cases/_data/case-studies-data";
import { PROJECTS } from "@/data/mithunweb-data";
import CaseStudyDetailView from "@/app/(pages)/cases/[slug]/_components/CaseStudyDetailView";

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

  return {
    title: `${project.title} — Case Study | Mithun Web`,
    description: project.overview || project.subtitle,
    alternates: {
      canonical: `https://mithunweb.vercel.app/projects/${slug}`,
    },
    openGraph: {
      title: `${project.title} — Case Study | Mithun Web`,
      description: project.overview || project.subtitle,
      images: project.image ? [{ url: project.image }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} — Case Study | Mithun Web`,
      description: project.overview || project.subtitle,
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

  return <CaseStudyDetailView project={project} moreProjects={moreProjects} />;
}
