import axios from "axios";
import { extractRepoInfo } from "../utils/extractRepoInfo.js";

/**
 * Fetch README content from GitHub repo
 */
export const fetchRepoData = async (repoUrl) => {
  const { owner, repo } = extractRepoInfo(repoUrl);

  // Fetch README
  const readmeRes = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/readme`,
    {
      headers: {
        Accept: "application/vnd.github.v3.raw",
      },
    }
  );

  return {
    owner,
    repo,
    readme: readmeRes.data,
  };
};
