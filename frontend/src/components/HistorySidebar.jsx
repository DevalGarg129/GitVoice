import { useEffect, useState } from "react";
import { getHistory, deleteHistory, clearHistory } from "../services/api";
import { Button } from "./UI";
import { HistoryIcon, TrashIcon, StarIcon } from "./Icons";
import toast from "react-hot-toast";
import { fmt } from "./StatCards";

export default function HistorySidebar({ onSelect }) {
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) loadHistory();
  }, [open]);

  const loadHistory = async () => {
    try {
      const res = await getHistory();
      setHistory(res.data);
    } catch {}
  };

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await deleteHistory(id);
      setHistory(h => h.filter(x => x._id !== id));
    } catch {}
  };

  const handleClear = async () => {
    try {
      await clearHistory();
      setHistory([]);
      toast.success("History cleared");
    } catch {}
  };

  return (
    <div style={{ position: "relative" }}>
      <Button variant="ghost" size="sm" onClick={() => setOpen(o => !o)}>
        <HistoryIcon size={13} />History
      </Button>

      {open && (
        <div style={{ position: "absolute", right: 0, top: "100%", marginTop: 8, width: 320, background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", boxShadow: "0 16px 40px rgba(0,0,0,0.4)", zIndex: 200, overflow: "hidden" }}>
          <div style={{ padding: "12px 14px", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 600, fontSize: 13 }}>Recent Repos</span>
            {history.length > 0 && (
              <button onClick={handleClear} style={{ background: "none", border: "none", color: "var(--accent3)", cursor: "pointer", fontSize: 11 }}>
                Clear all
              </button>
            )}
          </div>
          <div style={{ maxHeight: 340, overflowY: "auto" }}>
            {history.length === 0 ? (
              <div style={{ padding: 24, textAlign: "center", color: "var(--text2)", fontSize: 13 }}>No history yet</div>
            ) : (
              history.map(h => (
                <div key={h._id}
                  onClick={() => { onSelect(h.repoUrl); setOpen(false); }}
                  style={{ display: "flex", gap: 10, padding: "10px 14px", cursor: "pointer", transition: "background 0.15s", borderBottom: "1px solid var(--border)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
                  onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.fullName || h.repoUrl.replace("https://github.com/", "")}
                    </div>
                    <div style={{ fontSize: 11, color: "var(--text3)", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {h.description || h.repoUrl}
                    </div>
                    <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 11, color: "var(--text3)" }}>
                      {h.language && <span>{h.language}</span>}
                      {h.stars > 0 && <span style={{ display: "flex", alignItems: "center", gap: 2 }}><StarIcon size={10} />{fmt(h.stars)}</span>}
                    </div>
                  </div>
                  <button onClick={e => handleDelete(e, h._id)}
                    style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", padding: 4, borderRadius: 4 }}
                    onMouseEnter={e => e.target.style.color = "var(--accent3)"}
                    onMouseLeave={e => e.target.style.color = "var(--text3)"}>
                    <TrashIcon size={13} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}
