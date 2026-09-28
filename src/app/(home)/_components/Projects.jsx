"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/mithunweb-data";
import { ArrowUpRight, Monitor, Laptop, Smartphone } from "lucide-react";

export default function Projects() {
  const [hoveredProjectId, setHoveredProjectId] = useState(null);
  const [selectedViews, setSelectedViews] = useState({});

  const handleSelectView = (e, projectId, view) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedViews((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === view ? null : view,
    }));
  };

  return (
    <section
      id="projects"
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase pt-2">
            PROJECTS &amp; SHOWCASE
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl text-black">
            Exceeding standards. Not just expectations.
          </h2>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14">
          {PROJECTS.map((project) => {
            const isHovered = hoveredProjectId === project.id;
            const hasVideo = !!project.video;
            const manualView = selectedViews[project.id];

            // Determine which view to display:
            // If manual view selected, use that;
            // Otherwise default is 'default' (flagship card), and on card hover it transitions to 'laptop' (3D MacBook)
            const currentView = manualView || (isHovered ? "laptop" : "default");

            const defaultImg = project.image;
            const laptopImg = project.laptopImage || project.image;
            const mobileImg = project.mobileImage || project.image;

            return (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                className={`group flex flex-col cursor-pointer ${project.colSpan.includes("lg:col-span-2") ? "lg:col-span-2" : "col-span-1"
                  }`}
              >
                {/* Media Container */}
                <div className="relative w-full aspect-[16/10] sm:aspect-[16/9.5] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-xs transition-all duration-500 group-hover:shadow-2xl group-hover:border-neutral-300">
                  {/* Default Flagship Image */}
                  <img
                    src={defaultImg}
                    alt={project.title}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "default"
                        ? "opacity-100 scale-100 group-hover:scale-105"
                        : "opacity-0 scale-100 pointer-events-none"
                      }`}
                  />

                  {/* 3D MacBook Laptop View Image */}
                  <img
                    src={laptopImg}
                    alt={`${project.title} 3D MacBook View`}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "laptop"
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-100 pointer-events-none"
                      }`}
                  />

                  {/* Mobile View Image */}
                  <img
                    src={mobileImg}
                    alt={`${project.title} Mobile View`}
                    loading="lazy"
                    className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "mobile"
                        ? "opacity-100 scale-100"
                        : "opacity-0 scale-100 pointer-events-none"
                      }`}
                  />

                  {/* Video on Hover if available */}
                  {hasVideo && isHovered && (
                    <video
                      src={project.video}
                      loop
                      muted
                      playsInline
                      autoPlay
                      className="absolute inset-0 w-full h-full object-cover z-10"
                    />
                  )}

                  {/* Top-Left: Discrete Hover Device Switcher */}
                  <div className="absolute top-4 left-4 sm:top-5 sm:left-5 z-20 flex items-center bg-black/60 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                    <button
                      type="button"
                      title="Default Card View"
                      onClick={(e) => handleSelectView(e, project.id, "default")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${currentView === "default"
                          ? "bg-white text-black font-semibold shadow-xs"
                          : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      <span>Card</span>
                    </button>

                    <button
                      type="button"
                      title="3D MacBook View"
                      onClick={(e) => handleSelectView(e, project.id, "laptop")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${currentView === "laptop"
                          ? "bg-white text-black font-semibold shadow-xs"
                          : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      <Laptop className="w-3 h-3" />
                      <span>Laptop</span>
                    </button>

                    <button
                      type="button"
                      title="Mobile View"
                      onClick={(e) => handleSelectView(e, project.id, "mobile")}
                      className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono transition-all duration-200 ${currentView === "mobile"
                          ? "bg-white text-black font-semibold shadow-xs"
                          : "text-neutral-300 hover:text-white"
                        }`}
                    >
                      <Smartphone className="w-3 h-3" />
                      <span>Mobile</span>
                    </button>
                  </div>

                  {/* Top-Right: Arrow Badge */}
                  <div className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-md opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                    <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>

                {/* Info & Tags Bar */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-3 pt-5 sm:pt-6">
                  <div>
                    <h3 className="text-2xl sm:text-3xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors duration-200">
                      {project.title}
                    </h3>
                    {project.category && (
                      <p className="text-sm text-neutral-500 mt-1 font-light">
                        {project.category}
                      </p>
                    )}
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
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

