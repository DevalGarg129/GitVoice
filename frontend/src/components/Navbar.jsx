import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { SparkleIcon, SunIcon, MoonIcon } from "./Icons";
import { Button } from "./UI";

export default function Navbar({ repoData, onCopy, onSpeak, speaking, copied }) {
  const { dark, toggle } = useTheme();
  const loc = useLocation();

  return (
    <header style={{ position: "sticky", top: 0, zIndex: 100, borderBottom: "1px solid var(--border)", background: "var(--bg)", backdropFilter: "blur(16px)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      {/* Logo */}
      <Link to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "var(--text)" }}>
        <div style={{ width: 30, height: 30, background: "var(--accent)", borderRadius: 8, display: "grid", placeItems: "center" }}>
          <SparkleIcon size={15} style={{ color: "#000" }} />
        </div>
        <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>
          Git<span style={{ color: "var(--accent)" }}>Voice</span>
        </span>
        <span style={{ fontSize: 10, color: "var(--text3)", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 4, padding: "1px 5px" }}>v2.0</span>
      </Link>

      {/* Right actions */}
      <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
        {repoData && (
          <>
            <Button variant="ghost" size="sm" onClick={onCopy}>
              {copied ? <span style={{ color: "var(--accent2)", fontSize: 12 }}>✓ Copied</span> : "Copy Summary"}
            </Button>
            <Button variant="ghost" size="sm" onClick={onSpeak} style={{ color: speaking ? "var(--accent)" : undefined }}>
              {speaking ? (
                <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                  {[8, 14, 18, 14, 8].map((h, i) => (
                    <span key={i} style={{ display: "block", width: 3, height: h, background: "var(--accent)", borderRadius: 2, animation: `pulse 0.5s ease ${i * 0.08}s infinite` }} />
                  ))}
                  Stop
                </span>
              ) : "🔊 Read Aloud"}
            </Button>
            <a href={repoData.html_url} target="_blank" rel="noreferrer">
              <Button variant="ghost" size="sm">GitHub ↗</Button>
            </a>
          </>
        )}
        <Button variant="ghost" size="sm" onClick={toggle} style={{ padding: "7px 10px" }}>
          {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
        </Button>
      </div>
    </header>
  );
}
