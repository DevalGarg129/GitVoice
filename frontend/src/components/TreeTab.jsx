import { useState } from "react";
import { getRepoTree, explainFile } from "../services/api";
import { Button, Skeleton, SectionLabel, Card } from "./UI";
import { FileIcon, SparkleIcon } from "./Icons";
import { Spinner } from "./UI";
import toast from "react-hot-toast";

const getFileIcon = (path) => {
  const ext = path.split(".").pop().toLowerCase();
  const icons = { js:"🟨",jsx:"⚛️",ts:"🔷",tsx:"⚛️",py:"🐍",go:"🐹",rs:"🦀",java:"☕",rb:"💎",php:"🐘",css:"🎨",scss:"🎨",html:"🌐",json:"📋",md:"📝",yml:"⚙️",yaml:"⚙️",sh:"💻",dockerfile:"🐳",gitignore:"🙈",env:"🔑",lock:"🔒",test:"🧪",spec:"🧪" };
  return icons[ext] || "📄";
};

const buildTree = (files) => {
  const tree = {};
  files.forEach(f => {
    const parts = f.path.split("/");
    let node = tree;
    parts.forEach((p, i) => {
      if (i === parts.length - 1) {
        node[p] = { __file: f };
      } else {
        node[p] = node[p] || {};
        node = node[p];
      }
    });
  });
  return tree;
};

const TreeNode = ({ name, node, depth = 0, onFileClick }) => {
  const [open, setOpen] = useState(depth < 2);
  const isFile = node.__file;

  if (isFile) {
    return (
      <div
        onClick={() => onFileClick(node.__file)}
        style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 8px", paddingLeft: 8 + depth * 16, borderRadius: 6, cursor: "pointer", fontSize: 12, color: "var(--text2)", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <span>{getFileIcon(name)}</span>
        <span className="truncate">{name}</span>
      </div>
    );
  }

  const children = Object.entries(node).sort(([ak, av], [bk, bv]) => {
    const aDir = !av.__file; const bDir = !bv.__file;
    if (aDir !== bDir) return aDir ? -1 : 1;
    return ak.localeCompare(bk);
  });

  return (
    <div>
      <div
        onClick={() => setOpen(o => !o)}
        style={{ display: "flex", alignItems: "center", gap: 7, padding: "4px 8px", paddingLeft: 8 + depth * 16, borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 600, color: "var(--text)", transition: "background 0.15s" }}
        onMouseEnter={e => e.currentTarget.style.background = "var(--bg3)"}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
        <span style={{ transform: open ? "rotate(90deg)" : "none", transition: "transform 0.15s", display: "inline-block" }}>▶</span>
        <span>📁</span>
        <span>{name}</span>
      </div>
      {open && children.map(([k, v]) => (
        <TreeNode key={k} name={k} node={v} depth={depth + 1} onFileClick={onFileClick} />
      ))}
    </div>
  );
};

export default function TreeTab({ url, githubToken, repoData }) {
  const [files, setFiles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [explanation, setExplanation] = useState(null);
  const [explainLoading, setExplainLoading] = useState(false);

  const loadTree = async () => {
    setLoading(true);
    try {
      const res = await getRepoTree(url, githubToken);
      setFiles(res.data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFileClick = async (file) => {
    setSelectedFile(file);
    setExplanation(null);
    setExplainLoading(true);
    try {
      const res = await explainFile(url, file.path, githubToken);
      setExplanation(res.data);
    } catch (e) {
      toast.error(e.message);
    } finally {
      setExplainLoading(false);
    }
  };

  if (!files && !loading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, padding: "40px 20px", textAlign: "center" }}>
        <div style={{ fontSize: 40 }}>🌳</div>
        <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: 18 }}>Explore File Tree</div>
        <div style={{ color: "var(--text2)", fontSize: 14, maxWidth: 400 }}>
          Browse all files and click any file to get an AI-powered explanation.
        </div>
        <Button onClick={loadTree}><FileIcon size={14} />Load File Tree</Button>
      </div>
    );
  }

  if (loading) return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      {[1,2,3,4,5,6,7,8].map(i => <Skeleton key={i} height={24} width={`${30 + i*8}%`} radius={4} />)}
    </div>
  );

  const tree = buildTree(files);

  return (
    <div style={{ display: "grid", gridTemplateColumns: selectedFile ? "1fr 1fr" : "1fr", gap: 14 }}>
      {/* Tree */}
      <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 14, maxHeight: 520, overflowY: "auto" }}>
        <SectionLabel>{files.length} files</SectionLabel>
        {Object.entries(tree).sort(([ak, av], [bk, bv]) => {
          const aDir = !av.__file; const bDir = !bv.__file;
          if (aDir !== bDir) return aDir ? -1 : 1;
          return ak.localeCompare(bk);
        }).map(([k, v]) => (
          <TreeNode key={k} name={k} node={v} depth={0} onFileClick={handleFileClick} />
        ))}
      </div>

      {/* File Explanation */}
      {selectedFile && (
        <div style={{ background: "var(--bg2)", border: "1px solid var(--border)", borderRadius: "var(--radius)", padding: 16, maxHeight: 520, overflowY: "auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 13 }}>{getFileIcon(selectedFile.path)} {selectedFile.path.split("/").pop()}</div>
              <div style={{ color: "var(--text3)", fontSize: 11, marginTop: 2 }}>{selectedFile.path}</div>
            </div>
            <button onClick={() => setSelectedFile(null)} style={{ background: "none", border: "none", color: "var(--text3)", cursor: "pointer", fontSize: 16 }}>×</button>
          </div>

          {explainLoading ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", gap: 8, color: "var(--text2)", fontSize: 12, alignItems: "center" }}>
                <Spinner size={14} />Analyzing with AI…
              </div>
              {[1,2,3].map(i => <Skeleton key={i} height={10} width={`${60+i*10}%`} />)}
            </div>
          ) : explanation ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {explanation.explanation?.summary && (
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Summary</div>
                  <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.6 }}>{explanation.explanation.summary}</p>
                </div>
              )}
              {explanation.explanation?.purpose && (
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>Purpose</div>
                  <p style={{ color: "var(--text2)", fontSize: 13, lineHeight: 1.6 }}>{explanation.explanation.purpose}</p>
                </div>
              )}
              {explanation.explanation?.keyFunctions?.length > 0 && (
                <div>
                  <div style={{ fontSize: 11, color: "var(--text3)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 1, marginBottom: 8 }}>Key Functions</div>
                  {explanation.explanation.keyFunctions.map((fn, i) => (
                    <div key={i} style={{ marginBottom: 6 }}>
                      <code style={{ fontSize: 12, color: "var(--accent)", background: "var(--bg3)", padding: "1px 6px", borderRadius: 4 }}>{fn.name}</code>
                      <span style={{ color: "var(--text2)", fontSize: 12, marginLeft: 8 }}>{fn.description}</span>
                    </div>
                  ))}
                </div>
              )}
              {explanation.explanation?.complexity && (
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                  <span style={{ color: "var(--text3)" }}>Complexity:</span>
                  <span style={{ fontWeight: 600, color: explanation.explanation.complexity === "simple" ? "var(--accent2)" : explanation.explanation.complexity === "complex" ? "var(--accent3)" : "var(--yellow)" }}>
                    {explanation.explanation.complexity}
                  </span>
                </div>
              )}
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
