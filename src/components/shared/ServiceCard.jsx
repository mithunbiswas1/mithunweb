// src/components/shared/ServiceCard.jsx

import { H3, P } from "@/components/ui/Typography";

export default function ServiceCard({ service }) {
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl p-4 sm:p-5 border border-neutral-200/80 bg-neutral-50/50 transition-all duration-300">
      {/* Media Visualizer Loop */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-black mb-5">
        <video
          src={service.video}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
        />
        <div className="absolute top-3 left-3 text-[11px] font-mono tracking-widest text-neutral-300 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
          {service.number}
        </div>
      </div>

      {/* Title & Description */}
      <div>
        <H3 className="text-xl sm:text-2xl font-bold mb-2 tracking-tight group-hover:text-neutral-700 transition-colors">
          {service.title}
        </H3>
        <P variant="body" color="gray">
          {service.description}
        </P>
      </div>
    </div>
  );
}
