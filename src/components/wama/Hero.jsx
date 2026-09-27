"use client";

import { useState } from "react";
import Image from "next/image";
import { HERO_CARDS } from "@/data/wama-data";

export default function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="relative pt-32 sm:pt-40 pb-20 sm:pb-36 bg-[#ffffff] text-black overflow-hidden select-none">
      {/* Subtle radial backdrop for depth */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-neutral-100/70 via-white/20 to-transparent pointer-events-none rounded-full blur-3xl -z-10" />

      <div className="max-w-[1400px] mx-auto w-[92%] flex flex-col items-center text-center">
        {/* Top Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 mb-6 rounded-full border border-neutral-200 bg-neutral-50/80 backdrop-blur-sm shadow-xs">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[11px] font-mono tracking-wider text-neutral-600 uppercase">
            Studio Framer PRO da América Latina
          </span>
        </div>

        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-normal leading-[1.08] tracking-tight max-w-4xl text-neutral-950 mb-6 sm:mb-8">
          Design e desenvolvimento de produtos digitais
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-light text-neutral-600 max-w-2xl leading-relaxed mb-12 sm:mb-20">
          Uma nova geração de sites, sistemas e aplicativos construídos com design de excelência, valor e sempre superando as expectativas
        </p>

        {/* The Signature Fanned Arc of Mockup Cards */}
        <div className="relative w-full max-w-[1100px] h-[340px] sm:h-[460px] md:h-[540px] lg:h-[600px] mt-2 mb-4">
          <div className="absolute inset-0 flex items-center justify-center">
            {HERO_CARDS.map((card) => {
              const isHovered = hoveredCard === card.id;

              return (
                <div
                  key={card.id}
                  onMouseEnter={() => setHoveredCard(card.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className="absolute left-1/2 top-[10%] w-[160px] sm:w-[220px] md:w-[260px] lg:w-[290px] aspect-[0.62] rounded-xl sm:rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-out"
                  style={{
                    transformOrigin: "50% 280%",
                    transform: `translateX(-50%) rotate(${card.rotate}deg) ${
                      isHovered ? "translateY(-24px) scale(1.08)" : "translateY(0) scale(1)"
                    }`,
                    zIndex: isHovered ? 500 : card.zIndex,
                    boxShadow: isHovered
                      ? "0 30px 60px -12px rgba(0, 0, 0, 0.45), 0 0 20px rgba(0,0,0,0.1)"
                      : "-16px 12px 35px -8px rgba(0, 0, 0, 0.28)",
                  }}
                >
                  <img
                    src={card.image}
                    alt={card.alt}
                    loading="eager"
                    className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out"
                    style={{
                      transform: isHovered ? "scale(1.05)" : "scale(1)",
                    }}
                  />
                  {/* Subtle glass rim overlay */}
                  <div className="absolute inset-0 rounded-xl sm:rounded-2xl border border-white/20 pointer-events-none" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
