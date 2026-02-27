const axios = require("axios");

// ─────────────────────────────────────────────────────────────
// GitHub API instance creator
// ─────────────────────────────────────────────────────────────
const githubAPI = (token) => {
  const headers = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const finalToken = token || process.env.GITHUB_TOKEN;

  if (finalToken) {
    headers["Authorization"] = `Bearer ${finalToken}`;
  }

  return axios.create({
    baseURL: "https://api.github.com",
    headers,
    timeout: 15000,
  });
};

// ─────────────────────────────────────────────────────────────
// Parse GitHub URL
// ─────────────────────────────────────────────────────────────
const parseRepoUrl = (url) => {
  const match = url.trim().replace(/\/$/, "").match(/github\.com\/([^/]+)\/([^/]+)/);
  if (!match) {
    throw new Error("Invalid GitHub URL. Use: https://github.com/owner/repo");
  }
  return {
    owner: match[1],
    repo: match[2].replace(/\.git$/, ""),
  };
};

// ─────────────────────────────────────────────────────────────
// Fetch Repository Data
// ─────────────────────────────────────────────────────────────
const fetchRepoData = async (owner, repo, token) => {
  const api = githubAPI(token);

  const results = await Promise.allSettled([
    api.get(`/repos/${owner}/${repo}`),
    api.get(`/repos/${owner}/${repo}/languages`),
    api.get(`/repos/${owner}/${repo}/contributors?per_page=10`),
    api.get(`/repos/${owner}/${repo}/commits?per_page=15`),
    api.get(`/repos/${owner}/${repo}/issues?state=open&per_page=10`),
    api.get(`/repos/${owner}/${repo}/releases?per_page=3`),
  ]);

  const [repoRes, langsRes, contribRes, commitsRes, issuesRes, releasesRes] = results;

  if (repoRes.status === "rejected") {
    const status = repoRes.reason?.response?.status;
    const remaining = repoRes.reason?.response?.headers?.["x-ratelimit-remaining"];

    if (status === 404) {
      throw new Error("Repository not found. Check the URL and ensure it is public.");
    }

    if (status === 403 && remaining === "0") {
      throw new Error(
        "GitHub rate limit exceeded. Please add a GitHub token in your .env file."
      );
    }

    if (status === 403) {
      throw new Error("Access forbidden. Possibly private repository.");
    }

    throw new Error("Failed to fetch repository data.");
  }

  const repoData = repoRes.value.data;
  const langs = langsRes.status === "fulfilled" ? langsRes.value.data : {};
  const contribs = contribRes.status === "fulfilled" ? contribRes.value.data : [];
  const commits = commitsRes.status === "fulfilled" ? commitsRes.value.data : [];
  const issues = issuesRes.status === "fulfilled" ? issuesRes.value.data : [];
  const releases = releasesRes.status === "fulfilled" ? releasesRes.value.data : [];

  const totalBytes = Object.values(langs).reduce((a, b) => a + b, 0);

  const langBreakdown = Object.entries(langs)
    .map(([name, bytes]) => ({
      name,
      bytes,
      pct: totalBytes > 0 ? Math.round((bytes / totalBytes) * 100) : 0,
    }))
    .sort((a, b) => b.bytes - a.bytes)
    .slice(0, 10);

  return {
    repoData,
    langBreakdown,
    contribs,
    commits,
    issues,
    releases,
  };
};

// ─────────────────────────────────────────────────────────────
// Fetch File Content
// ─────────────────────────────────────────────────────────────
const fetchFileContent = async (owner, repo, path, token) => {
  const api = githubAPI(token);
  const res = await api.get(`/repos/${owner}/${repo}/contents/${path}`);

  if (res.data.encoding === "base64") {
    return Buffer.from(res.data.content, "base64").toString("utf8");
  }

  return res.data.content;
};

// ─────────────────────────────────────────────────────────────
// Fetch Repository Tree
// ─────────────────────────────────────────────────────────────
const fetchRepoTree = async (owner, repo, token) => {
  const api = githubAPI(token);

  const repoRes = await api.get(`/repos/${owner}/${repo}`);
  const branch = repoRes.data.default_branch;

  const treeRes = await api.get(
    `/repos/${owner}/${repo}/git/trees/${branch}?recursive=1`
  );

  return treeRes.data.tree
    .filter((f) => f.type === "blob")
    .slice(0, 200);
};

module.exports = {
  parseRepoUrl,
  fetchRepoData,
  fetchFileContent,
  fetchRepoTree,
};