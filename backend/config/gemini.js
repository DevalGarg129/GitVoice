const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const getGemini = async () => {
  return genAI.getGenerativeModel({
    model: "gemini-3.0"
  });
};

module.exports = { getGemini };