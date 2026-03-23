import axios from "axios";

const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
const api = axios.create({ baseURL: BASE, timeout: 60000 });

api.interceptors.response.use(
  res => res.data,
  err => {
    const msg = err.response?.data?.message || err.message || "Network error";
    return Promise.reject(new Error(msg));
  }
);

export const analyzeRepo   = (url, githubToken) => api.post("/repo/analyze",   { url, githubToken });
export const summarizeRepo = (url, githubToken) => api.post("/repo/summarize", { url, githubToken });
export const detectStack   = (url, githubToken) => api.post("/repo/stack",     { url, githubToken });
export const getRepoTree   = (url, githubToken) => api.post("/repo/tree",      { url, githubToken });
export const explainFile   = (url, filePath, githubToken) => api.post("/file/explain", { url, filePath, githubToken });
export const chatWithRepo  = (messages, repoContext) => api.post("/chat", { messages, repoContext });
export const getHistory    = () => api.get("/history");
export const deleteHistory = (id) => api.delete(`/history/${id}`);
export const clearHistory  = () => api.delete("/history");
