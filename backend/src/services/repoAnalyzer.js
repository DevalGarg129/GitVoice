import axios from "axios";
import { extractRepoInfo } from "../utils/extractRepoInfo.js";

export const analyzeRepoStructure = async (repoUrl) => {
  const { owner, repo } = extractRepoInfo(repoUrl);

  const treeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
  );

  const files = treeRes.data.tree;

  const folders = files
    .filter((x) => x.type === "tree")
    .map((x) => x.path);

  const blobs = files.filter((x) => x.type === "blob");

  // Detect important entry files
  const entryPoints = blobs
    .map((x) => x.path)
    .filter((path) =>
      ["server.js", "index.js", "app.js", "main.jsx"].some((f) =>
        path.endsWith(f)
      )
    );

  // Detect project type
  const isMERN =
    folders.includes("backend") &&
    folders.includes("frontend");

  return {
    totalFiles: files.length,
    totalFolders: folders.length,
    entryPoints,
    projectType: isMERN ? "MERN Full Stack" : "Unknown",
    sampleFolders: folders.slice(0, 20),
  };
};
