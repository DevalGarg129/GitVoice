import { SectionLabel } from "./UI";
import { CommitIcon } from "./Icons";

export default function ContributorsTab({ contribs }) {
  if (!contribs?.length) {
    return <div style={{ color: "var(--text2)", fontSize: 14 }}>No contributor data available.</div>;
  }

  const max = contribs[0]?.contributions || 1;

  return (
    <div>
      <SectionLabel>Top Contributors</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {contribs.map((c, i) => (
          <div key={c.login} style={{ display: "flex", alignItems: "center", gap: 12, background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 10, padding: "12px 14px", transition: "border-color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.borderColor = "var(--accent)"}
            onMouseLeave={e => e.currentTarget.style.borderColor = "var(--border)"}>
            <span style={{ color: "var(--text3)", fontSize: 12, width: 22, textAlign: "center", fontWeight: 700 }}>#{i+1}</span>
            <img src={c.avatar_url} alt={c.login} style={{ width: 34, height: 34, borderRadius: "50%", border: "2px solid var(--border)" }} />
            <a href={c.html_url} target="_blank" rel="noreferrer"
              style={{ flex: 1, fontWeight: 600, fontSize: 13, color: "var(--text)", textDecoration: "none" }}
              onMouseEnter={e => e.target.style.color = "var(--accent)"}
              onMouseLeave={e => e.target.style.color = "var(--text)"}>
              {c.login}
            </a>
            <div style={{ flex: 2, height: 6, background: "var(--bg4)", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ width: `${(c.contributions / max) * 100}%`, height: "100%", background: "var(--accent)", borderRadius: 3 }} />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, color: "var(--text2)", fontSize: 12, width: 90, justifyContent: "flex-end" }}>
              <CommitIcon size={12} />{c.contributions.toLocaleString()} commits
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
