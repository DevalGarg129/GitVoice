#!/usr/bin/env node

/**
 * Simple Gemini API Test Script
 * Run: node test-gemini-simple.js YOUR_API_KEY
 * Or:  node test-gemini-simple.js (uses .env file)
 */

import dotenv from "dotenv";
import https from "https";

dotenv.config();

const API_KEY = process.argv[2] || process.env.GEMINI_API_KEY;

if (!API_KEY || API_KEY === "your_api_key_here") {
  console.log("\n❌ Error: No API key provided\n");
  console.log("Usage:");
  console.log("  node test-gemini-simple.js YOUR_API_KEY");
  console.log("  or set GEMINI_API_KEY in .env file\n");
  process.exit(1);
}

console.log("\n🧪 Testing Gemini API...\n");

const data = JSON.stringify({
  contents: [
    {
      parts: [
        {
          text: "Say 'Hello! API is working!' if you receive this message.",
        },
      ],
    },
  ],
});

const options = {
  hostname: "generativelanguage.googleapis.com",
  port: 443,
  path: `/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
  },
};

const req = https.request(options, (res) => {
  let body = "";

  res.on("data", (chunk) => {
    body += chunk;
  });

  res.on("end", () => {
    if (res.statusCode === 200) {
      try {
        const response = JSON.parse(body);
        const text = response.candidates[0].content.parts[0].text;
        console.log("✅ Success! API is working\n");
        console.log("📝 Response:", text);
        console.log("\n✨ Your Gemini API key is valid!\n");
      } catch (e) {
        console.log("❌ Error parsing response:", e.message);
        console.log("\nRaw response:", body);
      }
    } else {
      console.log(`❌ Error: HTTP ${res.statusCode}\n`);
      try {
        const error = JSON.parse(body);
        console.log("Error details:", JSON.stringify(error, null, 2));
      } catch (e) {
        console.log("Raw error:", body);
      }
      console.log();
    }
  });
});

req.on("error", (error) => {
  console.log("❌ Network error:", error.message);
});

req.write(data);
req.end();
