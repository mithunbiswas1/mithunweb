export default function BrandLogo({ className = "h-5 w-auto", color = "currentColor" }) {
  return (
    <svg
      viewBox="0 0 115 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Mithun Web"
    >
      <text
        x="0"
        y="18.5"
        fill={color}
        style={{
          fontFamily: "var(--font-inter), system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          fontSize: "22px",
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        mithunweb
      </text>
    </svg>
  );
}
