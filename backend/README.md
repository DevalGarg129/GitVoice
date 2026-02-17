# GitHub Repo Summarizer - Backend

A powerful AI-powered GitHub repository analyzer and summarizer using Google's Gemini AI.

## Features

- 🤖 AI-powered repository summarization
- 📊 Automatic tech stack detection
- 🔍 Deep repository analysis
- 💬 Interactive chat about repositories
- 📝 Code file explanation

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the backend directory (use `.env.example` as template):

```env
# MongoDB Connection
MONGO_URI=your_mongodb_connection_string

# Server Port
PORT=5000

# Gemini AI API Key
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Get Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated API key
5. Paste it in your `.env` file as the value for `GEMINI_API_KEY`

**Important**: Keep your API key secure and never commit it to version control!

### 4. Test Your Gemini API Key (Optional but Recommended)

Before starting the server, test if your API key works:

```bash
npm run test:gemini
```

This will:
- ✅ Verify your API key is configured
- 🔄 Make a test request to Gemini API
- 📊 Show response time and status
- 💡 Provide helpful error messages if something is wrong

**Alternative simple test:**
```bash
node test-gemini-simple.js
```

Or test with a specific key:
```bash
node test-gemini-simple.js YOUR_API_KEY_HERE
```

### 5. Start the Server

```bash
npm start
```

The server will start on http://localhost:5000 (or your configured PORT).

You should see these messages:
- ✅ Gemini API configured successfully
- 🚀 Backend running on port 5000

If you see a warning about the Gemini API key, make sure you've:
1. Created the `.env` file
2. Added your actual API key (not "your_api_key_here")
3. Saved the file

## API Endpoints

- `POST /api/repo/summarize` - Summarize a GitHub repository
- `POST /api/repo/analyze` - Deep analysis of repository structure
- `POST /api/repo/stack` - Detect tech stack
- `POST /api/chat` - Chat with AI about a repository
- `POST /api/file/explain` - Explain a code file

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port (default: 5000) | No |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

## Tech Stack

- Node.js + Express.js
- Google Gemini AI
- MongoDB + Mongoose
- Axios for HTTP requests

## Troubleshooting

### "GEMINI_API_KEY not configured" warning

Make sure:
- `.env` file exists in the backend root
- `GEMINI_API_KEY` is set to your actual API key
- You've restarted the server after adding the key
- **Run the test script**: `npm run test:gemini` to verify your key works

### Testing your API key

If you're unsure whether your API key is working:

```bash
# Full test with detailed output
npm run test:gemini

# Quick simple test
node test-gemini-simple.js
```

The test scripts will tell you exactly what's wrong if your key isn't working.

### API rate limits

The free tier of Gemini API has rate limits. If you hit them:
- Wait a few minutes before trying again
- Consider upgrading your API plan
- Implement request throttling in your app

## Security Notes

- Never commit your `.env` file to git
- Keep your API keys secure
- Add `.env` to `.gitignore`
- Use different API keys for development and production

## License

ISC
