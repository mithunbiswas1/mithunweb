// src/app/(pages)/blog/[slug]/page.jsx

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Clock, Calendar, Share2, Sparkles } from "lucide-react";
import { BLOG_POSTS, getBlogPostBySlug } from "../_data/blog-data";

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found | Mithun Web",
    };
  }

  return {
    title: `${post.title} — Mithun Web Blog`,
    description: post.description,
    alternates: {
      canonical: `https://mithunweb.vercel.app/blog/${slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      authors: [post.author?.name || "Mithun Biswas"],
      images: [{ url: post.image }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = BLOG_POSTS.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="pt-32 sm:pt-40 pb-20">
      <article className="max-w-[880px] mx-auto w-[90%]">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-neutral-500 hover:text-black transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to articles</span>
          </Link>
        </div>
          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider text-neutral-900 bg-neutral-100 border border-neutral-200 uppercase">
              {post.category}
            </span>
            <span className="text-xs font-mono text-neutral-400">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Calendar className="w-3.5 h-3.5" />
              <span>{post.date}</span>
            </div>
            <span className="text-xs font-mono text-neutral-400">•</span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-neutral-500">
              <Clock className="w-3.5 h-3.5" />
              <span>{post.readTime}</span>
            </div>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.12] mb-6">
            {post.title}
          </h1>

          {/* Lead Paragraph */}
          <p className="text-lg sm:text-xl font-light text-neutral-600 leading-relaxed mb-10 pb-8 border-b border-neutral-200">
            {post.description}
          </p>

          {/* Author Byline */}
          <div className="flex items-center justify-between gap-4 mb-10">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-neutral-200 bg-neutral-100 flex-shrink-0">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-sm font-medium text-neutral-950">
                  {post.author.name}
                </div>
                <div className="text-xs font-light text-neutral-500">
                  {post.author.role}
                </div>
              </div>
            </div>
          </div>

          {/* Featured Image */}
          <div className="relative w-full aspect-[16/9] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md mb-12 sm:mb-16">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Article Structured Body */}
          <div className="prose prose-neutral max-w-none space-y-8 text-neutral-800 text-base sm:text-lg font-light leading-relaxed">
            {post.content.map((block, idx) => {
              if (block.type === "heading") {
                return (
                  <h2
                    key={idx}
                    className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 pt-6 mb-3"
                  >
                    {block.text}
                  </h2>
                );
              }

              if (block.type === "quote") {
                return (
                  <blockquote
                    key={idx}
                    className="my-8 p-6 sm:p-8 rounded-2xl bg-neutral-50 border-l-4 border-black text-lg sm:text-xl font-normal italic text-neutral-900 shadow-xs"
                  >
                    "{block.text}"
                  </blockquote>
                );
              }

              return (
                <p key={idx} className="text-neutral-700 leading-relaxed">
                  {block.text}
                </p>
              );
            })}
          </div>

          {/* Author Bio Box */}
          <div className="mt-16 sm:mt-24 p-8 rounded-3xl bg-neutral-50 border border-neutral-200 flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm flex-shrink-0 bg-neutral-200">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                Written by
              </div>
              <h3 className="text-xl font-semibold text-neutral-950 mb-2">
                {post.author.name}
              </h3>
              <p className="text-sm font-light text-neutral-600 leading-relaxed mb-4">
                Founder and Creative Director at Mithun Web. Passionate about high-precision UI/UX architecture, Framer development, and crafting disruptive digital experiences for global brands.
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-black font-semibold hover:underline"
              >
                <span>Discuss a project with Mithun</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 sm:mt-28 pt-16 border-t border-neutral-200">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-950">
                  Related Insights
                </h3>
                <Link
                  href="/blog"
                  className="text-xs font-mono uppercase tracking-wider text-neutral-600 hover:text-black transition-colors"
                >
                  View All Articles →
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-neutral-100 border border-neutral-200 mb-4 shadow-xs">
                        <img
                          src={rel.image}
                          alt={rel.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                      </div>
                      <span className="text-[10px] font-mono uppercase text-neutral-400 block mb-1">
                        {rel.date}
                      </span>
                      <h4 className="text-base font-medium text-neutral-950 group-hover:text-neutral-600 transition-colors line-clamp-2 leading-snug">
                        {rel.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </div>
  );
}
