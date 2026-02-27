import { getLang } from "./StatCards";
import { SectionLabel } from "./UI";

export default function LanguagesTab({ langBreakdown }) {
  if (!langBreakdown?.length) {
    return <div style={{ color: "var(--text2)", fontSize: 14 }}>No language data available.</div>;
  }

  return (
    <div>
      <SectionLabel>Language Breakdown</SectionLabel>

      {/* Stacked bar */}
      <div style={{ display: "flex", height: 14, borderRadius: 7, overflow: "hidden", marginBottom: 24, gap: 2 }}>
        {langBreakdown.map(l => (
          <div key={l.name} title={`${l.name}: ${l.pct}%`}
            style={{ width: `${l.pct}%`, background: getLang(l.name), minWidth: l.pct > 0 ? 4 : 0, transition: "width 1s ease" }} />
        ))}
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {langBreakdown.map(l => (
          <div key={l.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: getLang(l.name), flexShrink: 0 }} />
            <span style={{ flex: "0 0 110px", fontSize: 13, fontWeight: 500 }}>{l.name}</span>
            <div style={{ flex: 1, height: 6, background: "var(--bg3)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${l.pct}%`, height: "100%", background: getLang(l.name), borderRadius: 3, transition: "width 1.2s ease" }} />
            </div>
            <span style={{ color: "var(--text2)", fontSize: 12, width: 42, textAlign: "right" }}>{l.pct}%</span>
            <span style={{ color: "var(--text3)", fontSize: 11, width: 70, textAlign: "right" }}>
              {l.bytes > 1048576 ? `${(l.bytes/1048576).toFixed(1)}MB` : `${(l.bytes/1024).toFixed(0)}KB`}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
