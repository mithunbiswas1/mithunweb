"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/wama-data";
import { ArrowUpRight } from "lucide-react";

const FILTER_TAGS = ["Todos", "Framer", "Figma", "SaaS", "Aplicativo", "Site", "Branding"];

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  const filteredProjects = activeFilter === "Todos"
    ? PROJECTS
    : PROJECTS.filter((p) => p.tags.some(t => t.toLowerCase() === activeFilter.toLowerCase()));

  return (
    <section id="projetos" className="bg-[#ffffff] text-black py-24 sm:py-36 px-4 sm:px-6 relative">
      <div className="max-w-[1400px] mx-auto w-[92%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-12 sm:pb-16 border-b border-neutral-200">
          <div>
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase mb-4">
              PROJETOS
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight max-w-3xl text-neutral-950">
              Superando padrões. Não apenas expectativas.
            </h2>
          </div>

          {/* Filter Pill Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                className={`px-4 py-2 rounded-full text-xs font-medium tracking-wide transition-all duration-200 ${
                  activeFilter === tag
                    ? "bg-black text-white shadow-xs"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 pt-12 sm:pt-16">
          {filteredProjects.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            const hasVideo = !!project.video;

            return (
              <div
                key={project.id}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group flex flex-col cursor-pointer ${
                  project.colSpan.includes("lg:col-span-2") ? "lg:col-span-2" : "col-span-1"
                }`}
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs transition-all duration-500 group-hover:shadow-xl group-hover:border-neutral-300">
                  {/* Poster Image */}
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 ease-out ${
                        isHovered && hasVideo ? "opacity-0" : "opacity-100 scale-100 group-hover:scale-105"
                      }`}
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-neutral-900 to-neutral-800 flex items-center justify-center">
                      <span className="text-xl font-light text-neutral-400">{project.title}</span>
                    </div>
                  )}

                  {/* Video on Hover */}
                  {hasVideo && (
                    <video
                      src={project.video}
                      loop
                      muted
                      playsInline
                      autoPlay={isHovered}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                        isHovered ? "opacity-100 scale-105" : "opacity-0 scale-100 pointer-events-none"
                      }`}
                    />
                  )}

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Info & Tags Bar */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-5 sm:pt-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    <p className="text-sm text-neutral-500 mt-1 font-light">
                      {project.category}
                    </p>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-md text-[11px] font-mono tracking-wide text-neutral-700 bg-neutral-100 border border-neutral-200/70"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
