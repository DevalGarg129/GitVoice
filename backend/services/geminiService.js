const { getGemini } = require("../config/gemini");
const generateWithRetry = async (model, prompt, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (err) {
      if (err.status === 429 && i < retries - 1) {
        // Extract retry delay from error or default to 60s
        const delay = 60000;
        console.log(`⏳ Gemini rate limited. Retrying in ${delay/1000}s...`);
        await new Promise(r => setTimeout(r, delay));
      } else {
        throw err;
      }
    }
  }
};
const generateSummary = async (repoData, langBreakdown, commits) => {
  const model = await getGemini();
  const topLangs = langBreakdown
    .slice(0, 5)
    .map((l) => `${l.name} (${l.pct}%)`)
    .join(", ");
  const recentCommits = commits
    .slice(0, 5)
    .map((c) => c.commit?.message?.split("\n")[0])
    .join("; ");

  const prompt = `You are an expert software engineer analyzing a GitHub repository.

Repository: ${repoData.full_name}
Description: ${repoData.description || "No description"}
Stars: ${repoData.stargazers_count} | Forks: ${repoData.forks_count} | Open Issues: ${repoData.open_issues_count}
Primary Language: ${repoData.language || "Unknown"}
Languages: ${topLangs || "Unknown"}
Topics: ${repoData.topics?.join(", ") || "None"}
Recent commits: ${recentCommits || "None"}
License: ${repoData.license?.spdx_id || "None"}
Created: ${repoData.created_at} | Last pushed: ${repoData.pushed_at}

Provide a comprehensive analysis in this EXACT JSON format:
{
  "overview": "2-3 sentence overview of what this project does and its purpose",
  "purpose": "Who this is for and what problem it solves",
  "techStack": ["tech1", "tech2", "tech3"],
  "keyFeatures": ["feature1", "feature2", "feature3", "feature4"],
  "gettingStarted": "Brief 2-3 sentence guide on how to get started",
  "codeQuality": "Assessment of project maturity and code quality based on available signals",
  "useCases": ["use case 1", "use case 2", "use case 3"],
  "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"]
}

Return ONLY the JSON, no markdown, no extra text.`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .trim()
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "");
  return JSON.parse(text);
};

const explainFile = async (filename, content, repoName) => {
  const model = await getGemini();
  const truncated =
    content.length > 8000
      ? content.slice(0, 8000) + "\n... (truncated)"
      : content;

  const prompt = `You are a senior developer explaining code to a junior developer.

Repository: ${repoName}
File: ${filename}

\`\`\`
${truncated}
\`\`\`

Provide explanation in this EXACT JSON format:
{
  "summary": "1-2 sentence summary of what this file does",
  "purpose": "Why this file exists in the project",
  "keyFunctions": [{"name": "functionName", "description": "what it does"}],
  "dependencies": ["dep1", "dep2"],
  "complexity": "simple|moderate|complex",
  "suggestions": ["improvement suggestion 1", "improvement suggestion 2"]
}

Return ONLY the JSON.`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .trim()
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "");
  return JSON.parse(text);
};

const chatWithRepo = async (messages, repoContext) => {
  const model = await getGemini();

  const systemContext = `You are GitVoice AI, an expert GitHub repository analyst and software engineer.
You are helping a developer understand this repository:

Repository: ${repoContext.fullName}
Description: ${repoContext.description || "No description"}
Language: ${repoContext.language || "Unknown"}
Stars: ${repoContext.stars} | Forks: ${repoContext.forks}
Topics: ${repoContext.topics?.join(", ") || "None"}
Tech Stack: ${repoContext.techStack?.join(", ") || "Unknown"}
AI Summary: ${repoContext.summary || "Not available"}

Be concise, helpful, technical, and specific to this repository. 
Format code in markdown code blocks. Keep answers focused.`;

  const conversationHistory = messages
    .map((m) => `${m.role === "user" ? "User" : "Assistant"}: ${m.content}`)
    .join("\n\n");

  const prompt = `${systemContext}\n\n--- Conversation ---\n${conversationHistory}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
};

const detectTechStack = async (repoData, langBreakdown, files) => {
  const model = await getGemini();
  const fileList = files
    .map((f) => f.path)
    .slice(0, 100)
    .join("\n");
  const langs = langBreakdown.map((l) => l.name).join(", ");

  const prompt = `Analyze this GitHub repository and detect the full tech stack.

Repo: ${repoData.full_name}
Languages: ${langs}
File paths:
${fileList}

Return ONLY this JSON:
{
  "frontend": ["tech1", "tech2"],
  "backend": ["tech1", "tech2"],
  "database": ["tech1"],
  "devops": ["tech1", "tech2"],
  "testing": ["tech1"],
  "other": ["tech1"]
}`;

  const result = await model.generateContent(prompt);
  const text = result.response
    .text()
    .trim()
    .replace(/^```json\n?/, "")
    .replace(/\n?```$/, "");
  return JSON.parse(text);
};

module.exports = {
  generateSummary,
  explainFile,
  chatWithRepo,
  detectTechStack,
};
