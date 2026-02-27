const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  repoUrl: { type: String, required: true, unique: true },
  fullName: String,
  description: String,
  stars: Number,
  language: String,
  lastAnalyzed: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model("History", historySchema);
