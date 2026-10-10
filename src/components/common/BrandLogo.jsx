// src/components/common/BrandLogo.jsx

import Link from "next/link";
import { cn } from "@/lib/utils";

export default function BrandLogo({
  href = "/",
  className = "h-5 sm:h-6 w-auto",
  color = "currentColor",
}) {
  const svg = (
    <svg
      viewBox="0 0 115 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("h-5 sm:h-6 w-auto transition-colors", className)}
      aria-label="Mithun Web"
    >
      <text
        x="0"
        y="18.5"
        fill={color}
        style={{
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        mithunweb
      </text>
    </svg>
  );

  if (href) {
    return (
      <Link href={href} aria-label="Mithun Web Home" className="inline-flex items-center">
        {svg}
      </Link>
    );
  }

  return svg;
}
