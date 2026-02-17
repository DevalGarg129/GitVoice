# 🚀 Quick Setup Guide - Gemini API Configuration

## Step-by-Step Setup

### 1️⃣ Get Your Gemini API Key

1. Go to **[Google AI Studio](https://makersuite.google.com/app/apikey)**
2. Sign in with your Google account
3. Click on **"Create API Key"**
4. Copy your new API key

### 2️⃣ Configure Backend

1. Open the backend `.env` file:
   ```
   backend/.env
   ```

2. Replace `your_api_key_here` with your actual API key:
   ```env
   GEMINI_API_KEY=AIzaSy...your_actual_key...
   ```

3. Save the file

### 3️⃣ Test Your API Key (Recommended)

Before starting the server, verify your API key works:

```bash
cd backend
npm run test:gemini
```

**Expected Output:**
```
🧪 Testing Gemini API Configuration
============================================================

📋 Step 1: Checking API Key...
✅ API Key found: AIzaSy...xxxx

📋 Step 2: Testing API Connection...
🔄 Sending test request to Gemini API...

✅ API Connection Successful!
📊 Response Time: 823ms
🤖 AI Response: API connection successful

✨ All tests passed! Your Gemini API is working correctly.
```

If the test fails, you'll see detailed error messages explaining what's wrong.

**Quick alternative test:**
```bash
node test-gemini-simple.js
```

### 4️⃣ Start Backend Server

```bash
cd backend
npm install
npm start
```

**Expected Output:**
```
✅ Gemini API configured successfully
🚀 Backend running on port 5000
```

If you see ⚠️ WARNING about API key, double-check step 2.

### 5️⃣ Start Frontend

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

**Expected Output:**
```
VITE ready in 500ms
➜  Local:   http://localhost:5173/
```

### 6️⃣ Test the Application

1. Open http://localhost:5173 in your browser
2. Enter a GitHub repository URL, for example:
   ```
   https://github.com/facebook/react
   ```
3. Click "Analyze Repository"
4. You should see:
   - AI-generated summary
   - Detected tech stack
   - Repository analysis

## 🔍 Troubleshooting

### "GEMINI_API_KEY not configured" Warning

**Problem:** API key not detected

**Solution:**
- Make sure `.env` file exists in the `backend/` folder
- Verify the key is on the line: `GEMINI_API_KEY=YOUR_KEY`
- Ensure there are no spaces around the `=` sign
- **Test your key**: Run `npm run test:gemini` in the backend folder
- Restart the backend server

**Quick Test:**
```bash
cd backend
npm run test:gemini
```
This will tell you exactly what's wrong with your API key setup.

### Network Error / Can't Connect

**Problem:** Frontend can't reach backend

**Solution:**
- Check backend is running on port 5000
- Verify `VITE_API_URL` in `frontend/.env` is set to `http://localhost:5000/api`
- Make sure both frontend and backend are running

### Gemini API Errors

**Problem:** 400/401 errors from Gemini

**Solution:**
- Verify your API key is valid
- Check you haven't exceeded rate limits (wait a few minutes)
- Ensure your Google Cloud project has Gemini API enabled

## 📊 What Changed

### Backend Changes:
- ✅ Created `config/gemini.js` - Centralized Gemini configuration
- ✅ Updated `services/geminiService.js` - Better error handling
- ✅ Modified `server.js` - Validates API key on startup
- ✅ Created `.env.example` - Template for configuration
- ✅ Added `.gitignore` - Protects sensitive data

### Frontend Changes:
- ✅ Updated `services/repoApi.js` - Uses environment variables for API URL
- ✅ Created `.env` and `.env.example` - Configuration templates
- ✅ Updated `.gitignore` - Protects environment files

### Documentation:
- ✅ Backend README with detailed setup instructions
- ✅ Frontend README with configuration guide
- ✅ Root README with project overview
- ✅ This setup guide

## 🎯 Next Steps

1. **Secure Your API Key**
   - Never commit `.env` to git
   - Use different keys for development and production
   - Monitor your API usage

2. **Customize the Application**
   - Adjust prompts in `geminiService.js`
   - Modify UI components in frontend
   - Add new features

3. **Deploy to Production**
   - Set up MongoDB Atlas
   - Configure environment variables on hosting platform
   - Use production API keys

## 🆘 Still Having Issues?

Check the detailed READMEs:
- Backend: `backend/README.md`
- Frontend: `frontend/README.md`
- Main: `README.md`

Or review the configuration files:
- `backend/.env.example`
- `frontend/.env.example`

---

Happy coding! 🎉
