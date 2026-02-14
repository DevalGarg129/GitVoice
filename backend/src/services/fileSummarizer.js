import axios from "axios";
import { extractRepoInfo } from "../utils/extractRepoInfo.js";

export const fetchFileContent = async (repoUrl, filePath) => {
  const { owner, repo } = extractRepoInfo(repoUrl);

  const response = await axios.get(
    `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`,
    {
      headers: { Accept: "application/vnd.github.v3.raw" },
    }
  );

  return {
    filePath,
    content: response.data,
  };
};
