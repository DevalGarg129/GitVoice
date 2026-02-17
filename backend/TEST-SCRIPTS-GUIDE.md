# 🧪 Gemini API Test Scripts - Quick Reference

## Available Test Scripts

### 1. Full Test Script (Recommended)
**File:** `test-gemini.js`

**Usage:**
```bash
cd backend
npm run test:gemini
```

**Features:**
- ✅ Validates API key configuration
- 🔄 Tests actual API connection
- 📊 Shows detailed response information
- ⏱️ Measures response time
- 💡 Provides helpful error messages and solutions

**When to use:**
- First time setting up the project
- After changing your API key
- Troubleshooting API issues
- Before deploying to production

---

### 2. Simple Test Script
**File:** `test-gemini-simple.js`

**Usage:**
```bash
cd backend

# Using .env file
node test-gemini-simple.js

# With a specific API key
node test-gemini-simple.js YOUR_API_KEY_HERE
```

**Features:**
- 🚀 Lightweight and fast
- 📝 Uses only Node.js built-in modules (no extra dependencies)
- ✅ Quick verification
- 🔑 Can test keys without modifying .env

**When to use:**
- Quick API key validation
- Testing multiple API keys
- Minimal environment setup
- CI/CD pipelines

---

## Expected Output

### ✅ Success
```
🧪 Testing Gemini API Configuration
============================================================

📋 Step 1: Checking API Key...
✅ API Key found: AIzaSy...xxxx

📋 Step 2: Testing API Connection...
🔄 Sending test request to Gemini API...

✅ API Connection Successful!

📊 Response Details:
   Response Time: 823ms
   Status Code: 200

🤖 AI Response:
   API connection successful

============================================================
✨ All tests passed! Your Gemini API is working correctly.
============================================================
```

### ❌ Common Errors

#### Missing API Key
```
❌ GEMINI_API_KEY not found or not configured!

💡 To fix this:
   1. Open backend/.env file
   2. Add your key: GEMINI_API_KEY=your_actual_key
   3. Get a key from: https://makersuite.google.com/app/apikey
```

#### Invalid API Key (401)
```
❌ API Connection Failed!

📋 Error Details:
   Status Code: 401
   Status Text: Unauthorized

💡 Possible Solutions:
   - Your API key is invalid or expired
   - Generate a new API key from Google AI Studio
```

#### Rate Limit (429)
```
❌ API Connection Failed!

📋 Error Details:
   Status Code: 429
   Status Text: Too Many Requests

💡 Possible Solutions:
   - You've exceeded the rate limit
   - Wait a few minutes and try again
   - Consider upgrading your API plan
```

#### Network Error
```
❌ API Connection Failed!

📋 Network Error:
   Could not reach Gemini API servers

💡 Possible Solutions:
   - Check your internet connection
   - Verify firewall settings
   - Try again in a few moments
```

---

## Troubleshooting Tips

### Test fails but server starts fine
- The test uses slightly different parameters
- Try the simple test: `node test-gemini-simple.js`
- Check if your API key has restrictions

### Test passes but app doesn't work
- Check MongoDB connection
- Verify all environment variables
- Check backend logs for errors
- Ensure frontend is pointing to correct API URL

### Want to test without .env file
```bash
node test-gemini-simple.js AIzaSyXXXXXXXXXXXXXXXXXX
```

---

## Integration in Your Workflow

### Development
```bash
# 1. Set up environment
cp .env.example .env
# Edit .env with your API key

# 2. Test API key
npm run test:gemini

# 3. Start development
npm start
```

### CI/CD Pipeline
```bash
# Add to your CI script
node test-gemini-simple.js $GEMINI_API_KEY || exit 1
```

### Docker
```dockerfile
# Add to your Dockerfile health check
RUN node test-gemini-simple.js $GEMINI_API_KEY
```

---

## Quick Commands Cheat Sheet

```bash
# Full test
npm run test:gemini

# Simple test with .env
node test-gemini-simple.js

# Test specific key
node test-gemini-simple.js YOUR_KEY

# Test and save output
npm run test:gemini > test-results.txt 2>&1

# Quick one-liner check
node test-gemini-simple.js && echo "✅ Ready to go!"
```

---

## Getting Help

If tests keep failing:
1. Verify your API key at https://makersuite.google.com/app/apikey
2. Check Google Cloud Console for API status
3. Review Gemini API quotas and limits
4. Read detailed docs in `backend/README.md`

---

Made with ❤️ for easier Gemini API testing
