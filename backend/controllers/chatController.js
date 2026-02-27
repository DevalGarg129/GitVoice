const { chatWithRepo } = require("../services/geminiService");

// POST /api/chat
const chat = async (req, res, next) => {
  try {
    const { messages, repoContext } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ success: false, message: "messages array is required" });
    }
    if (!repoContext) {
      return res.status(400).json({ success: false, message: "repoContext is required" });
    }

    const reply = await chatWithRepo(messages, repoContext);
    res.json({ success: true, data: { reply } });
  } catch (err) {
    next(err);
  }
};

module.exports = { chat };
