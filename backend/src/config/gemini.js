import dotenv from "dotenv";

dotenv.config();

const geminiConfig = {
  apiKey: process.env.GEMINI_API_KEY,
  apiUrl: "https://generativelanguage.googleapis.com/v1beta/models",
  model: "gemini-3-flash-preview",
};

// Validate API key on startup
export const validateGeminiConfig = () => {
  if (!geminiConfig.apiKey || geminiConfig.apiKey === "your_api_key_here") {
    console.warn(
      "⚠️  WARNING: GEMINI_API_KEY not configured! Please add your API key in .env file"
    );
    console.warn(
      "   Get your API key from: https://makersuite.google.com/app/apikey"
    );
    return false;
  }
  console.log("✅ Gemini API configured successfully");
  return true;
};

export default geminiConfig;
