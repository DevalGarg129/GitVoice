const dotenv = require("dotenv");
dotenv.config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const getGemini = () => {
  const apiKey = process.env.GEMINI_API_KEY;

  console.log(
    "Using Gemini Key:",
    apiKey ? `${apiKey.substring(0, 8)}...${apiKey.slice(-4)}` : "NOT FOUND"
  );

  const genAI = new GoogleGenerativeAI(apiKey);

  return genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });
};

module.exports = { getGemini };