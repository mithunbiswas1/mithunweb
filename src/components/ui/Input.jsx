// src/components/ui/Input.jsx

import { forwardRef } from "react";
import { cn } from "@/lib/utils";

const inputVariants = {
  default:
    "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black",
  dark:
    "bg-neutral-900/90 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white/40 focus:ring-1 focus:ring-white/20",
};

const Input = forwardRef(
  (
    {
      value,
      onChange = () => {},
      label,
      id,
      name,
      placeholder,
      type = "text",
      variant = "dark",
      className,
      prefix,
      suffix,
      error,
      helperText,
      required = false,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-2">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-mono tracking-wide text-neutral-400 uppercase"
          >
            {label} {required && <span className="text-red-400">*</span>}
          </label>
        )}

        <div className="relative w-full">
          {/* Prefix (Left Icon / Adornment) */}
          {prefix && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none text-neutral-500">
              {prefix}
            </div>
          )}

          <input
            ref={ref}
            id={inputId}
            name={name}
            type={type}
            value={value ?? ""}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            aria-invalid={!!error}
            className={cn(
              "w-full h-12 px-4 rounded-xl border text-sm transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed",
              inputVariants[variant] || inputVariants.dark,
              prefix ? "pl-11" : "",
              suffix ? "pr-11" : "",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />

          {/* Suffix (Right Icon / Adornment) */}
          {suffix && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3.5 pointer-events-none text-neutral-500">
              {suffix}
            </div>
          )}
        </div>

        {error ? (
          <p className="text-xs text-red-400 font-mono">{error}</p>
        ) : helperText ? (
          <p className="text-xs text-neutral-500 font-mono">{helperText}</p>
        ) : null}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
export { Input };
