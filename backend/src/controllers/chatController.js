import { fetchRepoData } from "../services/githubService";
import { chatWithGemini } from "../services/geminiService";

export const chatWithRepoController = async(req, res) => {
    try{
        const { repoUrl, question } = req.body;
        const repoData = await fetchRepoData(repoUrl);
        const answer = await chatWithGemini(repoData, question);
        res.json({ success: true, answer});
    }catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}