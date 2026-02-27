import { useState } from "react";
import { summarizeRepo } from "../services/api";
import { Card, Button, Badge, Skeleton, SectionLabel } from "./UI";
import { SparkleIcon } from "./Icons";
import toast from "react-hot-toast";

export default function SummaryTab({ url, githubToken, repoData }) {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await summarizeRepo(url, githubToken);
      setSummary(res.data);
      toast.success(res.cached ? "Loaded from cache" : "AI summary generated!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!summary && !loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🤖</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18 }}>Generate AI Summary</div>
        <div style={{ color: "var(--text2)", fontSize: 14, maxWidth: 400 }}>
          Get a comprehensive AI-powered analysis including overview, key features, tech stack, and getting-started guide.
        </div>
        <Button onClick={handleGenerate}>
          <SparkleIcon size={14} />Generate with Gemini AI
        </Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {[1,2,3].map(i => (
          <Card key={i}>
            <Skeleton width="30%" height={12} style={{ marginBottom: 12 }} />
            <Skeleton height={10} style={{ marginBottom: 8 }} />
            <Skeleton width="85%" height={10} style={{ marginBottom: 8 }} />
            <Skeleton width="70%" height={10} />
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Overview */}
      <Card>
        <SectionLabel>Overview</SectionLabel>
        <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{summary.overview}</p>
      </Card>

      {/* Purpose */}
      {summary.purpose && (
        <Card>
          <SectionLabel>Who is this for?</SectionLabel>
          <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{summary.purpose}</p>
        </Card>
      )}

      {/* Key Features */}
      {summary.keyFeatures?.length > 0 && (
        <Card>
          <SectionLabel>Key Features</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {summary.keyFeatures.map((f, i) => (
              <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <span style={{ color: "var(--accent)", marginTop: 1 }}>✦</span>
                <span style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.5 }}>{f}</span>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Getting Started */}
      {summary.gettingStarted && (
        <Card>
          <SectionLabel>Getting Started</SectionLabel>
          <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{summary.gettingStarted}</p>
        </Card>
      )}

      {/* Use Cases */}
      {summary.useCases?.length > 0 && (
        <Card>
          <SectionLabel>Use Cases</SectionLabel>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {summary.useCases.map((u, i) => (
              <Badge key={i} color="var(--accent4)">{u}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Code Quality */}
      {summary.codeQuality && (
        <Card>
          <SectionLabel>Code Quality Assessment</SectionLabel>
          <p style={{ color: "var(--text2)", fontSize: 14, lineHeight: 1.7 }}>{summary.codeQuality}</p>
        </Card>
      )}

      {/* Tags */}
      {summary.tags?.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {summary.tags.map(t => <Badge key={t}>#{t}</Badge>)}
        </div>
      )}

      <Button variant="ghost" size="sm" onClick={handleGenerate} style={{ alignSelf: "flex-start" }}>
        <SparkleIcon size={13} />Regenerate
      </Button>
    </div>
  );
}
