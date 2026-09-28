"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";

export default function Footer() {
  const footerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = footerRef.current;
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
      { rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <footer
      ref={footerRef}
      data-theme="dark"
      className="bg-[#000000] text-white pt-24 pb-16 px-4 sm:px-6 border-t border-neutral-900 select-none"
    >
      <div
        className={`max-w-[1400px] mx-auto w-[90%] transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-900">
          {/* Brand & Studio Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <Link href="/" className="inline-block mb-8" aria-label="Mithun Web Home">
                <BrandLogo className="h-6 w-auto text-white" />
              </Link>
              <div className="space-y-1.5 text-sm font-light text-neutral-400">
                <p>Digital Product &amp; Design Studio</p>
                <p>Crafting high-performance websites, SaaS &amp; systems.</p>
                <p className="pt-2 text-xs font-mono text-neutral-500">Available for select projects worldwide.</p>
              </div>
            </div>

            <div className="pt-10 text-xs font-mono text-neutral-600">
              © Mithun Web 2026. All rights reserved.
            </div>
          </div>

          {/* Column 1: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              SERVICES
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Framer Websites
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  SaaS Development
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Mobile Apps
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Interface Design
                </Link>
              </li>
              <li>
                <Link href="/#services" className="hover:text-white transition-colors">
                  Design Consulting
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: Cases */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              CASES
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="/projects/follow-hr" className="hover:text-white transition-colors">
                  Follow HR
                </Link>
              </li>
              <li>
                <Link href="/projects/follow-hr-app" className="hover:text-white transition-colors">
                  Follow HR App
                </Link>
              </li>
              <li>
                <Link href="/projects/follow-hr-jobs" className="hover:text-white transition-colors">
                  Follow HR Jobs
                </Link>
              </li>
              <li>
                <Link href="/projects/meragadi" className="hover:text-white transition-colors">
                  MeraGadi
                </Link>
              </li>
              <li>
                <Link href="/projects/western-loom" className="hover:text-white transition-colors">
                  Western Loom
                </Link>
              </li>
              <li>
                <Link href="/projects/crostini" className="hover:text-white transition-colors">
                  Crostini
                </Link>
              </li>
              <li>
                <Link href="/projects/edcl" className="hover:text-white transition-colors">
                  EDCL
                </Link>
              </li>
              <li>
                <Link href="/projects/xengo-mart" className="hover:text-white transition-colors">
                  Xengo Mart
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/projects" className="text-white hover:underline text-xs font-mono">
                  View all cases →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Blog */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              BLOG
            </h4>
            <ul className="space-y-3.5 text-xs font-light text-neutral-400">
              <li>
                <Link href="/blog/ui-ux-agency-what-to-evaluate-before-hiring" className="hover:text-white transition-colors line-clamp-1">
                  UI/UX Agency: What to evaluate
                </Link>
              </li>
              <li>
                <Link href="/blog/fintech-ui-ux-modern-instant-payments" className="hover:text-white transition-colors line-clamp-1">
                  Fintech UI/UX: Modern instant payments
                </Link>
              </li>
              <li>
                <Link href="/blog/fintech-website-development-regulatory-compliance" className="hover:text-white transition-colors line-clamp-1">
                  Website development: Regulatory compliance
                </Link>
              </li>
              <li>
                <Link href="/blog/fintech-mobile-apps-store-requirements" className="hover:text-white transition-colors line-clamp-1">
                  Fintech Mobile Apps: Store requirements
                </Link>
              </li>
              <li className="pt-2">
                <Link href="/blog" className="text-white hover:underline font-mono">
                  View all articles →
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Social */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              CONNECT
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://behance.net"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Behance
                </a>
              </li>
              <li>
                <a
                  href="https://dribbble.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Dribbble
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-emerald-400 transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-light gap-4">
          <p>Crafted with design excellence and modern Next.js.</p>
          <div className="flex items-center gap-6">
            <Link href="/#privacy" className="hover:text-neutral-300">
              Privacy Policy
            </Link>
            <Link href="/#terms" className="hover:text-neutral-300">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
