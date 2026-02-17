# GitHub Repo Summarizer - Frontend

React + Vite frontend for the AI-powered GitHub repository analyzer.

## Features

- 🎨 Modern Material-UI interface
- 🔍 Analyze any public GitHub repository
- 📊 Visual tech stack badges
- 🌳 Repository tree view
- 💬 Interactive chat with AI about repos
- 📱 Responsive design

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the frontend directory:

```env
VITE_API_URL=http://localhost:5000/api
```

If your backend runs on a different port or URL, update `VITE_API_URL` accordingly.

### 3. Start Development Server

```bash
npm run dev
```

The app will be available at http://localhost:5173

### 4. Build for Production

```bash
npm run build
```

The production build will be in the `dist/` directory.

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_URL` | Backend API URL | http://localhost:5000/api |

## Usage

1. Enter a GitHub repository URL (e.g., `https://github.com/username/repo`)
2. Click "Analyze Repository"
3. View:
   - AI-generated summary
   - Detected tech stack
   - Repository structure
   - Deep analysis

## Tech Stack

- React 18
- Vite
- Material-UI (MUI)
- Axios for API calls
- React Hooks

## Project Structure

```
src/
├── Components/       # Reusable UI components
├── pages/           # Page components
├── services/        # API service layers
├── context/         # React context providers
├── hooks/           # Custom React hooks
└── assets/          # Static assets
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Connecting to Backend

Make sure:
1. Backend server is running on http://localhost:5000
2. Backend has a valid Gemini API key configured
3. CORS is properly configured on the backend

## Troubleshooting

### "Network Error" or API calls failing

- Check if backend is running
- Verify `VITE_API_URL` in `.env`
- Check browser console for CORS errors

### Vite environment variables not working

- Environment variables must start with `VITE_`
- Restart dev server after changing `.env`
- Use `import.meta.env.VITE_VARIABLE_NAME` to access them
