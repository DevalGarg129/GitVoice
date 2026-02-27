import { SectionLabel } from "./UI";
import { timeAgo } from "./StatCards";

export default function CommitsTab({ commits }) {
  if (!commits?.length) {
    return <div style={{ color: "var(--text2)", fontSize: 14 }}>No commit data available.</div>;
  }
  return (
    <div>
      <SectionLabel>Recent Commits</SectionLabel>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {commits.map((c, i) => (
          <div key={c.sha} style={{ display: "flex", gap: 12, padding: "13px 0", borderBottom: i < commits.length - 1 ? "1px solid var(--border)" : "none" }}>
            <img src={c.author?.avatar_url || "https://avatars.githubusercontent.com/u/0"} alt=""
              style={{ width: 30, height: 30, borderRadius: "50%", border: "2px solid var(--border)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <a href={c.html_url} target="_blank" rel="noreferrer"
                style={{ display: "block", fontWeight: 500, fontSize: 13, color: "var(--text)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = "var(--accent)"}
                onMouseLeave={e => e.target.style.color = "var(--text)"}>
                {c.commit.message.split("\n")[0]}
              </a>
              <div style={{ display: "flex", gap: 8, marginTop: 4, color: "var(--text3)", fontSize: 11, flexWrap: "wrap" }}>
                <span style={{ color: "var(--text2)" }}>{c.commit.author?.name}</span>
                <span>·</span>
                <span>{timeAgo(c.commit.author?.date)}</span>
                <span>·</span>
                <a href={c.html_url} target="_blank" rel="noreferrer"
                  style={{ fontFamily: "monospace", color: "var(--accent)", fontSize: 11, textDecoration: "none" }}>
                  {c.sha.slice(0, 7)}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
