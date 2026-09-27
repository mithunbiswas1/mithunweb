"use client";

import { SERVICES } from "@/data/wama-data";

export default function Services() {
  return (
    <section id="servicos" className="bg-[#000000] text-white py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden">
      {/* Top curved separator / aesthetic arch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[140%] h-24 bg-white rounded-b-[100%] pointer-events-none" />

      {/* Atmospheric glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-b from-neutral-800/30 via-neutral-900/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-[1400px] mx-auto w-[92%] relative z-10">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 pb-20 sm:pb-28">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase">
            SERVIÇOS
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-normal leading-[1.1] tracking-tight max-w-2xl text-neutral-100">
            Soluções para cada etapa do seu negócio
          </h2>
        </div>

        {/* Services Grid (4 columns desktop, 2 tablet, 1 mobile) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={service.title}
              className="group relative flex flex-col justify-between bg-[#0a0a0a] hover:bg-[#121212] border border-white/[0.06] hover:border-white/[0.18] rounded-2xl p-6 sm:p-7 transition-all duration-300 hover:shadow-2xl"
            >
              {/* Media Visualizer Loop */}
              <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black mb-6 border border-white/[0.04]">
                <video
                  src={service.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                />
                <div className="absolute top-3 left-3 text-[11px] font-mono tracking-widest text-neutral-400 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
                  {service.number}
                </div>
              </div>

              {/* Title & Description */}
              <div>
                <h3 className="text-xl sm:text-2xl font-normal text-white mb-2 tracking-tight group-hover:text-neutral-200 transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm font-light text-neutral-400 leading-relaxed">
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
