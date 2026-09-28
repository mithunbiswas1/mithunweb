"use client";

import { useEffect, useRef, useState } from "react";
import { CLIENT_LOGOS_DATA } from "@/data/client-logos";

export default function Clients() {
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
      { rootMargin: "-40px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="clients"
      ref={sectionRef}
      data-theme="dark"
      className="bg-[#000000] text-white py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header with Wama-style Scroll Reveal */}
        <div
          className={`flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase pt-2">
            CLIENTS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl text-white">
            Creativity, excellence, &amp; recognition.
          </h2>
        </div>

        {/* 15 Client Logo Grid with Staggered Cascading Reveal */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {CLIENT_LOGOS_DATA.map((item, index) => (
            <div
              key={index}
              className={`group aspect-[1.3/1] bg-[#0c0c0c] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.25] rounded-xl flex items-center justify-center p-6 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-6 scale-95"
              }`}
              style={{
                transitionDelay: `${Math.min(600, index * 40)}ms`,
                willChange: "transform, opacity",
              }}
            >
              <div
                className="w-full max-w-[110px] h-7 flex items-center justify-center text-white opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-7 [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
