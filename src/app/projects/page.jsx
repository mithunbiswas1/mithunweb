"use client";

import { useState } from "react";
import Link from "next/link";
import { PROJECTS } from "@/data/mithunweb-data";
import { ArrowUpRight, ArrowLeft, Monitor, Laptop, Smartphone } from "lucide-react";
import BrandLogo from "../(home)/_components/BrandLogo";
import Footer from "../(home)/_components/Footer";

export default function ProjectsIndexPage() {
  const [filter, setFilter] = useState("All");
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

  const categories = ["All", "SaaS", "Website", "Mobile App", "Framer", "Figma"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()));

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white flex flex-col justify-between">
      {/* Top Header Navigation */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-black/[0.06] py-4 transition-all">
        <div className="max-w-[1400px] mx-auto w-[92%] flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-600 hover:text-black transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back Home</span>
            </Link>
          </div>

          <Link href="/" aria-label="Mithun Web Home">
            <BrandLogo className="h-5 sm:h-6 w-auto text-black" />
          </Link>

          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-5 py-2 text-xs font-medium tracking-wide rounded-full bg-black text-white hover:bg-neutral-800 transition-all duration-200"
          >
            Start a project
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-32 sm:pt-44 pb-28">
        <div className="max-w-[1400px] mx-auto w-[90%]">
          {/* Header */}
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase mb-4">
              CASE STUDIES &amp; PORTFOLIO
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] mb-6">
              Excellence across every digital discipline.
            </h1>
            <p className="text-lg sm:text-xl font-light text-neutral-600 leading-relaxed">
              Explore our complete collection of digital products, Framer websites, SaaS platforms, and mobile apps created for forward-thinking companies.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-12 sm:pb-16 border-b border-neutral-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all ${filter === cat
                    ? "bg-black text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                  }`}
              >
                {cat}
              </button>
            ))}
            <span className="ml-auto text-xs font-mono text-neutral-400 hidden sm:inline">
              Showing {filteredProjects.length} projects
            </span>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-12">
            {filteredProjects.map((project) => {
              const isHovered = hoveredProjectId === project.id;
              const hasVideo = !!project.video;
              const manualView = selectedViews[project.id];
              const currentView = manualView || (isHovered ? "mobile" : "desktop");

              const desktopImg = project.desktopImage || project.image;
              const laptopImg = project.laptopImage || project.image;
              const mobileImg = project.mobileImage || project.image;

              return (
                <Link
                  key={project.id}
                  href={`/projects/${project.id}`}
                  onMouseEnter={() => setHoveredProjectId(project.id)}
                  onMouseLeave={() => setHoveredProjectId(null)}
                  className="group flex flex-col cursor-pointer"
                >
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 shadow-xs transition-all duration-500 group-hover:shadow-xl group-hover:border-neutral-400">
                    {/* Desktop Image */}
                    <img
                      src={desktopImg}
                      alt={`${project.title} Desktop View`}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "desktop"
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                        }`}
                    />

                    {/* Laptop Image */}
                    <img
                      src={laptopImg}
                      alt={`${project.title} Laptop View`}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "laptop"
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                        }`}
                    />

                    {/* Mobile Image */}
                    <img
                      src={mobileImg}
                      alt={`${project.title} Mobile View`}
                      loading="lazy"
                      className={`absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-out ${currentView === "mobile"
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-105 pointer-events-none"
                        }`}
                    />

                    {/* Hover Video */}
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

                    {/* Top-Left View Switcher Pills */}
                    <div className="absolute top-3 left-3 z-20 flex items-center bg-black/75 backdrop-blur-md p-1 rounded-full border border-white/15 shadow-md">
                      <button
                        type="button"
                        title="Desktop View"
                        onClick={(e) => handleSelectView(e, project.id, "desktop")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono transition-all ${currentView === "desktop"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                          }`}
                      >
                        <Monitor className="w-2.5 h-2.5" />
                        <span className="hidden xl:inline">Desk</span>
                      </button>

                      <button
                        type="button"
                        title="Laptop View"
                        onClick={(e) => handleSelectView(e, project.id, "laptop")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono transition-all ${currentView === "laptop"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                          }`}
                      >
                        <Laptop className="w-2.5 h-2.5" />
                        <span className="hidden xl:inline">Lap</span>
                      </button>

                      <button
                        type="button"
                        title="Mobile View"
                        onClick={(e) => handleSelectView(e, project.id, "mobile")}
                        className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono transition-all ${currentView === "mobile"
                            ? "bg-white text-black font-semibold"
                            : "text-neutral-400 hover:text-white"
                          }`}
                      >
                        <Smartphone className="w-2.5 h-2.5" />
                        <span className="hidden xl:inline">Mob</span>
                      </button>
                    </div>

                    {/* Top-Right Arrow */}
                    <div className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-white/95 backdrop-blur-md flex items-center justify-center text-neutral-900 shadow-sm opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>

                    {/* Bottom-Right Tag */}
                    <div className="absolute bottom-3 right-3 z-20 px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md border border-white/10 text-[9px] font-mono uppercase tracking-wider text-neutral-300">
                      {currentView}
                    </div>
                  </div>

                  <div className="flex items-baseline justify-between gap-3 pt-5">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors">
                        {project.title}
                      </h2>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                      {project.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-0.5 rounded text-[10px] font-mono text-neutral-600 bg-neutral-100 border border-neutral-200"
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
      </main>

      <Footer />
    </div>
  );
}
