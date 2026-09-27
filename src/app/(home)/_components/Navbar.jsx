"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import BrandLogo from "./BrandLogo";
import { NAV_LINKS } from "@/data/mithunweb-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [isDarkSection, setIsDarkSection] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);

      // Check which section is directly under the navbar (center at y = 50px)
      const navY = 50;
      const darkSections = document.querySelectorAll('[data-theme="dark"]');
      let isDark = false;

      for (const section of darkSections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navY && rect.bottom >= navY) {
          isDark = true;
          break;
        }
      }

      setIsDarkSection(isDark);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? isDarkSection
            ? "bg-black/70 backdrop-blur-md border-b border-white/10 py-3.5"
            : "bg-white/80 backdrop-blur-md border-b border-black/[0.06] py-3.5 shadow-xs"
          : "bg-transparent py-5 sm:py-6"
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-[92%] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className={`flex items-center gap-2 group transition-colors duration-300 ${
            isDarkSection ? "text-white" : "text-black"
          }`}
          aria-label="Mithun Web Home"
        >
          <BrandLogo
            className={`h-5 sm:h-6 w-auto transition-colors duration-300 ${
              isDarkSection ? "text-white" : "text-black"
            }`}
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-11">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`text-[15px] font-normal tracking-tight transition-colors duration-300 relative group lowercase ${
                isDarkSection
                  ? "text-neutral-300 hover:text-white"
                  : "text-neutral-800 hover:text-black"
              }`}
            >
              {link.label}
              <span
                className={`absolute -bottom-1 left-0 w-0 h-[1.5px] transition-all duration-200 group-hover:w-full ${
                  isDarkSection ? "bg-white" : "bg-black"
                }`}
              />
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="#contato"
            className={`inline-flex items-center justify-center px-6 py-2.5 text-sm font-medium tracking-wide rounded-full transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] ${
              isDarkSection
                ? "bg-white text-black hover:bg-neutral-200"
                : "bg-black text-white hover:bg-neutral-800 shadow-sm"
            }`}
          >
            Inicie um projeto
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className={`md:hidden p-2 rounded-lg transition-colors ${
            isDarkSection ? "text-white hover:bg-white/10" : "text-black hover:bg-black/5"
          }`}
          aria-label="Toggle navigation menu"
        >
          <div className="w-5 h-4 flex flex-col justify-between">
            <span
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                isDarkSection ? "bg-white" : "bg-black"
              } ${menuOpen ? "rotate-45 translate-y-1.5" : ""}`}
            />
            <span
              className={`block h-0.5 w-full rounded-full transition-all duration-300 ${
                isDarkSection ? "bg-white" : "bg-black"
              } ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div
          className={`md:hidden border-b px-6 py-6 space-y-4 backdrop-blur-xl animate-fade-in ${
            isDarkSection
              ? "bg-black/95 border-neutral-800 text-white"
              : "bg-white/95 border-neutral-200 text-black shadow-lg"
          }`}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-base font-normal lowercase py-1 transition-colors ${
                isDarkSection ? "text-neutral-300 hover:text-white" : "text-neutral-700 hover:text-black"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link
              href="#contato"
              onClick={() => setMenuOpen(false)}
              className={`block w-full text-center py-3 text-sm font-medium rounded-full transition-colors ${
                isDarkSection
                  ? "bg-white text-black hover:bg-neutral-200"
                  : "bg-black text-white hover:bg-neutral-800"
              }`}
            >
              Inicie um projeto
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
