# 🚀 GitHub Repository Analyzer & Summarizer

An AI-powered GitHub repository analyzer that provides intelligent summaries, tech stack detection, and interactive code exploration using Google's Gemini AI.

## ✨ Features

- 🤖 **AI-Powered Analysis**: Uses Google Gemini AI to understand and summarize repositories
- 📊 **Tech Stack Detection**: Automatically identifies technologies used in the project
- 🌳 **Repository Tree View**: Visual exploration of repository structure
- 💬 **Interactive Chat**: Ask questions about any repository
- 📝 **Code Explanation**: Get detailed explanations of code files
- 🎨 **Modern UI**: Beautiful Material-UI interface

## 🏗️ Architecture

```
├── backend/          # Node.js + Express API
│   ├── config/       # Configuration files (DB, Gemini, GitHub)
│   ├── controllers/  # Request handlers
│   ├── services/     # Business logic (Gemini, GitHub integration)
│   └── routes/       # API endpoints
│
└── frontend/         # React + Vite UI
    ├── Components/   # Reusable UI components
    ├── pages/        # Page components
    └── services/     # API integration layer
```

## 🚀 Quick Start

### Prerequisites

- Node.js (v18 or higher)
- MongoDB database
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
GEMINI_API_KEY=your_gemini_api_key_here
```

4. Start the server:
```bash
npm start
```

You should see:
- ✅ Gemini API configured successfully
- 🚀 Backend running on port 5000

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
VITE_API_URL=http://localhost:5000/api
```

4. Start development server:
```bash
npm run dev
```

The app will be available at http://localhost:5173

## 🔑 Getting Your Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key
5. Add it to your backend `.env` file

**Important**: 
- Keep your API key secure
- Never commit it to version control
- Use `.env` files (already in `.gitignore`)

## 📚 API Endpoints

### Repository Analysis
- `POST /api/repo/summarize` - Get AI summary of a repository
- `POST /api/repo/analyze` - Deep structural analysis
- `POST /api/repo/stack` - Detect technology stack

### Code Analysis
- `POST /api/file/explain` - Get explanation of a code file

### Interactive Chat
- `POST /api/chat` - Chat with AI about a repository

## 🛠️ Tech Stack

### Backend
- Node.js + Express.js
- Google Gemini AI
- MongoDB + Mongoose
- Axios
- dotenv for environment management

### Frontend
- React 18
- Vite
- Material-UI (MUI)
- Axios
- React Hooks

## 📖 Usage Example

1. Open the frontend application
2. Enter a GitHub repository URL: `https://github.com/username/repo`
3. Click "Analyze Repository"
4. View:
   - AI-generated summary with overview, features, and setup instructions
   - Detected tech stack displayed as badges
   - Repository structure in tree view
   - File counts and analysis

## 🔧 Configuration

### Backend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | Yes |
| `PORT` | Server port | No (default: 5000) |
| `GEMINI_API_KEY` | Google Gemini API key | Yes |

### Frontend Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_API_URL` | Backend API URL | No (default: http://localhost:5000/api) |

## 🐛 Troubleshooting

### Backend Issues

**"GEMINI_API_KEY not configured" warning**
- Ensure `.env` file exists in backend root
- Verify API key is not "your_api_key_here"
- Restart the server after adding the key

**MongoDB connection errors**
- Check your `MONGO_URI` is correct
- Ensure MongoDB is running
- Verify network connectivity

### Frontend Issues

**"Network Error" when analyzing repos**
- Ensure backend is running on the correct port
- Check `VITE_API_URL` in frontend `.env`
- Verify CORS is enabled on backend

**Environment variables not working**
- Variables must start with `VITE_`
- Restart dev server after changing `.env`

## 🔒 Security Best Practices

- ✅ Never commit `.env` files
- ✅ Use different API keys for dev/prod
- ✅ Keep dependencies updated
- ✅ Implement rate limiting for production
- ✅ Validate all user inputs

## 📝 License

ISC

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

Made with ❤️ using Google Gemini AI
