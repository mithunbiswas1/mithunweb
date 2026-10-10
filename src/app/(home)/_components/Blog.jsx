// src/app/(home)/_components/Blog.jsx

import { BLOG_POSTS } from "../_data/home-data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import BlogCard from "@/components/shared/BlogCard";
import Section from "@/components/shared/Section";
import { H2, Typography } from "@/components/ui/Typography";

export default function Blog() {
  return (
    <Section id="blog" className="border-t border-neutral-200">
      {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-neutral-200">
          <div>
            <Typography variant="subheading" color="muted" className="mb-3">
              BLOG
            </Typography>
            <H2 weight="regular">
              Articles &amp; insights
            </H2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-black group"
          >
            <span>View all articles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 sm:pt-16">
          {BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.id}
              post={post}
            />
          ))}
        </div>
    </Section>
  );
}
