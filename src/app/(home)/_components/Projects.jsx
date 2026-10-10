// src/app/(home)/_components/Projects.jsx

import { PROJECTS } from "../_data/home-data";

import ProjectCard from "@/components/shared/ProjectCard";
import Section from "@/components/shared/Section";
import SectionHeader from "@/components/shared/SectionHeader";

export default function Projects() {
  return (
    <Section id="projects">
      <SectionHeader
        badge="PROJECTS & SHOWCASE"
        title="Exceeding standards. Not just expectations."
      />

      {/* Projects Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14">
        {PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className={project.colSpan?.includes("lg:col-span-2") ? "lg:col-span-2" : "col-span-1"}
          />
        ))}
      </div>
    </Section>
  );
}
