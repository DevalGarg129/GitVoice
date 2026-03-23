const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const { chat } = require("../controllers/chatController");

const limiter = rateLimit({ windowMs: 60 * 1000, max: 100 });
router.post("/", limiter, chat);

module.exports = router;
