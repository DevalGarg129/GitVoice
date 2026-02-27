import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { analyzeRepo } from "../services/api";
import { useVoice } from "../hooks/useVoice";

import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import RepoHeader from "../components/RepoHeader";
import StatCards from "../components/StatCards";
import Tabs from "../components/Tabs";
import OverviewTab from "../components/OverviewTab";
import SummaryTab from "../components/SummaryTab";
import StackTab from "../components/StackTab";
import LanguagesTab from "../components/LanguagesTab";
import ContributorsTab from "../components/ContributorsTab";
import CommitsTab from "../components/CommitsTab";
import IssuesTab from "../components/IssuesTab";
import TreeTab from "../components/TreeTab";
import ChatTab from "../components/ChatTab";
import HistorySidebar from "../components/HistorySidebar";

const LOADING_MSGS = [
  "Cloning repo in my brain…",
  "Detecting languages…",
  "Counting stars ⭐",
  "Reading commit history…",
  "Fetching contributors…",
  "Almost there…",
];

export default function AnalyzePage() {
  const [searchParams] = useSearchParams();
  const [url, setUrl] = useState(searchParams.get("url") || "");
  const [githubToken, setGithubToken] = useState(() => localStorage.getItem("gv-token") || "");
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [copied, setCopied] = useState(false);
  const [summary, setSummary] = useState(null);
  const { speaking, speak, stop } = useVoice();

  // Auto-analyze if URL is in query params
  useEffect(() => {
    const urlParam = searchParams.get("url");
    if (urlParam) {
      handleAnalyze(urlParam, "");
    }
  }, []);

  // Save token to localStorage
  useEffect(() => {
    if (githubToken) localStorage.setItem("gv-token", githubToken);
  }, [githubToken]);

  const handleAnalyze = async (repoUrl, token) => {
    const finalUrl = repoUrl || url;
    if (!finalUrl.trim()) { toast.error("Please enter a GitHub URL"); return; }

    setLoading(true);
    setData(null);
    setSummary(null);
    setActiveTab("overview");

    let i = 0;
    const interval = setInterval(() => {
      setLoadingMsg(LOADING_MSGS[i % LOADING_MSGS.length]);
      i++;
    }, 900);

    try {
      const res = await analyzeRepo(finalUrl.trim(), token || githubToken);
      setData(res.data);
      if (res.cached) toast("Loaded from cache", { icon: "📦" });
      else toast.success(`${res.data.repoData.full_name} analyzed!`);
    } catch (e) {
      toast.error(e.message);
    } finally {
      clearInterval(interval);
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!data) return;
    const r = data.repoData;
    const text = `# ${r.full_name}\n${r.description || ""}\n\nStars: ${r.stargazers_count} | Forks: ${r.forks_count} | Language: ${r.language}\nURL: ${r.html_url}`;
    const write = async () => {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for insecure contexts or older browsers
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "absolute";
          ta.style.left = "-9999px";
          document.body.appendChild(ta);
          ta.select();
          document.execCommand("copy");
          document.body.removeChild(ta);
        }
        setCopied(true);
        toast.success("Copied to clipboard!");
        setTimeout(() => setCopied(false), 2500);
      } catch (e) {
        console.error("Copy failed:", e);
        toast.error("Copy failed. Try manually selecting the text.");
      }
    };
    write();
  };

  const handleSpeak = () => {
    if (!data) return;
    if (speaking) { stop(); return; }
    const r = data.repoData;
    const text = `${r.name} by ${r.owner?.login}. ${r.description || "No description."}. Stars: ${r.stargazers_count}. Forks: ${r.forks_count}. Primary language: ${r.language || "unknown"}. Open issues: ${r.open_issues_count}.`;
    speak(text);
  };

  const renderTab = () => {
    if (!data) return null;
    const { repoData, langBreakdown, contribs, commits, issues } = data;
    switch (activeTab) {
      case "overview":     return <OverviewTab repoData={repoData} />;
      case "summary":      return <SummaryTab url={url} githubToken={githubToken} repoData={repoData} onSummaryLoad={setSummary} />;
      case "stack":        return <StackTab url={url} githubToken={githubToken} />;
      case "languages":    return <LanguagesTab langBreakdown={langBreakdown} />;
      case "contributors": return <ContributorsTab contribs={contribs} />;
      case "commits":      return <CommitsTab commits={commits} />;
      case "issues":       return <IssuesTab issues={issues} repoData={repoData} />;
      case "tree":         return <TreeTab url={url} githubToken={githubToken} repoData={repoData} />;
      case "chat":         return <ChatTab repoData={repoData} summary={summary} />;
      default:             return null;
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text)" }}>
      <Navbar
        repoData={data?.repoData}
        onCopy={handleCopy}
        onSpeak={handleSpeak}
        speaking={speaking}
        copied={copied}
      />

      <main style={{ maxWidth: 960, margin: "0 auto", padding: "28px 20px" }}>
        {/* Search */}
        <div style={{ marginBottom: 28 }}>
          <SearchBar
            onAnalyze={(u, t) => { setUrl(u); handleAnalyze(u, t); }}
            loading={loading}
            loadingMsg={loadingMsg}
          />
        </div>

        {/* Results */}
        {data && (
          <div className="fade-up">
            <RepoHeader repoData={data.repoData} />
            <div style={{ marginBottom: 14 }}>
              <StatCards repoData={data.repoData} />
            </div>
            <Tabs active={activeTab} onChange={setActiveTab} />
            {renderTab()}

            {/* Footer */}
            <div style={{ marginTop: 16, display: "flex", gap: 8, justifyContent: "flex-end", color: "var(--text3)", fontSize: 11, alignItems: "center" }}>
              <span>Data from GitHub API</span>
              <span>·</span>
              <a href={data.repoData.html_url} target="_blank" rel="noreferrer" style={{ color: "var(--accent)" }}>
                View on GitHub ↗
              </a>
            </div>
          </div>
        )}

        {/* Empty state */}
        {!data && !loading && (
          <div className="fade-up" style={{ textAlign: "center", padding: "56px 20px" }}>
            <div style={{ fontSize: 64, marginBottom: 16 }}>🔍</div>
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 22, marginBottom: 10 }}>
              Enter a GitHub URL to get started
            </h2>
            <p style={{ color: "var(--text2)", fontSize: 14 }}>
              Supports any public repository. Add a GitHub token for private repos or to avoid rate limits.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
