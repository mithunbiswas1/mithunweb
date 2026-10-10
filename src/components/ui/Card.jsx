// src/components/ui/Card.jsx

import { cn } from "@/lib/utils";

export function Card({ className, variant = "default", children, ...props }) {
  const variantStyles = {
    default: "bg-white border border-neutral-200/80 shadow-xs",
    dark: "bg-[#0c0c0c] border border-white/10 text-white shadow-2xl",
    neutral: "bg-neutral-50/60 border border-neutral-200/80",
    ghost: "bg-transparent border-none shadow-none",
  };

  return (
    <div
      className={cn(
        "rounded-2xl transition-all duration-300",
        variantStyles[variant] || variantStyles.default,
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pb-3 space-y-1.5", className)} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className, children, ...props }) {
  return (
    <h3 className={cn("text-xl font-bold tracking-tight text-neutral-950", className)} {...props}>
      {children}
    </h3>
  );
}

export function CardDescription({ className, children, ...props }) {
  return (
    <p className={cn("text-sm text-neutral-500 font-light leading-relaxed", className)} {...props}>
      {children}
    </p>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pt-0", className)} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className, children, ...props }) {
  return (
    <div className={cn("p-6 pt-0 flex items-center", className)} {...props}>
      {children}
    </div>
  );
}

export default Card;
