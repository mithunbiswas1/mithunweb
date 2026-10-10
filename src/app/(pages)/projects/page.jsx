// src/app/(pages)/projects/page.jsx

"use client";

import { useState } from "react";
import { PROJECTS } from "./_data/projects-data";
import ProjectCard from "@/components/shared/ProjectCard";
import Button from "@/components/ui/Button";

export default function ProjectsIndexPage() {
  const [filter, setFilter] = useState("All");

  const categories = ["All", "SaaS", "Website", "Mobile App", "Framer", "Figma"];

  const filteredProjects =
    filter === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.tags.some((tag) => tag.toLowerCase() === filter.toLowerCase()));

  return (
    <div className="pt-32 sm:pt-44 pb-28">
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

        {/* Filter Pills using UI Button component */}
        <div className="flex flex-wrap items-center gap-2 pb-12 sm:pb-16 border-b border-neutral-200">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={filter === cat ? "default" : "secondary"}
              size="sm"
              rounded="full"
              onClick={() => setFilter(cat)}
              className="font-mono text-xs"
            >
              {cat}
            </Button>
          ))}
          <span className="ml-auto text-xs font-mono text-neutral-400 hidden sm:inline">
            Showing {filteredProjects.length} projects
          </span>
        </div>

        {/* Projects Grid using reusable ProjectCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 pt-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isVisible={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
