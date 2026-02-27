import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";

export default function App() {
  return (
    <ThemeProvider>
      <Toaster
        position="top-right"
        toastOptions={{
          style: { background: "var(--bg2)", color: "var(--text)", border: "1px solid var(--border)", fontFamily: "inherit", fontSize: "13px" },
          duration: 3000,
        }}
      />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
      </Routes>
    </ThemeProvider>
  );
}
