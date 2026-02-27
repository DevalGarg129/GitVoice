import { GoogleGenerativeAI } from "@google/generative-ai";
let genAI = null;

const getGemini = () => {
  if (
    !process.env.GEMINI_API_KEY ||
    process.env.GEMINI_API_KEY === "your_gemini_api_key_here"
  ) {
    throw new Error("GEMINI_API_KEY not configured");
  }

  if (!genAI) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log("✅ Gemini AI configured");
  }

  // ✅ Use proper Gemini model (NO "models/" prefix)
  const modelName =
    process.env.GEMINI_MODEL || "gemini-1.5-flash-latest";

  try {
    return genAI.getGenerativeModel({ model: modelName });
  } catch (err) {
    const e = new Error(
      `Failed to load model '${modelName}'. ${err.message}.`
    );
    e.cause = err;
    throw e;
  }
};

export default { getGemini };