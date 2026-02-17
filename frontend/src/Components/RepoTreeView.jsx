import { Box, Typography } from "@mui/material";

export default function RepoTreeView({ folders }) {
  return (
    <Box sx={{ mt: 3 }}>
      <Typography variant="h6" fontWeight="bold">
        📂 Folder Structure
      </Typography>

      <Box
        sx={{
          mt: 2,
          background: "#f9f9f9",
          padding: 2,
          borderRadius: "12px",
          maxHeight: "200px",
          overflowY: "auto",
        }}
      >
        {folders.map((folder, index) => (
          <Typography
            key={index}
            sx={{
              fontFamily: "monospace",
              fontSize: "0.9rem",
              mb: 0.5,
            }}
          >
            ├── {folder}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
