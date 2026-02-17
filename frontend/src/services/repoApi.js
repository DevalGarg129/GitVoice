import axios from "axios";

const BASE_URL = "http://localhost:5000/api/repo";

export const summarizeRepo = async (repoUrl) => {
    const res = await axios.post(`${BASE_URL}/summarize`, { repoUrl });
    return res.data.summary;
}

export const analyzeRepo = async(repoUrl) => {
    const res = await axios.post(`{BASE_URL}/analyze`, { repoUrl });
    return res.data.analysis;
}

export const detectStack = async(repoUrl) => {
    const res = await axios.post(`{BASE_URL}/stack`, { repoUrl });
    return res.data.stack;
}