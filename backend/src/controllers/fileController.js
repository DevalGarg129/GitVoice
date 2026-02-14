import { fetchFileContent } from "../services/fileSummarizer.js";
import { explainCodeWithGemini } from "../services/geminiService.js";

export const explainFileController = async(req, res) => {
    try{
        const { repoUrl, filePath } = req.body;

        const fileData = await fetchFileContent(repoUrl, filePath);
        const explanation = await explainCodeWithGemini(fileData);

        res.json({ success: true, explanation });
    }
    catch(error){
        res.status(500).json({ success: false, error: error.message });
    }
}