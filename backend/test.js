require("dotenv").config();

const { GoogleGenerativeAI } = require("@google/generative-ai");

async function main() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash"
    });
    console.log(process.env.GEMINI_API_KEY);
    const result = await model.generateContent("Say Hello");
    console.log(result.response.text());
}

main().catch(console.error);