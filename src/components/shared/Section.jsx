// src/components/shared/Section.jsx

export default function Section({
  id,
  theme = "light",
  className = "",
  children,
}) {
  const isDark = theme === "dark";

  return (
    <section
      id={id}
      data-theme={theme}
      className={`py-28 px-4 sm:px-6 ${isDark ? "bg-black text-white" : ""} ${className}`.trim()}
    >
      <div className="max-w-[1400px] mx-auto w-[90%]">
        {children}
      </div>
    </section>
  );
}
