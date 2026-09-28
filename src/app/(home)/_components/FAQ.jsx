"use client";

import { useEffect, useRef, useState } from "react";
import { FAQS } from "@/data/mithunweb-data";
import { Plus, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);
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

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? -1 : idx);
  };

  return (
    <section
      id="faq"
      ref={sectionRef}
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative border-t border-neutral-200"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-20">
          {/* Left Column: Accordion Questions */}
          <div
            className={`w-full lg:max-w-3xl flex-1 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase mb-4">
              FREQUENTLY ASKED QUESTIONS
            </div>
            <h2 className="text-3xl sm:text-5xl font-normal leading-[1.15] tracking-tight text-neutral-950 mb-12">
              Common questions before getting started
            </h2>

            <div className="divide-y divide-neutral-200 border-t border-b border-neutral-200">
              {FAQS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className="py-6 sm:py-7 transition-all duration-500"
                    style={{
                      transitionDelay: `${idx * 40}ms`,
                    }}
                  >
                    <button
                      onClick={() => toggle(idx)}
                      className="w-full flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                      aria-expanded={isOpen}
                    >
                      <span className={`text-lg sm:text-xl font-normal transition-colors duration-300 ${
                        isOpen ? "text-neutral-950 font-medium" : "text-neutral-800 group-hover:text-black"
                      }`}>
                        {faq.question}
                      </span>
                      <span
                        className={`flex-shrink-0 w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 ${
                          isOpen
                            ? "border-black bg-black text-white rotate-45"
                            : "border-neutral-300 text-neutral-700 group-hover:border-black group-hover:text-black rotate-0"
                        }`}
                      >
                        <Plus className="w-4 h-4 transition-transform duration-300" />
                      </span>
                    </button>

                    {/* Smooth Wama-style Height Accordion Expansion */}
                    <div
                      className={`grid transition-[grid-template-rows,opacity] duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                        isOpen ? "grid-rows-[1fr] opacity-100 pt-4" : "grid-rows-[0fr] opacity-0 pt-0"
                      }`}
                    >
                      <div className="overflow-hidden">
                        <p className="pr-10 text-neutral-600 font-light text-sm sm:text-base leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Sticky Card with Smooth Entrance */}
          <div
            className={`w-full lg:w-[360px] lg:sticky lg:top-32 flex-shrink-0 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
              isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-[0.97]"
            }`}
            style={{
              transitionDelay: "200ms",
              willChange: "transform, opacity",
            }}
          >
            <div className="rounded-3xl bg-neutral-50 border border-neutral-200 p-8 sm:p-10 shadow-sm hover:shadow-xl hover:border-neutral-300 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex flex-col justify-between">
              <div>
                <span className="w-2.5 h-2.5 rounded-full bg-black inline-block mb-6 animate-pulse" />
                <h3 className="text-2xl font-normal text-neutral-950 mb-3 tracking-tight">
                  Still have questions?
                </h3>
                <p className="text-sm font-light text-neutral-600 leading-relaxed mb-8">
                  Have more questions? We would love to answer them. Feel free to get in touch with our team anytime.
                </p>
              </div>

              <Link
                href="#contact"
                className="inline-flex items-center justify-between w-full px-6 py-3.5 rounded-full bg-black text-white hover:bg-neutral-800 text-sm font-medium tracking-wide transition-all group active:scale-[0.98]"
              >
                <span>Talk to Mithun Web</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
