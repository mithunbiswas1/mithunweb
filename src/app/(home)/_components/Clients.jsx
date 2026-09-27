"use client";

import { CLIENT_LOGOS_DATA } from "@/data/client-logos";

export default function Clients() {
  return (
    <section
      id="clientes"
      data-theme="dark"
      className="bg-[#000000] text-white py-28 sm:py-40 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24">
          <div className="text-xs sm:text-sm font-mono tracking-[0.2em] text-neutral-400 uppercase pt-2">
            CLIENTES
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em] max-w-3xl text-white">
            Criatividade, excelência, &amp; reconhecimento.
          </h2>
        </div>

        {/* 15 Client Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-3">
          {CLIENT_LOGOS_DATA.map((item, index) => (
            <div
              key={index}
              className="group aspect-[1.3/1] bg-[#0c0c0c] hover:bg-[#141414] border border-white/[0.08] hover:border-white/[0.2] rounded-xl flex items-center justify-center p-6 transition-all duration-300"
            >
              <div
                className="w-full max-w-[110px] h-7 flex items-center justify-center text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-7 [&>svg]:object-contain"
                dangerouslySetInnerHTML={{ __html: item.svg }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

