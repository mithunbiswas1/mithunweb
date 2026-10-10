// src/app/(pages)/projects/[slug]/_components/CaseStudyDetailView.jsx

"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import ProjectCard from "@/components/shared/ProjectCard";
import Contact from "@/app/(home)/_components/Contact";

export default function CaseStudyDetailView({ project, moreProjects = [] }) {
  // Filter out the currently active project for "See also"
  const filteredMoreProjects = moreProjects.filter((p) => p.id !== project.id);

  return (
    <div>
      {/* Top Case Study Section: Left Sticky Sidebar + Right Rich Case Study Story */}
      <section
        id="case-study-hero"
        data-theme="light"
        className="pt-36 sm:pt-44 pb-24 sm:pb-32 bg-[#ffffff] text-black"
      >
        <div className="max-w-[1400px] mx-auto w-[90%]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Column: Clean Sticky Project Details (lg:sticky lg:top-36) */}
            <div className="lg:col-span-4 lg:sticky lg:top-36 self-start space-y-8">
              {/* Project Title & Subtitle */}
              <div>
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 block mb-2">
                  CASE STUDY &bull; {project.year || "2026"}
                </span>
                <h1 className="text-4xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-neutral-950 leading-[1.06]">
                  {project.title}
                </h1>
                {project.subtitle && (
                  <p className="text-base sm:text-lg font-light text-neutral-600 mt-3 leading-relaxed">
                    {project.subtitle}
                  </p>
                )}
              </div>

              {/* Client & Year Grid */}
              <div className="grid grid-cols-2 gap-4 pb-6 border-b border-neutral-200">
                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Client
                  </div>
                  <div className="text-sm sm:text-base font-medium text-neutral-900">
                    {project.client || project.title}
                  </div>
                </div>

                <div>
                  <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                    Year
                  </div>
                  <div className="text-sm sm:text-base font-medium text-neutral-900">
                    {project.year || "2026"}
                  </div>
                </div>

                {project.timeline && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Timeline
                    </div>
                    <div className="text-sm sm:text-base font-medium text-neutral-900">
                      {project.timeline}
                    </div>
                  </div>
                )}

                {project.role && (
                  <div>
                    <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1">
                      Role
                    </div>
                    <div className="text-sm sm:text-base font-medium text-neutral-900">
                      {project.role}
                    </div>
                  </div>
                )}
              </div>

              {/* Project Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="mono" size="sm" rounded="md">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Live Site Link */}
              {project.liveUrl && (
                <div className="pt-2">
                  <Button
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                    size="md"
                    rounded="full"
                    className="gap-2 font-mono text-xs uppercase"
                  >
                    <span>Visit live website</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Right Column: Rich Case Study Content & Curated Visuals */}
            <div className="lg:col-span-8 space-y-16 sm:space-y-24">
              {/* 1. Featured Primary Video or Hero Mockup */}
              {project.video ? (
                <div className="relative w-full aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-200/80 shadow-md">
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    controls
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : (
                <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
                  <img
                    src={project.desktopImage || project.image}
                    alt={`${project.title} Featured Showcase`}
                    className="w-full h-auto object-cover select-none"
                    loading="eager"
                  />
                </div>
              )}

              {/* 2. Key Impact & Performance Metrics Strip */}
              {project.stats && project.stats.length > 0 && (
                <div className="p-8 sm:p-10 rounded-3xl bg-neutral-50 border border-neutral-200/80">
                  <div className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 mb-6">
                    KEY PERFORMANCE &amp; IMPACT
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8">
                    {project.stats.map((stat, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950">
                          {stat.value}
                        </div>
                        <div className="text-xs font-mono uppercase tracking-wider text-neutral-500">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. The Executive Overview & Context */}
              {project.overview && (
                <div className="space-y-4">
                  <span className="text-xs font-mono uppercase tracking-[0.2em] text-neutral-400">
                    EXECUTIVE SUMMARY
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                    The Vision &amp; Context
                  </h2>
                  <div className="text-base sm:text-lg font-light text-neutral-700 leading-relaxed space-y-4 whitespace-pre-line pt-2">
                    {project.overview}
                  </div>
                </div>
              )}

              {/* 4. The Challenge & The Solution Dual Breakdown */}
              {(project.challenge || project.solution) && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* The Challenge */}
                  {project.challenge && (
                    <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-rose-50 text-rose-600 border border-rose-200/60 mb-5">
                          01 / The Challenge
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">
                          Identifying the Friction Points
                        </h3>
                        <div className="text-sm sm:text-base font-light text-neutral-600 leading-relaxed whitespace-pre-line">
                          {project.challenge}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* The Solution */}
                  {project.solution && (
                    <div className="p-8 rounded-3xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between">
                      <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-wider bg-emerald-50 text-emerald-600 border border-emerald-200/60 mb-5">
                          02 / The Solution
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-neutral-950 mb-3">
                          Architecting the Experience
                        </h3>
                        <div className="text-sm sm:text-base font-light text-neutral-600 leading-relaxed whitespace-pre-line mb-6">
                          {project.solution}
                        </div>
                      </div>

                      {/* Deliverables */}
                      {project.deliverables && project.deliverables.length > 0 && (
                        <div className="pt-6 border-t border-neutral-200/60">
                          <div className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-3">
                            Key Deliverables
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {project.deliverables.map((item, idx) => (
                              <Badge key={idx} variant="mono" size="sm" rounded="md">
                                {item}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 5. Desktop Web Section View */}
              {project.desktopImage && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Desktop Interface
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-0.5">
                        Web Section &amp; Architecture View
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">1440px Browser Viewport</span>
                  </div>
                  <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-500">
                    <img
                      src={project.desktopImage}
                      alt={`${project.title} Desktop Web View`}
                      className="w-full h-auto object-cover select-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 6. Laptop Workstation View */}
              {project.laptopImage && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Laptop Workstation
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-0.5">
                        MacBook Pro Responsive Ergonomics
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">Retina Display Scaling</span>
                  </div>
                  <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-500">
                    <img
                      src={project.laptopImage}
                      alt={`${project.title} Laptop View`}
                      className="w-full h-auto object-cover select-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 7. Mobile Responsive View */}
              {project.mobileImage && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Mobile Experience
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-0.5">
                        Smartphone Touch &amp; Adaptive View
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">iOS / Android Responsive</span>
                  </div>
                  <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-500">
                    <img
                      src={project.mobileImage}
                      alt={`${project.title} Mobile Responsive View`}
                      className="w-full h-auto object-cover select-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* 8. Flagship Dual-Device Showcase */}
              {project.image && project.image !== project.desktopImage && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                    <div>
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                        Flagship Showcase
                      </span>
                      <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-0.5">
                        Integrated Cross-Platform Ecosystem
                      </h3>
                    </div>
                    <span className="text-xs font-mono text-neutral-500">Multi-Device Synthesis</span>
                  </div>
                  <div className="relative w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs hover:shadow-2xl transition-all duration-500">
                    <img
                      src={project.image}
                      alt={`${project.title} Flagship Showcase`}
                      className="w-full h-auto object-cover select-none"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: "MORE PROJECTS / See also" using ProjectCard (excluding current project) */}
      {filteredMoreProjects && filteredMoreProjects.length > 0 && (
        <section
          id="more-projects"
          data-theme="light"
          className="py-24 sm:py-32 px-4 sm:px-6 relative border-t border-neutral-200 bg-white"
        >
          <div className="max-w-[1400px] mx-auto w-[90%]">
            {/* Section Header */}
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-12 sm:pb-16 border-b border-neutral-200">
              <div>
                <div className="text-xs font-mono tracking-widest text-neutral-400 uppercase mb-3">
                  MORE PROJECTS
                </div>
                <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950">
                  See also
                </h2>
              </div>

              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-600 hover:text-black uppercase group transition-colors"
              >
                <span>View all projects</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>

            {/* 2-column Grid using ProjectCard */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14 pt-12">
              {filteredMoreProjects.slice(0, 4).map((item) => (
                <ProjectCard key={item.id} project={item} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Section 3: Contact Form Section */}
      <Contact />
    </div>
  );
}
