import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { Button } from "../components/UI";
import { SparkleIcon, SunIcon, MoonIcon, ArrowIcon } from "../components/Icons";

const FEATURES = [
  { emoji: "🤖", title: "AI Summary",       desc: "Gemini-powered repo overview, purpose, features and setup guide" },
  { emoji: "⚙️", title: "Stack Detection",  desc: "Auto-detect frontend, backend, database and DevOps tools" },
  { emoji: "🔊", title: "Voice Narration",  desc: "Listen to repo summaries read aloud with browser TTS" },
  { emoji: "🌳", title: "File Explorer",    desc: "Browse full file tree with per-file AI explanations" },
  { emoji: "💬", title: "AI Chat",          desc: "Ask natural-language questions about any codebase" },
  { emoji: "📊", title: "Language Stats",   desc: "Visual breakdown of every language used in the repo" },
  { emoji: "👥", title: "Contributors",     desc: "Top contributors ranked by commits with live GitHub links" },
  { emoji: "📜", title: "Commit History",   desc: "Recent commits with authors, messages and timestamps" },
];

const EXAMPLES = [
  "facebook/react", "vercel/next.js", "microsoft/vscode", "torvalds/linux",
  "openai/openai-python", "shadcn-ui/ui",
];

export default function HomePage() {
  const navigate = useNavigate();
  const { dark, toggle } = useTheme();

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      {/* Navbar */}
      <header style={{ borderBottom: "1px solid var(--border)", padding: "0 24px", height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, background: "var(--bg)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 30, height: 30, background: "var(--accent)", borderRadius: 8, display: "grid", placeItems: "center" }}>
            <SparkleIcon size={15} style={{ color: "#000" }} />
          </div>
          <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: 17, letterSpacing: "-0.5px" }}>
            Git<span style={{ color: "var(--accent)" }}>Voice</span>
          </span>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Button variant="ghost" size="sm" onClick={() => navigate("/analyze")}>Launch App →</Button>
          <Button variant="ghost" size="sm" onClick={toggle} style={{ padding: "7px 10px" }}>
            {dark ? <SunIcon size={14} /> : <MoonIcon size={14} />}
          </Button>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: "0 auto", padding: "64px 24px" }}>
        {/* Hero */}
        <div className="fade-up" style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "var(--accent)", marginBottom: 16 }}>
            AI-Powered · GitHub Analysis · Voice Enabled
          </div>
          <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem, 6vw, 3.8rem)", letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 20 }}>
            Understand any GitHub<br />
            <span style={{ background: "linear-gradient(90deg, var(--accent), var(--accent4), var(--accent2))", backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "gradientFlow 3s ease infinite" }}>
              repo instantly.
            </span>
          </h1>
          <p style={{ color: "var(--text2)", fontSize: 16, maxWidth: 520, margin: "0 auto 36px", lineHeight: 1.7 }}>
            Paste any GitHub URL to get AI summaries, tech stack detection, interactive file exploration, voice explanations and live chat — all in seconds.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Button size="lg" onClick={() => navigate("/analyze")}>
              <SparkleIcon size={16} />Start Analyzing
            </Button>
            <a href="https://github.com/DevalGarg129/GitVoice" target="_blank" rel="noreferrer">
              <Button variant="ghost" size="lg">View on GitHub ↗</Button>
            </a>
          </div>
        </div>

        {/* Features */}
        <div className="fade-up" style={{ marginBottom: 64, animationDelay: "0.1s" }}>
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 24, letterSpacing: "-0.5px", marginBottom: 8 }}>Everything you need</h2>
            <p style={{ color: "var(--text2)", fontSize: 14 }}>A full suite of tools to deeply understand any codebase</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
            {FEATURES.map(f => (
              <div key={f.title} style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 20, transition: "all 0.2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 24px var(--glow)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{f.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 6 }}>{f.title}</div>
                <div style={{ color: "var(--text2)", fontSize: 12, lineHeight: 1.6 }}>{f.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick examples */}
        <div className="fade-up" style={{ textAlign: "center", animationDelay: "0.2s" }}>
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 20, marginBottom: 16 }}>Try a popular repo</h2>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center" }}>
            {EXAMPLES.map(r => (
              <button key={r}
                onClick={() => navigate(`/analyze?url=https://github.com/${r}`)}
                style={{ fontSize: 13, color: "var(--text)", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontFamily: "inherit", fontWeight: 500, transition: "all 0.15s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.color = "var(--accent)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--text)"; }}>
                {r}
              </button>
            ))}
          </div>
        </div>
      </main>

      <footer style={{ borderTop: "1px solid var(--border)", padding: "20px 24px", textAlign: "center", color: "var(--text3)", fontSize: 12 }}>
        GitVoice v2.0 · Built with React, Node.js, Google Gemini AI & MongoDB
      </footer>
    </div>
  );
}
