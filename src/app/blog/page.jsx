"use client";

import { useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/data/blog-data";
import { ArrowLeft, ArrowUpRight, Clock, Calendar } from "lucide-react";
import BrandLogo from "../(home)/_components/BrandLogo";
import Footer from "../(home)/_components/Footer";

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
              EDITORIAL &amp; INSIGHTS
            </div>
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.08] mb-6">
              Perspectives on design, tech &amp; digital craft.
            </h1>
            <p className="text-lg sm:text-xl font-light text-neutral-600 leading-relaxed">
              In-depth articles, tactical guides, and regulatory insights for founders, design leaders, and engineers building the future of the web.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 pb-12 sm:pb-16 border-b border-neutral-200">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wide transition-all ${
                  selectedCategory === cat
                    ? "bg-black text-white font-medium shadow-sm"
                    : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200 hover:text-black"
                }`}
              >
                {cat}
              </button>
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
                    <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md px-3 py-1 rounded-md text-xs font-mono text-white">
                      Featured Insight
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

          {/* Blog Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-16">
            {filteredPosts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col justify-between"
              >
                <div>
                  <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-6 shadow-xs">
                    <img
                      src={post.image}
                      alt={post.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider text-white">
                      {post.date}
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    <span>{post.category}</span>
                    <span>•</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug mb-3">
                    {post.title}
                  </h3>

                  <p className="text-sm font-light text-neutral-500 line-clamp-3 leading-relaxed mb-6">
                    {post.description}
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-900 group-hover:text-black">
                  <span>Read article</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
