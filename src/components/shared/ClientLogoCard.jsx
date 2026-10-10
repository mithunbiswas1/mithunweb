// src/components/shared/ClientLogoCard.jsx

export default function ClientLogoCard({ svg, name }) {
  return (
    <div
      className="group aspect-[1.3/1] bg-[#0c0c0c] hover:bg-[#161616] border border-white/[0.08] hover:border-white/[0.25] rounded-xl flex items-center justify-center p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-black/50"
      aria-label={name}
    >
      <div
        className="w-full max-w-[110px] h-7 flex items-center justify-center text-white opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300 [&>svg]:w-full [&>svg]:h-full [&>svg]:max-h-7 [&>svg]:object-contain"
        dangerouslySetInnerHTML={{ __html: svg }}
      />
    </div>
  );
}
