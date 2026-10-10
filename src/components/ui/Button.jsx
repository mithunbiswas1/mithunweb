// src/components/ui/Button.jsx

import Link from "next/link";
import { cn } from "@/lib/utils";

const variantClasses = {
  default: "bg-black text-white hover:bg-neutral-800 shadow-sm",
  white: "bg-white text-black hover:bg-neutral-200 shadow-sm",
  secondary: "bg-neutral-100 text-neutral-800 hover:bg-neutral-200",
  outline: "border border-neutral-300 bg-transparent text-neutral-900 hover:bg-neutral-100",
  darkOutline: "border border-neutral-800 bg-neutral-900/80 text-white hover:border-neutral-600",
  ghost: "bg-transparent text-neutral-800 hover:bg-neutral-100",
  dark: "bg-neutral-900 text-white hover:bg-neutral-800 border border-neutral-800",
  lime: "bg-[#cdff59] text-black hover:bg-[#bcf148] shadow-md",
  link: "bg-transparent text-neutral-900 hover:underline p-0 h-auto",
};

const sizeClasses = {
  sm: "px-3.5 py-1.5 text-xs",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
  icon: "h-9 w-9 p-0 flex items-center justify-center",
};

export default function Button({
  children,
  className,
  variant = "default",
  size = "md",
  href,
  rounded = "full",
  disabled = false,
  type = "button",
  onClick,
  ...props
}) {
  const roundedClass = rounded === "full" ? "rounded-full" : rounded === "lg" ? "rounded-xl" : "rounded-lg";

  const baseClasses = cn(
    "inline-flex items-center justify-center font-medium tracking-wide transition-all duration-200 select-none cursor-pointer active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none disabled:active:scale-100",
    variantClasses[variant] || variantClasses.default,
    sizeClasses[size] || sizeClasses.md,
    roundedClass,
    className
  );

  if (href) {
    return (
      <Link href={href} className={baseClasses} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={baseClasses}
      {...props}
    >
      {children}
    </button>
  );
}

export const LinkButton = ({ href, ...props }) => <Button href={href} {...props} />;

export { Button };
