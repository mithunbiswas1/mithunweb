// src/components/common/Footer.jsx

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
              <div className="mb-8">
                <BrandLogo className="h-6 w-auto text-white" />
              </div>
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
            </ul>
          </div>

          {/* Column 3: Navigation */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              STUDIO
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="/#about" className="hover:text-white transition-colors">
                  About Founder
                </Link>
              </li>
              <li>
                <Link href="/projects" className="hover:text-white transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors">
                  Blog &amp; Insights
                </Link>
              </li>
              <li>
                <Link href="/#faq" className="hover:text-white transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-2">
            <h4 className="text-xs font-mono tracking-widest text-neutral-500 uppercase mb-6">
              CONNECT
            </h4>
            <ul className="space-y-3.5 text-sm font-light text-neutral-400">
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Start a Project
                </Link>
              </li>
              <li>
                <a
                  href="mailto:mithunbiswas.contact@gmail.com"
                  className="hover:text-white transition-colors"
                >
                  Email Us
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-white transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>Built with Next.js, React &amp; Tailwind CSS</div>
          <div className="flex items-center gap-6">
            <span>Designed with precision</span>
            <span>Worldwide delivery</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
