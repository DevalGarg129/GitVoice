import { useState, useRef, useEffect } from "react";
import { chatWithRepo } from "../services/api";
import { Input, Button } from "./UI";
import { SparkleIcon, SendIcon } from "./Icons";
import { Spinner } from "./UI";
import toast from "react-hot-toast";

const SUGGESTED = [
  "What does this repo do?",
  "How do I get started?",
  "What's the main tech stack?",
  "What are the key features?",
  "How is the code structured?",
  "What problems does this solve?",
];

export default function ChatTab({ repoData, summary }) {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef();

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text) => {
    const userMsg = (text || input).trim();
    if (!userMsg || !repoData) return;
    setInput("");
    const newMessages = [...messages, { role: "user", content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const repoContext = {
        fullName: repoData.full_name,
        description: repoData.description,
        language: repoData.language,
        stars: repoData.stargazers_count,
        forks: repoData.forks_count,
        topics: repoData.topics,
        summary: summary?.overview || "",
        techStack: summary?.techStack || [],
      };
      const res = await chatWithRepo(newMessages, repoContext);
      setMessages(m => [...m, { role: "assistant", content: res.data.reply }]);
    } catch (e) {
      toast.error(e.message);
      setMessages(m => [...m, { role: "assistant", content: `Error: ${e.message}` }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", overflow: "hidden" }}>
      {/* Header */}
      <div style={{ padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent2)", animation: "pulse 2s ease infinite" }} />
        <span style={{ fontWeight: 600, fontSize: 13 }}>Chat with AI about {repoData?.name}</span>
        {messages.length > 0 && (
          <button onClick={() => setMessages([])}
            style={{ marginLeft: "auto", background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 11 }}>
            Clear
          </button>
        )}
      </div>

      {/* Messages */}
      <div style={{ height: 380, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {messages.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginTop: 30, textAlign: "center" }}>
            <SparkleIcon size={28} style={{ color: "var(--accent)", opacity: 0.6 }} />
            <div style={{ color: "var(--text2)", fontSize: 13 }}>Ask anything about this repository</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, justifyContent: "center", maxWidth: 480 }}>
              {SUGGESTED.map(q => (
                <button key={q} onClick={() => handleSend(q)}
                  style={{ fontSize: 12, color: "var(--text2)", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: 20, padding: "5px 12px", cursor: "pointer", transition: "all 0.15s" }}
                  onMouseEnter={e => { e.target.style.color = "var(--accent)"; e.target.style.borderColor = "var(--accent)"; }}
                  onMouseLeave={e => { e.target.style.color = "var(--text2)"; e.target.style.borderColor = "var(--border)"; }}>
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{
              maxWidth: "78%", padding: "10px 14px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
              background: m.role === "user" ? "var(--accent)" : "var(--bg3)",
              border: m.role === "user" ? "none" : "1px solid var(--border)",
              color: m.role === "user" ? "#000" : "var(--text)",
              fontSize: 13, lineHeight: 1.6, whiteSpace: "pre-wrap",
            }}>
              {m.content}
            </div>
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 8, alignItems: "center", padding: "10px 14px", background: "var(--bg3)", border: "1px solid var(--border)", borderRadius: "12px 12px 12px 2px", maxWidth: "60%", color: "var(--text2)", fontSize: 12 }}>
            <Spinner size={14} />Thinking…
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div style={{ padding: "12px 14px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
        <Input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
          placeholder="Ask about architecture, setup, tech stack…"
          style={{ flex: 1, padding: "9px 14px", fontSize: 13 }}
          disabled={loading}
        />
        <Button onClick={() => handleSend()} disabled={loading || !input.trim()} style={{ padding: "9px 16px" }}>
          <SendIcon size={13} />
        </Button>
      </div>
    </div>
  );
}
