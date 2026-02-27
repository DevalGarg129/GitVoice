import { useRef, useState } from "react";
import { Input, Button } from "./UI";
import { SearchIcon, KeyIcon, SparkleIcon } from "./Icons";
import { Spinner } from "./UI";

const PLACEHOLDER_URLS = [
  "https://github.com/facebook/react",
  "https://github.com/vercel/next.js",
  "https://github.com/microsoft/vscode",
  "https://github.com/torvalds/linux",
];

export default function SearchBar({ onAnalyze, loading, loadingMsg }) {
  const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);
  const [tokenVisible, setTokenVisible] = useState(false);
  const inputRef = useRef();

  const handleSubmit = () => {
    if (!url.trim()) { inputRef.current?.focus(); return; }
    onAnalyze(url.trim(), token.trim());
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 720, margin: "0 auto" }}>
      {/* Main search row */}
      <div style={{ display: "flex", gap: 8 }}>
        <div style={{ position: "relative", flex: 1 }}>
          <SearchIcon size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--text3)", pointerEvents: "none" }} />
          <Input
            ref={inputRef}
            style={{ paddingLeft: 36 }}
            placeholder="https://github.com/owner/repository"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleSubmit()}
            disabled={loading}
          />
        </div>
        <Button onClick={handleSubmit} disabled={loading || !url.trim()} size="md">
          {loading ? <><Spinner size={14} />{loadingMsg || "Analyzing…"}</> : <><SparkleIcon size={14} />Analyze</>}
        </Button>
      </div>

      {/* Token row */}
      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
        <KeyIcon size={13} style={{ color: "var(--text3)", flexShrink: 0 }} />
        <Input
          type={tokenVisible ? "text" : "password"}
          placeholder="GitHub token (optional — prevents rate limiting)"
          value={token}
          onChange={e => setToken(e.target.value)}
          style={{ padding: "7px 12px", fontSize: 12 }}
        />
        <Button variant="ghost" size="sm" onClick={() => setTokenVisible(v => !v)} style={{ whiteSpace: "nowrap" }}>
          {tokenVisible ? "Hide" : "Show"}
        </Button>
      </div>

      {/* Quick examples */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
        <span style={{ fontSize: 11, color: "var(--text3)" }}>Try:</span>
        {PLACEHOLDER_URLS.map(u => (
          <button key={u}
            onClick={() => setUrl(u)}
            style={{ fontSize: 11, color: "var(--text2)", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, padding: "3px 10px", cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.target.style.color = "var(--accent)"; e.target.style.borderColor = "var(--accent)"; }}
            onMouseLeave={e => { e.target.style.color = "var(--text2)"; e.target.style.borderColor = "var(--border)"; }}>
            {u.replace("https://github.com/", "")}
          </button>
        ))}
      </div>
    </div>
  );
}
