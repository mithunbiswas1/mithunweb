// src/app/(home)/_clients/HeroPreciseImages.jsx

"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { HERO_CARDS } from "../_data/home-data";

export default function HeroPreciseImages() {
  const containerRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    if (prefersReducedMotion) return;

    const sway = 5;
    const swingDuration = 1.8;
    const pause = 0.5;
    const totalCycle = 2 * (swingDuration + pause);
    const stagger = 130;
    const easeCurve = "cubic-bezier(0.37, 0, 0.63, 1)";

    const offset1 = swingDuration / totalCycle;
    const offset2 = (swingDuration + pause) / totalCycle;
    const offset3 = (swingDuration * 2 + pause) / totalCycle;

    const activeAnimations = [];

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
    <div
      ref={containerRef}
      className="w-full mt-10 relative overflow-hidden"
      style={{
        aspectRatio: "2.11765",
        contentVisibility: "auto",
      }}
    >
      {HERO_CARDS.map((card, index) => {
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
            <Image
              src={card.image}
              alt={card.alt}
              fill
              priority={index < 4}
              sizes="(max-width: 768px) 50vw, 30vw"
              className="object-cover select-none pointer-events-none"
              draggable={false}
            />
          </div>
        );
      })}
    </div>
  );
}
