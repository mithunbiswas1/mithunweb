// src/components/common/Navbar.jsx

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import BrandLogo from "./BrandLogo";
import LinkButton from "@/components/ui/LinkButton";
import { NAV_LINKS } from "./_data/navigation";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Check if navbar is over a dark section
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let foundDark = false;
      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= 50 && rect.bottom >= 50) {
          foundDark = true;
          break;
        }
      }
      setIsDark(foundDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Prevent background scroll when mobile drawer is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-40 border-b transition-[background-color,border-color,padding,color,backdrop-filter] duration-300",
          isDark ? "text-white" : "text-black",
          scrolled
            ? isDark
              ? "bg-black/75 backdrop-blur-md border-white/10 py-3.5"
              : "bg-white/85 backdrop-blur-md border-neutral-200/60 py-3.5 shadow-xs"
            : "bg-transparent border-transparent py-5 sm:py-6"
        )}
      >
        <div className="max-w-[1400px] mx-auto w-[92%] flex items-center justify-between">
          {/* Brand Logo */}
          <BrandLogo />

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8 lg:gap-11">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-[15px] font-normal lowercase tracking-tight transition-opacity hover:opacity-70"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden sm:block">
            <LinkButton
              href="/contact"
              variant={isDark ? "white" : "default"}
              size="md"
            >
              Start a project
            </LinkButton>
          </div>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-1.5 rounded-lg cursor-pointer transition-opacity hover:opacity-70"
            aria-label="Open navigation menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Left-to-Right Slide) */}
      <div
        className={cn(
          "fixed inset-0 z-50 md:hidden transition-all duration-300",
          menuOpen ? "pointer-events-auto visible" : "pointer-events-none invisible"
        )}
      >
        {/* Backdrop Overlay */}
        <div
          onClick={() => setMenuOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300",
            menuOpen ? "opacity-100" : "opacity-0"
          )}
        />

        {/* Drawer Panel Sliding Left to Right */}
        <aside
          className={cn(
            "absolute top-0 bottom-0 left-0 w-[290px] max-w-[85vw] flex flex-col justify-between p-6 sm:p-8 backdrop-blur-2xl shadow-2xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
            isDark
              ? "bg-black/95 text-white border-r border-white/10"
              : "bg-white/95 text-black border-r border-neutral-200/70",
            menuOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          {/* Top: Logo & Close */}
          <div>
            <div
              className={cn(
                "flex items-center justify-between pb-6 border-b",
                isDark ? "border-white/10" : "border-neutral-200/60"
              )}
            >
              <BrandLogo />
              <button
                onClick={() => setMenuOpen(false)}
                className="p-1.5 rounded-lg cursor-pointer hover:opacity-70 transition-opacity"
                aria-label="Close navigation menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav Links - exact same clean color and hover opacity as lg */}
            <nav className="flex flex-col py-6 space-y-4">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-[17px] font-normal lowercase tracking-tight hover:opacity-70 transition-opacity py-1"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Bottom: CTA & Contact */}
          <div
            className={cn(
              "pt-6 border-t space-y-4",
              isDark ? "border-white/10" : "border-neutral-200/60"
            )}
          >
            <LinkButton
              href="/contact"
              onClick={() => setMenuOpen(false)}
              variant={isDark ? "white" : "default"}
              size="md"
              className="w-full text-center"
            >
              Start a project
            </LinkButton>
          </div>
        </aside>
      </div>
    </>
  );
}
