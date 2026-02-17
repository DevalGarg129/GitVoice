import dotenv from "dotenv";
import axios from "axios";

dotenv.config();

// Test configuration
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = "gemini-3-flash-preview";

console.log("\n" + "=".repeat(60));
console.log("🧪 Testing Gemini API Configuration");
console.log("=".repeat(60) + "\n");

// Step 1: Check if API key exists
console.log("📋 Step 1: Checking API Key...");
if (!GEMINI_API_KEY || GEMINI_API_KEY === "your_api_key_here") {
  console.error("❌ GEMINI_API_KEY not found or not configured!");
  console.log("\n💡 To fix this:");
  console.log("   1. Open backend/.env file");
  console.log("   2. Add your key: GEMINI_API_KEY=your_actual_key");
  console.log("   3. Get a key from: https://makersuite.google.com/app/apikey\n");
  process.exit(1);
}

console.log("✅ API Key found:", GEMINI_API_KEY.substring(0, 10) + "..." + GEMINI_API_KEY.substring(GEMINI_API_KEY.length - 4));
console.log();

// Step 2: Test API connection
console.log("📋 Step 2: Testing API Connection...");

const testPrompt = "Hello! Please respond with 'API connection successful' if you can read this.";

const requestBody = {
  contents: [
    {
      parts: [
        {
          text: testPrompt,
        },
      ],
    },
  ],
};

const apiUrl = `${GEMINI_API_URL}/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

(async () => {
  try {
    console.log("🔄 Sending test request to Gemini API...");
    console.log(`   Model: ${MODEL}`);
    console.log(`   Endpoint: ${GEMINI_API_URL}`);
    console.log();

    const startTime = Date.now();
    const response = await axios.post(apiUrl, requestBody, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const endTime = Date.now();
    const responseTime = endTime - startTime;

    // Extract response
    const aiResponse = response.data.candidates[0].content.parts[0].text;

    // Success output
    console.log("✅ API Connection Successful!");
    console.log();
    console.log("📊 Response Details:");
    console.log("   Response Time:", responseTime + "ms");
    console.log("   Status Code:", response.status);
    console.log();
    console.log("🤖 AI Response:");
    console.log("   " + aiResponse);
    console.log();
    console.log("=".repeat(60));
    console.log("✨ All tests passed! Your Gemini API is working correctly.");
    console.log("=".repeat(60));
    console.log();

  } catch (error) {
    console.error("❌ API Connection Failed!");
    console.log();

    if (error.response) {
      // Server responded with error
      console.log("📋 Error Details:");
      console.log("   Status Code:", error.response.status);
      console.log("   Status Text:", error.response.statusText);
      console.log();
      console.log("📄 Error Message:");
      console.log("   ", JSON.stringify(error.response.data, null, 2));
      console.log();

      // Common error solutions
      if (error.response.status === 400) {
        console.log("💡 Possible Solutions:");
        console.log("   - Check if your API key is valid");
        console.log("   - Verify the model name is correct");
        console.log("   - Ensure request format is correct");
      } else if (error.response.status === 403) {
        console.log("💡 Possible Solutions:");
        console.log("   - Your API key may not have permission");
        console.log("   - Check if Gemini API is enabled in your Google Cloud project");
        console.log("   - Verify API key restrictions");
      } else if (error.response.status === 429) {
        console.log("💡 Possible Solutions:");
        console.log("   - You've exceeded the rate limit");
        console.log("   - Wait a few minutes and try again");
        console.log("   - Consider upgrading your API plan");
      } else if (error.response.status === 401) {
        console.log("💡 Possible Solutions:");
        console.log("   - Your API key is invalid or expired");
        console.log("   - Generate a new API key from Google AI Studio");
      }
    } else if (error.request) {
      // Request made but no response
      console.log("📋 Network Error:");
      console.log("   Could not reach Gemini API servers");
      console.log();
      console.log("💡 Possible Solutions:");
      console.log("   - Check your internet connection");
      console.log("   - Verify firewall settings");
      console.log("   - Try again in a few moments");
    } else {
      // Something else happened
      console.log("📋 Unexpected Error:");
      console.log("   ", error.message);
    }

    console.log();
    console.log("=".repeat(60));
    console.log();
    process.exit(1);
  }
})();
