// src/app/(home)/_components/MetricsAndFounder.jsx

import Image from "next/image";
import { METRICS, FOUNDER } from "../_data/home-data";
import Section from "@/components/shared/Section";

export default function MetricsAndFounder() {
  return (
    <Section id="about" theme="dark">
        {/* 4 Stats Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-24 sm:mb-36">
          {METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-white text-black rounded-2xl sm:rounded-3xl p-8 sm:p-10 flex flex-col justify-between min-h-[220px] shadow-lg hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300"
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

        {/* Founder Testimonial Card */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-neutral-900 to-black border border-white/10 p-8 sm:p-14 lg:p-20 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-12">
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
                <Image
                  src={FOUNDER.photo}
                  alt={FOUNDER.name}
                  width={56}
                  height={56}
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
    </Section>
  );
}
