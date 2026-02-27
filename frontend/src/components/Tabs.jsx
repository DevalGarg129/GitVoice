const TABS = [
  { id: "overview",      label: "Overview",      emoji: "✨" },
  { id: "summary",       label: "AI Summary",    emoji: "🤖" },
  { id: "stack",         label: "Tech Stack",    emoji: "⚙️"  },
  { id: "languages",     label: "Languages",     emoji: "📊" },
  { id: "contributors",  label: "Contributors",  emoji: "👥" },
  { id: "commits",       label: "Commits",       emoji: "📜" },
  { id: "issues",        label: "Issues",        emoji: "🐛" },
  { id: "tree",          label: "File Tree",     emoji: "🌳" },
  { id: "chat",          label: "AI Chat",       emoji: "💬" },
];

export default function Tabs({ active, onChange }) {
  return (
    <div style={{ display: "flex", gap: 3, overflowX: "auto", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 4, marginBottom: 16, scrollbarWidth: "none" }}>
      <style>{`::-webkit-scrollbar{display:none}`}</style>
      {TABS.map(t => (
        <button key={t.id}
          onClick={() => onChange(t.id)}
          style={{ border: "none", cursor: "pointer", fontFamily: "inherit", fontSize: 12, fontWeight: active === t.id ? 600 : 500, padding: "7px 13px", borderRadius: 7, background: active === t.id ? "var(--bg3)" : "transparent", color: active === t.id ? "var(--accent)" : "var(--text2)", transition: "all 0.15s", whiteSpace: "nowrap", display: "flex", alignItems: "center", gap: 5 }}>
          <span>{t.emoji}</span>{t.label}
        </button>
      ))}
    </div>
  );
}
