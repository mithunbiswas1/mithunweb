// src/components/shared/ProjectCard.jsx

import Link from "next/link";
import Image from "next/image";
import Badge from "@/components/ui/Badge";
import { H3 } from "@/components/ui/Typography";

export default function ProjectCard({ project, className = "" }) {
  const defaultImg =
    project.image || `/project_image/${project.id}-macbook.webp`;
  const hoverImg =
    project.hoverImage || `/project_image/${project.id}-laptop-mobile.webp`;

  return (
    <Link
      href={`/projects/${project.id}`}
      className={`group relative flex flex-col justify-between ${className}`.trim()}
    >
      {/* Visual Canvas Container */}
      <div className="relative w-full aspect-[16/12] rounded-lg overflow-hidden bg-neutral-100 border border-neutral-200 group-hover:border-neutral-300 transition-colors duration-300">
        {/* Default View: Macbook Image */}
        <Image
          src={defaultImg}
          alt={`${project.title} - Macbook View`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
        />

        {/* Hover View: Laptop-Mobile Image */}
        <Image
          src={hoverImg}
          alt={`${project.title} - Laptop and Mobile View`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        />
      </div>

      {/* Info & Tags Bar */}
      <div className=" items-center justify-between gap-2.5 sm:gap-3 pt-3">
        <H3 className="shrink-0">
          {project.title}
        </H3>

        {/* Tags */}
        {project.tags && (
          <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="mono" size="sm" rounded="md">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

