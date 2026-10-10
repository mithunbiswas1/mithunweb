// src/components/ui/Typography.jsx

import { cn } from "@/lib/utils";

const variantClasses = {
  display: "text-4xl sm:text-6xl md:text-7xl lg:text-[76px] font-bold leading-[1.08] tracking-[-0.03em]",
  h1: "text-4xl sm:text-5xl lg:text-[64px] 2xl:text-[80px] font-bold tracking-tight leading-[1.08]",
  h2: "text-3xl sm:text-5xl lg:text-[56px] font-bold leading-[1.08] tracking-[-0.03em]",
  h3: "text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight leading-snug",
  h4: "text-xl sm:text-2xl lg:text-3xl font-semibold tracking-tight leading-snug",
  h5: "text-lg sm:text-xl lg:text-2xl font-medium tracking-tight leading-snug",
  h6: "text-base sm:text-lg font-medium tracking-tight leading-relaxed",
  p: "text-base font-normal leading-relaxed",
  body: "text-sm sm:text-base font-normal leading-relaxed",
  lead: "text-base sm:text-lg md:text-xl font-normal leading-relaxed",
  muted: "text-xs sm:text-sm font-light leading-relaxed",
  subheading: "text-xs sm:text-sm font-mono tracking-[0.2em] uppercase",
  default: "",
};

const weightClasses = {
  bold: "font-bold",
  semibold: "font-semibold",
  medium: "font-medium",
  regular: "font-normal",
  light: "font-light",
};

// Colors map directly to tokens defined in globals.css
const colorClasses = {
  foreground: "text-foreground",
  primary: "text-primary",
  heading: "text-heading",
  white: "text-white",
  muted: "text-muted",
  gray: "text-gray",
  accent: "text-accent",
  danger: "text-red-500",
  success: "text-emerald-500",
  info: "text-blue-500",
};

const defaultTagForVariant = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  h5: "h5",
  h6: "h6",
  p: "p",
  body: "p",
  lead: "p",
  muted: "p",
  subheading: "div",
};

export function Typography({
  className,
  variant = "p",
  weight,
  color = "foreground",
  as: Component,
  children,
  ...props
}) {
  const Tag = Component || defaultTagForVariant[variant] || "p";

  return (
    <Tag
      className={cn(
        "transition-colors",
        variantClasses[variant] || "",
        weight && weightClasses[weight],
        color && colorClasses[color],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  );
}

// Semantic helper components with intelligent defaults (variant & color already preset)
export const H1 = ({ variant = "h1", as = "h1", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const H2 = ({ variant = "h2", as = "h2", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const H3 = ({ variant = "h3", as = "h3", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const H4 = ({ variant = "h4", as = "h4", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const H5 = ({ variant = "h5", as = "h5", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const H6 = ({ variant = "h6", as = "h6", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);
export const P = ({ variant = "p", as = "p", color = "foreground", ...props }) => (
  <Typography variant={variant} as={as} color={color} {...props} />
);

// Backward compatibility helpers
export const Heading = (props) => (
  <Typography variant={props.variant || "h2"} {...props} />
);
export const Text = (props) => (
  <Typography variant={props.variant || "body"} {...props} />
);

export default Typography;
