// src/components/shared/SectionHeader.jsx

import { H2, Typography } from "@/components/ui/Typography";

export default function SectionHeader({ badge, title, color }) {
  const isWhite = color === "white";

  return (
    <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-8 pb-16 sm:pb-24">
      {badge && (
        <Typography
          variant="subheading"
          color="muted"
          className={isWhite ? "pt-2 text-neutral-400" : "pt-2"}
        >
          {badge}
        </Typography>
      )}

      <H2 color={color} className="max-w-3xl">
        {title}
      </H2>
    </div>
  );
}
