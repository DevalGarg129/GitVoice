const { parseRepoUrl, fetchFileContent } = require("../services/githubService");
const { explainFile } = require("../services/geminiService");
const { aiCache, getCacheKey } = require("../services/cacheService");

// POST /api/file/explain
const explainFileContent = async (req, res, next) => {
  try {
    const { url, filePath, githubToken } = req.body;
    if (!url || !filePath) return res.status(400).json({ success: false, message: "url and filePath are required" });

    const { owner, repo } = parseRepoUrl(url);
    const cacheKey = getCacheKey("file", owner, repo, filePath);

    const cached = aiCache.get(cacheKey);
    if (cached) return res.json({ success: true, data: cached, cached: true });

    const content = await fetchFileContent(owner, repo, filePath, githubToken);
    const explanation = await explainFile(filePath, content, `${owner}/${repo}`);

    aiCache.set(cacheKey, { explanation, content: content.slice(0, 5000) });
    res.json({ success: true, data: { explanation, content: content.slice(0, 5000) }, cached: false });
  } catch (err) {
    next(err);
  }
};

module.exports = { explainFileContent };
