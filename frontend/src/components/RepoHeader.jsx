import { Badge } from "./UI";
import { BookIcon } from "./Icons";

export default function RepoHeader({ repoData }) {
  if (!repoData) return null;
  return (
    <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, marginBottom: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
            <a href={repoData.html_url} target="_blank" rel="noreferrer"
              style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, color: "var(--accent)", textDecoration: "none" }}>
              {repoData.full_name}
            </a>
            {repoData.private   && <Badge color="var(--accent4)">Private</Badge>}
            {repoData.fork      && <Badge color="var(--text2)">Fork</Badge>}
            {repoData.archived  && <Badge color="var(--accent3)">Archived</Badge>}
          </div>
          <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.6, maxWidth: 640, marginBottom: repoData.topics?.length ? 10 : 0 }}>
            {repoData.description || "No description provided."}
          </p>
          {repoData.topics?.length > 0 && (
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {repoData.topics.map(t => <Badge key={t}>#{t}</Badge>)}
            </div>
          )}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6, alignItems: "flex-end" }}>
          {repoData.license && (
            <Badge color="var(--text2)"><BookIcon size={11} />{repoData.license.spdx_id}</Badge>
          )}
          {repoData.homepage && (
            <a href={repoData.homepage} target="_blank" rel="noreferrer"
              style={{ fontSize: 12, color: "var(--accent2)" }}>
              🌐 {new URL(repoData.homepage.startsWith("http") ? repoData.homepage : `https://${repoData.homepage}`).hostname}
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
