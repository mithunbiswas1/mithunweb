"use client";

import { useEffect, useRef, useState } from "react";
import { METRICS, FOUNDER } from "@/data/mithunweb-data";

export default function MetricsAndFounder() {
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
      id="about"
      ref={sectionRef}
      data-theme="dark"
      className="bg-[#000000] text-white py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* 4 Stats Cards Grid with Staggered Wama Reveal */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24 sm:mb-36">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className={`bg-white text-black rounded-2xl sm:rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[220px] shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/10 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-8 scale-[0.97]"
              }`}
              style={{
                transitionDelay: `${idx * 80}ms`,
                willChange: "transform, opacity",
              }}
            >
              <div className="text-4xl sm:text-5xl lg:text-[52px] font-normal tracking-tight leading-none text-neutral-950">
                {metric.value}
              </div>
              <div className="text-sm sm:text-base font-light text-neutral-700 leading-snug max-w-[200px]">
                {metric.label}
              </div>
            </div>
          ))}
        </div>

        {/* Founder Testimonial Card with Smooth Scale & Glide */}
        <div
          className={`relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-8 sm:p-14 lg:p-20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.98]"
          }`}
          style={{
            transitionDelay: "320ms",
            willChange: "transform, opacity",
          }}
        >
          {/* Subtle Background Texture */}
          <div
            className="absolute inset-0 opacity-20 bg-cover bg-center pointer-events-none mix-blend-screen"
            style={{ backgroundImage: `url(${FOUNDER.background})` }}
          />

          <div className="relative z-10 max-w-3xl">
            <span className="text-5xl sm:text-7xl font-serif text-neutral-500 leading-none block mb-4">“</span>
            <blockquote className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-normal leading-[1.25] tracking-tight text-white mb-8">
              {FOUNDER.quote}
            </blockquote>

            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white/20 p-0.5 bg-neutral-800">
                <img
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <div className="text-lg font-medium text-white">{FOUNDER.name}</div>
                <div className="text-sm font-light text-neutral-400">{FOUNDER.role}</div>
              </div>
            </div>
          </div>

          {/* Right Decorative Badge */}
          <div className="relative z-10 flex-shrink-0 flex flex-col items-center justify-center p-8 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md hover:bg-white/[0.08] transition-colors duration-300">
            <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase mb-2">
              ● International Recognition
            </span>
            <span className="text-lg font-medium text-white text-center">
              Top Framer PRO Studio &amp; Partner
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
