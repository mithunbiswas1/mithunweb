// src/components/shared/BlogCard.jsx

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { H3, P } from "@/components/ui/Typography";

export default function BlogCard({ post }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
    >
      <div>
        {/* Thumbnail */}
        <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200 shadow-xs">
          <Image
            src={post.image}
            alt={post.title}
            fill
            sizes="(max-width: 768px) 100vw, 25vw"
            className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          />
          <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider text-white z-10">
            {post.date}
          </div>
        </div>

        {/* Title */}
        <H3 className="text-lg sm:text-xl font-normal group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug mb-3">
          {post.title}
        </H3>

        {/* Excerpt */}
        <P variant="muted" className="line-clamp-3">
          {post.description}
        </P>
      </div>

      <div className="pt-6 flex items-center gap-1.5 text-xs font-medium text-neutral-900 group-hover:text-black">
        <span>Read article</span>
        <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
    </Link>
  );
}
