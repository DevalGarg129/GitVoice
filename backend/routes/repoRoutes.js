const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { analyzeRepo, summarizeRepo, detectStack, getRepoTree } = require("../controllers/repoController");


// ✅ New — much more generous
const limiter = rateLimit({ 
  windowMs: 60 * 1000,  // 1 minute
  max: 100,             // 100 requests per minute
  message: { success: false, message: "Too many requests. Please slow down." }
});
router.post("/analyze", limiter, analyzeRepo);
router.post("/summarize", limiter, summarizeRepo);
router.post("/stack", limiter, detectStack);
router.post("/tree", limiter, getRepoTree);

module.exports = router;
