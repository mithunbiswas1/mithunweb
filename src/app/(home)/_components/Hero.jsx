"use client";

import { useEffect, useRef } from "react";
import { HERO_CARDS } from "@/data/mithunweb-data";

export default function Hero() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    // Perfectly balanced sway with a subtle small breathing gap
    const sway = 5; // ±5 degrees smooth harmonic sway
    const swingDuration = 1.8; // 1.8s smooth sweep from one side to the other
    const pause = 0.5; // 0.5s small breathing gap at turning points
    const totalCycle = 2 * (swingDuration + pause); // 4.6s full cycle
    const stagger = 130; // 130ms progressive phase delay per card
    const easeCurve = "cubic-bezier(0.37, 0, 0.63, 1)"; // easeInOutSine

    const offset1 = swingDuration / totalCycle; // ~0.3913
    const offset2 = (swingDuration + pause) / totalCycle; // 0.5000
    const offset3 = (swingDuration * 2 + pause) / totalCycle; // ~0.8913

    const activeAnimations = [];

    // Launch Web Animations API for every card
    HERO_CARDS.forEach((card, index) => {
      const el = cardRefs.current[index];
      if (!el || typeof el.animate !== "function") return;

      const baseAngle = card.rotate;
      const angleMin = baseAngle - sway;
      const angleMax = baseAngle + sway;

      const keyframes = [
        {
          transform: `translateX(-50%) rotate(${angleMin}deg)`,
          easing: easeCurve,
          offset: 0,
        },
        {
          transform: `translateX(-50%) rotate(${angleMax}deg)`,
          easing: "linear",
          offset: offset1,
        },
        {
          transform: `translateX(-50%) rotate(${angleMax}deg)`,
          easing: easeCurve,
          offset: offset2,
        },
        {
          transform: `translateX(-50%) rotate(${angleMin}deg)`,
          easing: "linear",
          offset: offset3,
        },
        {
          transform: `translateX(-50%) rotate(${angleMin}deg)`,
          offset: 1,
        },
      ];

      const anim = el.animate(keyframes, {
        duration: totalCycle * 1000,
        delay: index * stagger,
        iterations: Infinity,
        fill: "both",
      });

      activeAnimations.push(anim);
    });

    // Pause when hero is out of viewport to preserve 60fps and device battery
    let observer;
    if (typeof IntersectionObserver !== "undefined" && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const isVisible = entries[0].isIntersecting;
          activeAnimations.forEach((anim) => {
            if (isVisible) {
              anim.play();
            } else {
              anim.pause();
            }
          });
        },
        { rootMargin: "120px" }
      );

      observer.observe(containerRef.current);
    }

    return () => {
      if (observer) observer.disconnect();
      activeAnimations.forEach((anim) => anim.cancel());
    };
  }, []);

  return (
    <section
      id="hero"
      ref={containerRef}
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
        <div
          className="w-full mt-10 sm:mt-14 relative overflow-hidden"
          style={{
            aspectRatio: "2.11765",
            contentVisibility: "auto",
          }}
        >
          {HERO_CARDS.map((card, index) => {
            // Precise left-to-right stacking matching Wama's exact depth layering
            const zIndexValue = 35 + index * 50;

            return (
              <div
                key={card.id}
                ref={(el) => {
                  cardRefs.current[index] = el;
                }}
                className="absolute left-1/2 pointer-events-none select-none"
                style={{
                  top: "11%",
                  height: "67%",
                  aspectRatio: "0.62",
                  transformOrigin: "50% 290%",
                  transform: `translateX(-50%) rotate(${card.rotate}deg)`,
                  zIndex: zIndexValue,
                  borderRadius: "10px",
                  boxShadow: "-28px 8px 40px rgba(0, 0, 0, 0.35)",
                  overflow: "hidden",
                  willChange: "transform",
                  backfaceVisibility: "hidden",
                  contain: "layout paint",
                }}
              >
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="eager"
                  fetchPriority="high"
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


