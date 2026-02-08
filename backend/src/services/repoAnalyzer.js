import axios from "axios";
import { extractRepoInfo } from "../utils/extractRepoInfo.js";

/**
 * Deep Repo Analysis
 * Fetch file tree + important files
 */
export const analyzeRepoStructure = async (repoUrl) => {
  const { owner, repo } = extractRepoInfo(repoUrl);

  // Fetch repo tree
  const treeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1`
  );

  const files = treeRes.data.tree;

  // Extract folder names
  const folders = files
    .filter((item) => item.type === "tree")
    .map((item) => item.path);

  // Extract main files
  const mainFiles = files
    .filter((item) => item.type === "blob")
    .map((item) => item.path)
    .filter((path) =>
      ["README.md", "package.json", "server.js", "App.js"].some((f) =>
        path.includes(f)
      )
    );

  return {
    totalFiles: files.length,
    folders: folders.slice(0, 15),
    mainFiles,
  };
};
s