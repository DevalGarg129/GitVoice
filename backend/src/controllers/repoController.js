import { fetchRepoData } from "../services/githubService.js";
import { summarizeRepoWithGemini } from "../services/geminiService.js";
import { analyzeRepoStructure } from "../services/repoAnalyzer.js";
import { detectTechStack } from "../services/stackDetector.js";

/**
 * 1. Full Summary Controller
 */
export const summarizeRepoController = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const repoData = await fetchRepoData(repoUrl);

    const summary = await summarizeRepoWithGemini(repoData);

    res.json({ success: true, summary });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * 2. Repo Deep Analysis Controller
 */
export const analyzeRepoController = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const analysis = await analyzeRepoStructure(repoUrl);

    res.json({ success: true, analysis });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * 3. Tech Stack Detection Controller
 */
export const detectStackController = async (req, res) => {
  try {
    const { repoUrl } = req.body;

    const stack = await detectTechStack(repoUrl);

    res.json({ success: true, stack });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
