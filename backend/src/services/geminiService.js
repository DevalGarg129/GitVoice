import axios from "axios";

export const summarizeRepoWithGemini = async (repoData) => {
  const prompt = `
You are a senior software engineer.

Summarize this GitHub repository:

Repo Name: ${repoData.repo}

README Content:
${repoData.readme}

Provide:
1. Overview
2. Key Features
3. Tech Stack
4. Folder Explanation
5. Setup Instructions
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    }
  );

  return response.data.candidates[0].content.parts[0].text;
};
