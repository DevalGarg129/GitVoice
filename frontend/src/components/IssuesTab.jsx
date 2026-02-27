import { SectionLabel } from "./UI";
import { timeAgo } from "./StatCards";

export default function IssuesTab({ issues, repoData }) {
  if (!issues) return null;

  if (issues.length === 0) {
    return (
      <div style={{ padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40, marginBottom: 12 }}>🎉</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, color: "var(--accent2)" }}>No open issues!</div>
        <div style={{ color: "var(--text2)", fontSize: 14, marginTop: 6 }}>This repo is in great health.</div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <SectionLabel style={{ margin: 0 }}>Open Issues ({repoData?.open_issues_count})</SectionLabel>
        <a href={`${repoData?.html_url}/issues`} target="_blank" rel="noreferrer"
          style={{ fontSize: 12, color: "var(--accent)" }}>
          View all ↗
        </a>
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        {issues.map((issue, i) => (
          <div key={issue.id} style={{ padding: "12px 0", borderBottom: i < issues.length - 1 ? "1px solid var(--border)" : "none" }}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <span style={{ color: "var(--accent2)", marginTop: 1, fontSize: 16 }}>◎</span>
              <div style={{ flex: 1 }}>
                <a href={issue.html_url} target="_blank" rel="noreferrer"
                  style={{ fontWeight: 500, fontSize: 13, color: "var(--text)", textDecoration: "none" }}
                  onMouseEnter={e => e.target.style.color = "var(--accent)"}
                  onMouseLeave={e => e.target.style.color = "var(--text)"}>
                  {issue.title}
                </a>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginTop: 6 }}>
                  {issue.labels?.map(l => (
                    <span key={l.id} style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 20, background: `#${l.color}22`, color: `#${l.color}`, border: `1px solid #${l.color}44` }}>
                      {l.name}
                    </span>
                  ))}
                </div>
                <div style={{ color: "var(--text3)", fontSize: 11, marginTop: 5 }}>
                  #{issue.number} · opened {timeAgo(issue.created_at)} by {issue.user?.login}
                  {issue.comments > 0 && ` · ${issue.comments} comment${issue.comments > 1 ? "s" : ""}`}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
