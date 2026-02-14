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
    },
  );

  return response.data.candidates[0].content.parts[0].text;
};

export const explainCodeWithGemini = async (fileData) => {
  const prompt = `
You are an expert software engineer.

Explain this code file clearly:

File: ${fileData.filePath}

Code:
${fileData.content}

Explain:
1. Purpose of file
2. Important functions/classes
3. Flow of execution
4. Suggestions if any
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
  );

  return response.data.candidates[0].content.parts[0].text;
};

export const chatWithGemini = async (repoData, question) => {
  const prompt = `
You are an AI GitHub Repo Assistant.

Repository: ${repoData.repo}

README:
${repoData.readme}

User Question:
${question}

Answer in a detailed developer-friendly way.
`;

  const response = await axios.post(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.GEMINI_API_KEY}`,
    {
      contents: [{ parts: [{ text: prompt }] }],
    },
  );

  return response.data.candidates[0].content.parts[0].text;
};
