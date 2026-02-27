import { SectionLabel } from "./UI";
import { timeAgo } from "./StatCards";

export default function OverviewTab({ repoData }) {
  if (!repoData) return null;

  const rows = [
    ["Created",        timeAgo(repoData.created_at)],
    ["Last Updated",   timeAgo(repoData.updated_at)],
    ["Last Push",      timeAgo(repoData.pushed_at)],
    ["Default Branch", repoData.default_branch],
    ["Visibility",     repoData.private ? "Private 🔒" : "Public 🌐"],
    ["Stars",          repoData.stargazers_count.toLocaleString()],
    ["Forks",          repoData.forks_count.toLocaleString()],
    ["Watchers",       repoData.watchers_count.toLocaleString()],
    ["Open Issues",    repoData.open_issues_count.toLocaleString()],
    ["Size",           repoData.size > 1024 ? `${(repoData.size/1024).toFixed(1)} MB` : `${repoData.size} KB`],
    ["Has Wiki",       repoData.has_wiki ? "Yes" : "No"],
    ["Has Projects",   repoData.has_projects ? "Yes" : "No"],
    ["License",        repoData.license?.name || "None"],
  ];

  return (
    <div>
      <SectionLabel>Repository Details</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 8 }}>
        {rows.map(([k, v]) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 8, padding: "10px 14px" }}>
            <span style={{ color: "var(--text2)", fontSize: 12 }}>{k}</span>
            <span style={{ fontWeight: 600, fontSize: 12, color: "var(--text)" }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
