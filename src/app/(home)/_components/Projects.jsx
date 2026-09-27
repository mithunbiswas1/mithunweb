"use client";

import { useState } from "react";
import { PROJECTS } from "@/data/mithunweb-data";
import { ArrowUpRight } from "lucide-react";

export default function Projects() {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);

  return (
    <section
      id="projetos"
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase pt-2">
            PROJETOS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl text-black">
            Superando padrões. Não apenas expectativas.
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14">
          {PROJECTS.map((project) => {
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
