// src/app/(pages)/blog/page.jsx

"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "./_data/blog-data";
import { ArrowUpRight } from "lucide-react";
import BlogCard from "@/components/shared/BlogCard";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    "Design Strategy",
    "Fintech & Product",
    "Compliance & Web",
    "Mobile Architecture",
  ];

  const filteredPosts =
    selectedCategory === "All"
      ? BLOG_POSTS
      : BLOG_POSTS.filter((p) => p.category === selectedCategory);

  const featuredPost = BLOG_POSTS[0];

  return (
    <div className="pt-32 sm:pt-44 pb-28">
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase mb-4">
            EDITORIAL &amp; INSIGHTS
          </div>
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] mb-6">
            Perspectives on design, tech &amp; digital craft.
          </h1>
          <p className="text-lg sm:text-xl font-light text-neutral-600 leading-relaxed">
            In-depth articles, tactical guides, and regulatory insights for founders, design leaders, and engineers building the future of the web.
          </p>
        </div>

        {/* Filter Pills using UI Button component */}
        <div className="flex flex-wrap items-center gap-2 pb-12 sm:pb-16 border-b border-neutral-200">
          {categories.map((cat) => (
            <Button
              key={cat}
              variant={selectedCategory === cat ? "default" : "secondary"}
              size="sm"
              rounded="full"
              onClick={() => setSelectedCategory(cat)}
              className="font-mono text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>

        {/* Featured Hero Article (when 'All' is selected) */}
        {selectedCategory === "All" && featuredPost && (
          <div className="py-12 sm:py-16 border-b border-neutral-200">
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              <div className="lg:col-span-7">
                <div className="relative w-full aspect-[16/10] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="monoDark" size="md" rounded="md">
                      Featured Insight
                    </Badge>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 text-xs font-mono text-neutral-500 uppercase tracking-wider mb-4">
                    <span>{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.readTime}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-950 group-hover:text-neutral-600 transition-colors leading-tight mb-4">
                    {featuredPost.title}
                  </h2>

                  <p className="text-base text-neutral-600 font-light leading-relaxed mb-6 line-clamp-3">
                    {featuredPost.description}
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 text-sm font-medium text-black group-hover:underline">
                  <span>Read full article</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Cards Grid using reusable BlogCard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-16">
          {filteredPosts.map((post, index) => (
            <BlogCard
              key={post.id}
              post={post}
              index={index}
              isVisible={true}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
