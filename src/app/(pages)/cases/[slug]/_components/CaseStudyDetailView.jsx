// src/app/(pages)/cases/[slug]/_components/CaseStudyDetailView.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Contact from "@/app/(home)/_components/Contact";

export default function CaseStudyDetailView({ project, moreProjects }) {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("all");

  // Combine images
  const imagesList =
    project.images && project.images.length > 0
      ? project.images
      : project.image
      ? [project.image]
      : [];

  return (
    <div>
        {/* Top Case Study Section: Sticky Info + Stacked Visuals */}
        <section
          id="case-study-hero"
          data-theme="light"
          className="pt-36 sm:pt-44 pb-24 sm:pb-32 bg-[#ffffff] text-black"
        >
          <div className="max-w-[1400px] mx-auto w-[90%]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
              {/* Left Column: Sticky Project Details */}
              <div className="lg:col-span-4 lg:sticky lg:top-36 self-start space-y-8">
                {/* Project Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-neutral-950 leading-[1.06]">
                  {project.title}
                </h1>

                {/* Client & Year Grid */}
                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-neutral-200">
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
                      {project.year || "2024"}
                    </div>
                  </div>
                </div>

                {/* Project Tags using reusable Badge */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="mono" size="sm" rounded="md">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {/* Narrative Description */}
                <div className="text-sm sm:text-base font-light text-neutral-600 leading-relaxed space-y-4 pt-1">
                  <p>{project.overview || project.subtitle}</p>
                  {project.solution && <p>{project.solution}</p>}
                </div>

                {/* Live Site Link using reusable Button */}
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

              {/* Right Column: Stack of Curated Multi-Device Mockups */}
              <div className="lg:col-span-8 space-y-10 sm:space-y-14">
                {/* View Category Tabs */}
                <div className="flex flex-wrap items-center gap-2 p-1.5 bg-neutral-100/90 rounded-2xl border border-neutral-200/80">
                  {[
                    { id: "all", label: "All Views" },
                    { id: "desktop", label: "Desktop Web View", icon: "🖥️" },
                    { id: "laptop", label: "Laptop Workstation", icon: "💻" },
                    { id: "mobile", label: "Mobile Responsive", icon: "📱" },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveFilter(tab.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wide transition-all duration-200 ${
                        activeFilter === tab.id
                          ? "bg-white text-black font-semibold shadow-xs"
                          : "text-neutral-500 hover:text-black"
                      }`}
                    >
                      {tab.icon && <span>{tab.icon}</span>}
                      <span>{tab.label}</span>
                    </button>
                  ))}
                </div>

                {/* Featured Video if present */}
                {project.video && (
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
                )}

                {/* 1. Desktop Web Section View */}
                {(activeFilter === "all" || activeFilter === "desktop") && project.desktopImage && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          01 / Desktop Interface
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
                        loading="eager"
                      />
                    </div>
                  </div>
                )}

                {/* 2. Laptop View */}
                {(activeFilter === "all" || activeFilter === "laptop") && project.laptopImage && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          02 / Laptop Workstation
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

                {/* 3. Mobile View */}
                {(activeFilter === "all" || activeFilter === "mobile") && project.mobileImage && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          03 / Mobile-First Experience
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

                {/* 4. Flagship Dual-Device Showcase */}
                {activeFilter === "all" && project.image && (
                  <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-neutral-200 pb-3">
                      <div>
                        <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400">
                          04 / Flagship Showcase
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

        {/* Section 2: "See also" / "Veja também" (Dark Section) */}
        {moreProjects && moreProjects.length > 0 && (
          <section
            id="more-projects"
            data-theme="dark"
            className="bg-[#000000] text-white py-28 sm:py-36 px-4 sm:px-6 relative border-t border-neutral-900"
          >
            <div className="max-w-[1400px] mx-auto w-[90%]">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-14 sm:pb-20">
                <div>
                  <div className="text-xs font-mono tracking-widest text-[#cdff59] uppercase mb-3">
                    MORE PROJECTS
                  </div>
                  <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white">
                    See also
                  </h2>
                </div>

                <Link
                  href="/projects"
                  className="inline-flex items-center gap-2 text-xs font-mono tracking-wider text-neutral-400 hover:text-white uppercase group transition-colors"
                >
                  <span>View all projects</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>

              {/* 2-column Grid matching the screenshot */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14">
                {moreProjects.map((item) => {
                  const isHovered = hoveredProjectId === item.id;
                  const hasVideo = !!item.video;

                  return (
                    <Link
                      key={item.id}
                      href={`/cases/${item.id}`}
                      onMouseEnter={() => setHoveredProjectId(item.id)}
                      onMouseLeave={() => setHoveredProjectId(null)}
                      className="group flex flex-col cursor-pointer"
                    >
                      {/* Media Container */}
                      <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 shadow-xs transition-all duration-500 group-hover:shadow-2xl group-hover:border-white/20">
                        {item.image ? (
                          <img
                            src={item.image}
                            alt={item.title}
                            loading="lazy"
                            className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                              isHovered && hasVideo
                                ? "opacity-0"
                                : "opacity-100 scale-100 group-hover:scale-105"
                            }`}
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-tr from-neutral-900 to-neutral-800 flex items-center justify-center">
                            <span className="text-xl font-light text-neutral-400">{item.title}</span>
                          </div>
                        )}

                        {hasVideo && (
                          <video
                            src={item.video}
                            loop
                            muted
                            playsInline
                            autoPlay={isHovered}
                            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                              isHovered
                                ? "opacity-100 scale-105"
                                : "opacity-0 scale-100 pointer-events-none"
                            }`}
                          />
                        )}

                        {/* Top Floating Badge */}
                        <div className="absolute top-4 right-4 sm:top-5 sm:right-5 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>

                      {/* Info & Tags Bar */}
                      <div className="pt-5 sm:pt-6">
                        <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 mb-2">
                          {item.tags.map((tag) => (
                            <Badge
                              key={tag}
                              variant="dark"
                              size="sm"
                              rounded="md"
                              className="border-white/10"
                            >
                              {tag}
                            </Badge>
                          ))}
                        </div>

                        <h3 className="text-2xl sm:text-3xl font-normal text-white group-hover:text-neutral-300 transition-colors">
                          {item.title}
                        </h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}

        {/* Section 3: Contact Form Section (Dark Section) */}
        <Contact />
    </div>
  );
}
