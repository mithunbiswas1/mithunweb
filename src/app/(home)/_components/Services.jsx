"use client";

import { useEffect, useRef, useState } from "react";
import { SERVICES } from "@/data/mithunweb-data";

export default function Services() {
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
      id="services"
      ref={sectionRef}
      data-theme="light"
      className="bg-[#ffffff] text-black py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header with Wama-style Scroll Reveal */}
        <div
          className={`flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-500 uppercase pt-2">
            SERVICES
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl text-black">
            Solutions for every stage of your business
          </h2>
        </div>

        {/* Services Grid (4 columns desktop, 2 tablet, 1 mobile) with Staggered Scroll Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className={`group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 border border-neutral-200/80 bg-neutral-50/50 hover:bg-neutral-50 hover:border-neutral-300 hover:shadow-xl hover:shadow-black/5 transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-1.5 ${
                isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-10 scale-[0.97]"
              }`}
              style={{
                transitionDelay: `${Math.min(500, index * 80)}ms`,
                willChange: "transform, opacity",
              }}
            >
              {/* Media Visualizer Loop */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black mb-5">
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-600 ease-[cubic-bezier(0.16,1,0.3,1)]"
                />
                <div className="absolute top-3 left-3 text-[11px] font-mono tracking-widest text-neutral-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {service.number}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-black mb-2 tracking-tight group-hover:text-neutral-700 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm font-normal text-neutral-600 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
