// src/components/ui/Badge.jsx

import { cn } from "@/lib/utils";

const badgeVariants = {
  default: "bg-neutral-100 text-neutral-800 border-neutral-200/80",
  secondary: "bg-neutral-200 text-neutral-900 border-transparent",
  outline: "border border-neutral-300 bg-transparent text-neutral-800",
  mono: "font-mono tracking-wide uppercase text-neutral-700 bg-neutral-100 border border-neutral-200/70",
  monoDark: "font-mono tracking-widest text-neutral-300 bg-black/70 backdrop-blur-md border border-white/10",
  dark: "bg-neutral-900 text-neutral-300 border-neutral-800",
  active: "bg-black text-white border-black font-medium shadow-xs",
  lime: "bg-[#cdff59]/20 text-[#2f4900] border-[#cdff59]/50",
};

const badgeSizes = {
  sm: "px-2.5 py-0.5 text-[10px]",
  md: "px-3 py-1 text-[11px]",
  lg: "px-4 py-1.5 text-xs",
};

export default function Badge({
  children,
  className,
  variant = "default",
  size = "md",
  rounded = "md",
  ...props
}) {
  const roundedClass = rounded === "full" ? "rounded-full" : rounded === "lg" ? "rounded-xl" : "rounded-md";

  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-medium border select-none transition-colors",
        badgeVariants[variant] || badgeVariants.default,
        badgeSizes[size] || badgeSizes.md,
        roundedClass,
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
