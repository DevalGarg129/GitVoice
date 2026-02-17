import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const summarizeRepo = async (repoUrl) => {
    const res = await axios.post(`${BASE_URL}/repo/summarize`, { repoUrl });
    return res.data.summary;
}

export const analyzeRepo = async(repoUrl) => {
    const res = await axios.post(`${BASE_URL}/repo/analyze`, { repoUrl });
    return res.data.analysis;
}

export const detectStack = async(repoUrl) => {
    const res = await axios.post(`${BASE_URL}/repo/stack`, { repoUrl });
    return res.data.stack;
}