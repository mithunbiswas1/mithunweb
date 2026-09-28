"use client";

import { useEffect, useRef, useState } from "react";
import { BLOG_POSTS } from "@/data/mithunweb-data";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function Blog() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { rootMargin: "-60px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="blog"
      ref={sectionRef}
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative border-t border-neutral-200"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header with Wama-style Scroll Reveal */}
        <div
          className={`flex flex-col sm:flex-row sm:items-end justify-between gap-6 pb-14 sm:pb-20 border-b border-neutral-200 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div>
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase mb-3">
              BLOG
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal leading-[1.1] tracking-tight text-neutral-950">
              Articles &amp; insights
            </h2>
          </div>

          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-black group"
          >
            <span>View all articles</span>
            <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Blog Cards Grid with Staggered Cascading Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-12 sm:pt-16">
          {BLOG_POSTS.map((post, index) => (
            <Link
              key={post.id}
              href={`/blog/${post.slug}`}
              className={`group flex flex-col justify-between cursor-pointer transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.97]"
              }`}
              style={{
                transitionDelay: `${index * 80}ms`,
                willChange: "transform, opacity",
              }}
            >
              <div>
                {/* Thumbnail */}
                <div className="relative w-full aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-100 mb-6 border border-neutral-200 shadow-xs">
                  <img
                    src={post.image}
                    alt={post.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-mono tracking-wider text-white">
                    {post.date}
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg sm:text-xl font-normal text-neutral-950 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug mb-3">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs sm:text-sm font-light text-neutral-500 line-clamp-3 leading-relaxed">
                  {post.description}
                </p>
              </div>

              <div className="pt-6 flex items-center gap-1.5 text-xs font-medium text-neutral-900 group-hover:text-black">
                <span>Read article</span>
                <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
