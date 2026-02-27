import React, { forwardRef } from "react";

// ── Skeleton ──────────────────────────────────────────────────────────────────
export const Skeleton = ({ width = "100%", height = 16, radius = 6, style = {} }) => (
  <div
    style={{
      width,
      height,
      borderRadius: radius,
      background: "var(--skeleton)",
      animation: "shimmer 1.4s ease infinite",
      ...style
    }}
  />
);

// ── Spinner ───────────────────────────────────────────────────────────────────
export const Spinner = ({ size = 18 }) => (
  <div
    style={{
      width: size,
      height: size,
      border: "2px solid var(--border)",
      borderTopColor: "var(--accent)",
      borderRadius: "50%",
      animation: "spin 0.7s linear infinite",
      flexShrink: 0
    }}
  />
);

// ── Badge ─────────────────────────────────────────────────────────────────────
export const Badge = ({ children, color = "var(--accent)", bg, style = {} }) => (
  <span
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: 4,
      fontSize: 11,
      fontWeight: 600,
      padding: "2px 8px",
      borderRadius: 20,
      background: bg || `${color}1a`,
      color,
      border: `1px solid ${color}33`,
      ...style
    }}
  >
    {children}
  </span>
);

// ── Card ──────────────────────────────────────────────────────────────────────
export const Card = ({ children, style = {}, className = "", hover = true }) => (
  <div
    style={{
      background: "var(--bg2)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius)",
      padding: 20,
      transition: "border-color 0.2s, box-shadow 0.2s",
      ...style
    }}
    onMouseEnter={
      hover
        ? e => {
            e.currentTarget.style.borderColor = "var(--accent)";
            e.currentTarget.style.boxShadow = "0 0 0 1px var(--glow)";
          }
        : undefined
    }
    onMouseLeave={
      hover
        ? e => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.boxShadow = "none";
          }
        : undefined
    }
    className={className}
  >
    {children}
  </div>
);

// ── Button ────────────────────────────────────────────────────────────────────
export const Button = ({
  children,
  variant = "primary",
  size = "md",
  onClick,
  disabled,
  style = {},
  ...rest
}) => {
  const base = {
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    borderRadius: 8,
    fontFamily: "inherit",
    fontWeight: 600,
    display: "inline-flex",
    alignItems: "center",
    gap: 6,
    transition: "all 0.15s",
    opacity: disabled ? 0.5 : 1
  };

  const sizes = {
    sm: { fontSize: 12, padding: "6px 12px" },
    md: { fontSize: 13, padding: "9px 18px" },
    lg: { fontSize: 14, padding: "12px 24px" }
  };

  const variants = {
    primary: { background: "var(--accent)", color: "#000" },
    ghost: {
      background: "var(--bg3)",
      color: "var(--text2)",
      border: "1px solid var(--border)"
    },
    danger: { background: "var(--accent3)", color: "#fff" },
    success: { background: "var(--accent2)", color: "#000" }
  };

  return (
    <button
      style={{ ...base, ...sizes[size], ...variants[variant], ...style }}
      onClick={onClick}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};

// ── Input (FIXED WITH forwardRef) ────────────────────────────────────────────
export const Input = forwardRef(({ style = {}, ...rest }, ref) => (
  <input
    ref={ref}
    style={{
      background: "var(--bg3)",
      border: "1px solid var(--border)",
      borderRadius: 8,
      color: "var(--text)",
      fontFamily: "inherit",
      fontSize: 13,
      padding: "10px 14px",
      outline: "none",
      width: "100%",
      transition: "border-color 0.2s, box-shadow 0.2s",
      ...style
    }}
    onFocus={e => {
      e.target.style.borderColor = "var(--accent)";
      e.target.style.boxShadow = "0 0 0 3px var(--glow)";
    }}
    onBlur={e => {
      e.target.style.borderColor = "var(--border)";
      e.target.style.boxShadow = "none";
    }}
    {...rest}
  />
));

Input.displayName = "Input";

// ── SectionLabel ─────────────────────────────────────────────────────────────
export const SectionLabel = ({ children }) => (
  <div
    style={{
      fontSize: 11,
      fontWeight: 600,
      textTransform: "uppercase",
      letterSpacing: "1.5px",
      color: "var(--text3)",
      marginBottom: 14
    }}
  >
    {children}
  </div>
);