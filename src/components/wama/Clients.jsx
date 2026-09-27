"use client";

import { CLIENT_LOGOS_DATA } from "@/data/client-logos";

export default function Clients() {
  return (
    <section id="clientes" className="bg-[#000000] text-white py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-[1400px] mx-auto w-[92%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-baseline justify-between gap-6 pb-16 sm:pb-20">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase">
            CLIENTES
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-[44px] font-normal leading-[1.15] tracking-tight max-w-2xl text-neutral-100">
            Criatividade, excelência, &amp; reconhecimento.
          </h2>
        </div>

        {/* 15 Client Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-2.5">
          {CLIENT_LOGOS_DATA.map((item, index) => (
            <div
              key={index}
              className="group aspect-[1.25/1] sm:aspect-[1.3/1] bg-[#0c0c0c] hover:bg-[#141414] border border-white/[0.04] hover:border-white/[0.12] rounded-xl flex items-center justify-center p-6 transition-all duration-300"
            >
              <div 
                className="w-full max-w-[100px] h-6 flex items-center justify-center text-neutral-400 group-hover:text-white transition-colors duration-300 opacity-75 group-hover:opacity-100 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-7 [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
