import { StarIcon, ForkIcon, EyeIcon, IssueIcon, CodeIcon, BookIcon, ClockIcon } from "./Icons";
import { Skeleton } from "./UI";

const LANG_COLORS = {
  JavaScript:"#f7df1e",TypeScript:"#3178c6",Python:"#3572A5",Java:"#b07219",
  "C++":"#f34b7d",Go:"#00ADD8",Rust:"#dea584",Ruby:"#701516",PHP:"#4F5D95",
  CSS:"#563d7c",HTML:"#e34c26",Swift:"#fa7343",Kotlin:"#A97BFF",
  Dart:"#00B4AB",Shell:"#89e051",default:"#8b949e"
};
const getLang = l => LANG_COLORS[l] || LANG_COLORS.default;

const fmt = n => n >= 1000 ? `${(n/1000).toFixed(1)}k` : String(n);

const timeAgo = (d) => {
  const s = Math.floor((Date.now() - new Date(d)) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s/60)}m ago`;
  if (s < 86400) return `${Math.floor(s/3600)}h ago`;
  if (s < 2592000) return `${Math.floor(s/86400)}d ago`;
  return new Date(d).toLocaleDateString();
};

export { getLang, fmt, timeAgo };

export default function StatCards({ repoData, loading }) {
  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px" }}>
            <Skeleton width="55%" height={10} style={{ marginBottom: 8 }} />
            <Skeleton width="40%" height={22} />
          </div>
        ))}
      </div>
    );
  }
  if (!repoData) return null;

  const stats = [
    { label: "Stars",       value: fmt(repoData.stargazers_count), icon: <StarIcon size={14} />,   color: "#f7c948" },
    { label: "Forks",       value: fmt(repoData.forks_count),      icon: <ForkIcon size={14} />,   color: "var(--accent)" },
    { label: "Watchers",    value: fmt(repoData.watchers_count),   icon: <EyeIcon size={14} />,    color: "var(--accent4)" },
    { label: "Open Issues", value: fmt(repoData.open_issues_count),icon: <IssueIcon size={14} />,  color: "var(--accent3)" },
    { label: "Language",    value: repoData.language || "N/A",     icon: <CodeIcon size={14} />,   color: getLang(repoData.language) },
    { label: "Last Push",   value: timeAgo(repoData.pushed_at),    icon: <ClockIcon size={14} />,  color: "var(--accent2)" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px,1fr))", gap: 10 }}>
      {stats.map(({ label, value, icon, color }) => (
        <div key={label}
          style={{ background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: "14px 18px", transition: "all 0.2s", cursor: "default" }}
          onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.borderColor = color; e.currentTarget.style.boxShadow = `0 6px 20px ${color}22`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, color, fontSize: 12, marginBottom: 6 }}>{icon}{label}</div>
          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18 }}>{value}</div>
        </div>
      ))}
    </div>
  );
}
