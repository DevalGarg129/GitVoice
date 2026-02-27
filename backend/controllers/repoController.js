const {
  parseRepoUrl,
  fetchRepoData,
  fetchRepoTree,
} = require("../services/githubService");
const {
  generateSummary,
  detectTechStack,
} = require("../services/geminiService");
const { repoCache, aiCache, getCacheKey } = require("../services/cacheService");
const History = require("../models/History");

// POST /api/repo/analyze
const analyzeRepo = async (req, res, next) => {
  try {
    const { url, githubToken } = req.body;
    if (!url)
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });

    const { owner, repo } = parseRepoUrl(url);
    const cacheKey = getCacheKey("repo", owner, repo);

    // Check cache
    const cached = repoCache.get(cacheKey);
    if (cached) {
      console.log(`📦 Cache hit: ${owner}/${repo}`);
      return res.json({ success: true, data: cached, cached: true });
    }

    // Fetch GitHub data
    const { repoData, langBreakdown, contribs, commits, issues, releases } =
      await fetchRepoData(owner, repo, githubToken);

    const result = {
      repoData,
      langBreakdown,
      contribs,
      commits,
      issues,
      releases,
      owner,
      repo,
    };
    repoCache.set(cacheKey, result);

    // Save to history (non-blocking)
    History.findOneAndUpdate(
      { repoUrl: url.trim() },
      {
        repoUrl: url.trim(),
        fullName: repoData.full_name,
        description: repoData.description,
        stars: repoData.stargazers_count,
        language: repoData.language,
        lastAnalyzed: new Date(),
      },
      { upsert: true, new: true },
    ).catch(() => {});

    res.json({ success: true, data: result, cached: false });
  } catch (err) {
    next(err);
  }
};

// POST /api/repo/summarize
const summarizeRepo = async (req, res, next) => {
  try {
    const { url, githubToken } = req.body;
    if (!url)
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });

    const { owner, repo } = parseRepoUrl(url);
    const cacheKey = getCacheKey("summary", owner, repo);

    const cached = aiCache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const { repoData, langBreakdown, commits } = await fetchRepoData(
      owner,
      repo,
      githubToken,
    );
    const summary = await generateSummary(repoData, langBreakdown, commits);

    aiCache.set(cacheKey, summary);
    res.json({ success: true, data: summary, cached: false });
  } catch (err) {
    next(err);
  }
};

// POST /api/repo/stack
const detectStack = async (req, res, next) => {
  try {
    const { url, githubToken } = req.body;
    if (!url)
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });

    const { owner, repo } = parseRepoUrl(url);
    const cacheKey = getCacheKey("stack", owner, repo);

    const cached = aiCache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const { repoData, langBreakdown } = await fetchRepoData(
      owner,
      repo,
      githubToken,
    );
    const files = await fetchRepoTree(owner, repo, githubToken);
    const stack = await detectTechStack(repoData, langBreakdown, files);

    aiCache.set(cacheKey, stack);
    res.json({ success: true, data: stack, cached: false });
  } catch (err) {
    next(err);
  }
};

// POST /api/repo/tree
const getRepoTree = async (req, res, next) => {
  try {
    const { url, githubToken } = req.body;
    if (!url)
      return res
        .status(400)
        .json({ success: false, message: "URL is required" });

    const { owner, repo } = parseRepoUrl(url);
    const cacheKey = getCacheKey("tree", owner, repo);

    const cached = repoCache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const files = await fetchRepoTree(owner, repo, githubToken);
    repoCache.set(cacheKey, files);
    res.json({ success: true, data: files, cached: false });
  } catch (err) {
    next(err);
  }
};

module.exports = { analyzeRepo, summarizeRepo, detectStack, getRepoTree };
