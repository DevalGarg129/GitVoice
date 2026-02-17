import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import { validateGeminiConfig } from "./config/gemini.js";

dotenv.config();

const PORT = process.env.PORT || 6001;

// Validate Gemini API configuration
validateGeminiConfig();

connectDB();
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});
