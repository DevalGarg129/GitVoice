# 🚀 GitVoice v2.0

> AI-powered GitHub Repository Analyzer — summaries, tech stack detection, voice narration, file exploration & chat.

Built with **React + Vite + Node.js + Express + MongoDB + Google Gemini AI**

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 AI Summary | Gemini-powered overview, purpose, features & setup guide |
| ⚙️ Stack Detection | Auto-detect frontend, backend, DB, DevOps tools |
| 🔊 Voice Narration | Read summaries aloud via browser TTS |
| 🌳 File Explorer | Browse file tree with per-file AI explanation |
| 💬 AI Chat | Ask natural questions about any codebase |
| 📊 Language Stats | Visual language breakdown with percentages |
| 👥 Contributors | Top contributors ranked by commits |
| 📜 Commit History | Recent commits with authors & timestamps |
| 🐛 Issues Tracker | Open issues with labels & links |
| 📦 Smart Caching | In-memory cache for GitHub & AI responses |
| 📝 History | MongoDB-backed analysis history |

---

## 🚀 Quick Start

### 1. Clone
```bash
git clone https://github.com/DevalGarg129/GitVoice.git
cd GitVoice
```

### 2. Backend Setup
```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your keys
npm run dev
```

### 3. Frontend Setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

Open **http://localhost:5173**

---

## 🔑 Environment Variables

### Backend (`backend/.env`)
```
MONGO_URI=mongodb://localhost:27017/gitvoice   # Optional — disables history if not set
PORT=5000
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:5173
```

### Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:5000/api
```

---

## 📚 API Reference

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/repo/analyze` | Full GitHub repo data |
| POST | `/api/repo/summarize` | AI-generated summary |
| POST | `/api/repo/stack` | Tech stack detection |
| POST | `/api/repo/tree` | Repository file tree |
| POST | `/api/file/explain` | AI file explanation |
| POST | `/api/chat` | Chat with AI about repo |
| GET  | `/api/history` | Analysis history |
| DELETE | `/api/history/:id` | Delete history item |

---

## 🛠️ Tech Stack

**Frontend:** React 18, Vite, React Router, React Hot Toast  
**Backend:** Node.js, Express, Helmet, Morgan, Rate Limiting  
**AI:** Google Gemini 1.5 Flash  
**Database:** MongoDB + Mongoose  
**Caching:** node-cache (in-memory)

---

## 📝 License
ISC
