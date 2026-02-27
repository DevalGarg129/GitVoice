import { useState } from "react";
import { detectStack } from "../services/api";
import { Card, Button, Badge, Skeleton, SectionLabel } from "./UI";
import { SparkleIcon } from "./Icons";
import toast from "react-hot-toast";

const CATEGORY_META = {
  frontend: { label: "Frontend",  color: "var(--accent)",  emoji: "🎨" },
  backend:  { label: "Backend",   color: "var(--accent2)", emoji: "⚙️"  },
  database: { label: "Database",  color: "var(--accent4)", emoji: "🗄️"  },
  devops:   { label: "DevOps",    color: "var(--accent3)", emoji: "🚀" },
  testing:  { label: "Testing",   color: "#f7c948",        emoji: "🧪" },
  other:    { label: "Other",     color: "var(--text2)",   emoji: "📦" },
};

export default function StackTab({ url, githubToken }) {
  const [stack, setStack] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await detectStack(url, githubToken);
      setStack(res.data);
      toast.success("Tech stack detected!");
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  if (!stack && !loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>⚙️</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18 }}>Detect Tech Stack</div>
        <div style={{ color: "var(--text2)", fontSize: 14, maxWidth: 400 }}>
          AI scans all repo files to identify frameworks, databases, testing tools and infrastructure.
        </div>
        <Button onClick={handleGenerate}><SparkleIcon size={14} />Detect Stack</Button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[1,2,3,4,5,6].map(i => (
          <Card key={i}>
            <Skeleton width="40%" height={12} style={{ marginBottom: 12 }} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {[1,2,3].map(j => <Skeleton key={j} width={60} height={24} radius={20} />)}
            </div>
          </Card>
        ))}
      </div>
    );
  }

  const categories = Object.entries(stack).filter(([_, items]) => items?.length > 0);

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12, marginBottom: 14 }}>
        {categories.map(([key, items]) => {
          const meta = CATEGORY_META[key] || { label: key, color: "var(--text2)", emoji: "📦" };
          return (
            <Card key={key}>
              <SectionLabel>{meta.emoji} {meta.label}</SectionLabel>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {items.map(item => (
                  <Badge key={item} color={meta.color}>{item}</Badge>
                ))}
              </div>
            </Card>
          );
        })}
      </div>
      <Button variant="ghost" size="sm" onClick={handleGenerate}>
        <SparkleIcon size={13} />Re-detect
      </Button>
    </div>
  );
}
