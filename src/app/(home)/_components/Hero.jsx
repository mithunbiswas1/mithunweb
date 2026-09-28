"use client";

import { useState } from "react";
import { HERO_CARDS } from "@/data/mithunweb-data";

export default function Hero() {
  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section
      id="hero"
      data-theme="light"
      className="relative pt-36 sm:pt-44 pb-0 bg-[#ffffff] text-black overflow-hidden select-none"
    >
      <div className="max-w-[1400px] mx-auto w-[90%] flex flex-col items-center text-center">
        {/* Master Heading */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold leading-[1.08] tracking-[-0.03em] max-w-4xl text-black">
          Design and development of digital products
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl font-normal text-black max-w-2xl leading-relaxed mt-6 sm:mt-7">
          A new generation of websites, systems, and applications built with design of{" "}
          <strong className="font-semibold">excellence, value</strong>, and always exceeding expectations.
        </p>

        {/* The Exact Signature Fanned Arc of Mockup Cards */}
        <div className="w-full mt-10 sm:mt-14 relative overflow-hidden" style={{ aspectRatio: "2.11765" }}>
          {HERO_CARDS.map((card) => {
            const isHovered = hoveredCard === card.id;

            return (
              <div
                key={card.id}
                onMouseEnter={() => setHoveredCard(card.id)}
                onMouseLeave={() => setHoveredCard(null)}
                className="absolute left-1/2 cursor-pointer transition-all duration-400 ease-out"
                style={{
                  top: "11%",
                  height: "67%",
                  aspectRatio: "0.62",
                  transformOrigin: "50% 290%",
                  transform: `translateX(-50%) rotate(${card.rotate}deg) ${
                    isHovered ? "translateY(-18px) scale(1.05)" : "translateY(0) scale(1)"
                  }`,
                  zIndex: isHovered ? 500 : card.zIndex,
                  borderRadius: "10px",
                  boxShadow: isHovered
                    ? "-20px 20px 50px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0,0,0,0.15)"
                    : "-28px 8px 40px rgba(0, 0, 0, 0.35)",
                  overflow: "hidden",
                  willChange: "transform",
                }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="eager"
                  className="w-full h-full object-cover select-none pointer-events-none"
                  draggable={false}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
