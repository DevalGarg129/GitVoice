import { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";

import StackBadges from "../Components/StackBadges.jsx";
import RepoTreeView from "../Components/RepoTreeView.jsx";

import { summarizeRepo, analyzeRepo, detectStack } from "../services/repoApi";

export default function RepoDetails() {
  const [repoUrl, setRepoUrl] = useState("");
  const [summary, setSummary] = useState("");
  const [stack, setStack] = useState([]);
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setLoading(true);

    try {
      // Call all backend APIs
      const repoSummary = await summarizeRepo(repoUrl);
      const repoStack = await detectStack(repoUrl);
      const repoAnalysis = await analyzeRepo(repoUrl);

      setSummary(repoSummary);
      setStack(repoStack);
      setAnalysis(repoAnalysis);
    } catch (err) {
      alert("Error analyzing repo. Check URL or backend.");
    }

    setLoading(false);
  };

  return (
    <Container sx={{ mt: 6 }}>
      {/* Heading */}
      <Typography variant="h3" fontWeight="bold">
        🚀 GitHub Repo AI Assistant
      </Typography>
      <Typography variant="subtitle1" sx={{ mt: 1, color: "gray" }}>
        Summarize • Detect Stack • Explore Repo Architecture
      </Typography>

      {/* Repo Input */}
      <TextField
        fullWidth
        label="Enter GitHub Repository URL"
        variant="outlined"
        sx={{ mt: 4 }}
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
      />

      {/* Button */}
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, borderRadius: "12px" }}
        onClick={handleAnalyze}
      >
        Analyze Repository
      </Button>

      {/* Loader */}
      {loading && (
        <CircularProgress sx={{ display: "block", mt: 4 }} />
      )}

      {/* Tech Stack */}
      {stack.length > 0 && (
        <Card sx={{ mt: 4, borderRadius: "16px" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              ⚡ Detected Tech Stack
            </Typography>

            <StackBadges stack={stack} />
          </CardContent>
        </Card>
      )}

      {/* Deep Analysis */}
      {analysis && (
        <Card sx={{ mt: 4, borderRadius: "16px" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              📊 Repo Deep Analysis
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Total Files: <b>{analysis.totalFiles}</b>
            </Typography>

            <Typography>
              Project Type: <b>{analysis.projectType}</b>
            </Typography>

            <Typography sx={{ mt: 2 }}>
              Entry Points:
            </Typography>

            {analysis.entryPoints.map((file, i) => (
              <Typography
                key={i}
                sx={{ fontFamily: "monospace", ml: 2 }}
              >
                → {file}
              </Typography>
            ))}

            <RepoTreeView folders={analysis.sampleFolders} />
          </CardContent>
        </Card>
      )}

      {/* Summary */}
      {summary && (
        <Card sx={{ mt: 4, borderRadius: "16px" }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              🧠 AI Repo Summary
            </Typography>

            <Typography
              sx={{
                mt: 2,
                whiteSpace: "pre-line",
                lineHeight: 1.7,
              }}
            >
              {summary}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
}
