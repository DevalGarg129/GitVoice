const History = require("../models/History");
const mongoose = require("mongoose");

// GET /api/history
const getHistory = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.json({ success: true, data: [] });
    }
    const history = await History.find().sort({ lastAnalyzed: -1 }).limit(20);
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/history/:id
const deleteHistory = async (req, res, next) => {
  try {
    await History.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted" });
  } catch (err) {
    next(err);
  }
};

// DELETE /api/history
const clearHistory = async (req, res, next) => {
  try {
    await History.deleteMany({});
    res.json({ success: true, message: "History cleared" });
  } catch (err) {
    next(err);
  }
};

module.exports = { getHistory, deleteHistory, clearHistory };
