// src/components/ui/Textarea.jsx

import { cn } from "@/lib/utils";

const textareaVariants = {
  default:
    "bg-white border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black",
  dark:
    "bg-neutral-900/90 border-neutral-800 text-white placeholder:text-neutral-600 focus:border-white/40 focus:ring-1 focus:ring-white/20",
};

export default function Textarea({
  label,
  error,
  helperText,
  variant = "dark",
  className,
  id,
  rows = 4,
  required = false,
  ...props
}) {
  const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

  return (
    <div className="w-full space-y-2">
      {label && (
        <label
          htmlFor={textareaId}
          className="block text-xs font-mono tracking-wide text-neutral-400 uppercase"
        >
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}

      <textarea
        id={textareaId}
        rows={rows}
        required={required}
        className={cn(
          "w-full p-4 rounded-xl border text-sm transition-all focus:outline-none resize-y disabled:opacity-50 disabled:cursor-not-allowed",
          textareaVariants[variant] || textareaVariants.dark,
          error && "border-red-500 focus:border-red-500",
          className
        )}
        {...props}
      />

      {error ? (
        <p className="text-xs text-red-400 font-mono">{error}</p>
      ) : helperText ? (
        <p className="text-xs text-neutral-500 font-mono">{helperText}</p>
      ) : null}
    </div>
  );
}
