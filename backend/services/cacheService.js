const NodeCache = require("node-cache");

// TTL: 30 minutes for repo data, 1 hour for AI analysis
const repoCache = new NodeCache({ stdTTL: 1800, checkperiod: 300 });
const aiCache = new NodeCache({ stdTTL: 3600, checkperiod: 300 });

const getCacheKey = (type, ...parts) => `${type}:${parts.join(":")}`;

module.exports = { repoCache, aiCache, getCacheKey };
