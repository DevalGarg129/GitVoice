import axios from "axios";
import { extractRepoInfo } from "../utils/extractRepoInfo.js";

/**
 * Detect Tech Stack from package.json + files
 */
export const detectTechStack = async (repoUrl) => {
  const { owner, repo } = extractRepoInfo(repoUrl);

  let stack = [];

  try {
    // Fetch package.json
    const pkgRes = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contents/package.json`,
      {
        headers: { Accept: "application/vnd.github.v3.raw" },
      }
    );

    const pkg = JSON.parse(pkgRes.data);
    const deps = Object.keys(pkg.dependencies || {});

    // Detect frameworks
    if (deps.includes("react")) stack.push("React.js");
    if (deps.includes("express")) stack.push("Node.js + Express");
    if (deps.includes("mongoose")) stack.push("MongoDB");
    if (deps.includes("jsonwebtoken")) stack.push("JWT Auth");
    if (deps.includes("firebase")) stack.push("Firebase");

    if (deps.includes("tailwindcss")) stack.push("Tailwind CSS");

    return stack;
  } catch (err) {
    return ["Tech stack not detected (package.json missing)"];
  }
};
