import mongoose from "mongoose";

const repoSummarySchema = new mongoose.Schema(
  {
    repoUrl: { type: String, required: true },
    summary: { type: String, required: true },
    techStack: { type: Array, default: [] },
  },
  { timestamps: true },
);

export default mongoose.model("RepoSummary", repoSummarySchema);
