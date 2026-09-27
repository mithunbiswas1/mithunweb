"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import WamaLogo from "./WamaLogo";
import { NAV_LINKS } from "@/data/wama-data";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-black/75 backdrop-blur-md shadow-sm border-b border-black/[0.06] dark:border-white/[0.08] py-3.5"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-[1400px] mx-auto w-[92%] flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 group text-black dark:text-white"
          aria-label="Wama Home"
        >
          <WamaLogo className="h-4 sm:h-5 w-auto text-black dark:text-white transition-transform group-hover:scale-105 duration-200" />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-xs lg:text-[13px] font-normal tracking-wide text-neutral-600 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors duration-200 relative group lowercase"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-black dark:bg-white transition-all duration-200 group-hover:w-full" />
            </Link>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden sm:flex items-center gap-4">
          <Link
            href="#contato"
            className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-medium tracking-wide text-white bg-black dark:bg-white dark:text-black rounded-full hover:bg-neutral-800 dark:hover:bg-neutral-200 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-sm"
          >
            Inicie um projeto
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 focus:outline-none"
          aria-label="Toggle Menu"
        >
          <span
            className={`block w-5 h-0.5 bg-black dark:bg-white transition-transform duration-300 ${
              menuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black dark:bg-white transition-opacity duration-300 ${
              menuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`block w-5 h-0.5 bg-black dark:bg-white transition-transform duration-300 ${
              menuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-neutral-200 dark:border-neutral-800 px-6 py-6 shadow-xl animate-fade-in">
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-base font-normal tracking-wide text-neutral-800 dark:text-neutral-200 hover:text-black dark:hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-2">
              <Link
                href="#contato"
                onClick={() => setMenuOpen(false)}
                className="block text-center w-full py-3 text-sm font-medium text-white bg-black dark:bg-white dark:text-black rounded-full"
              >
                Inicie um projeto
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
