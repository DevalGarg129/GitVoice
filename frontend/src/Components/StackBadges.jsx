import { Chip, Box } from "@mui/material";

export default function StackBadges({ stack }) {
  return (
    <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 2 }}>
      {stack.map((tech, index) => (
        <Chip
          key={index}
          label={tech}
          variant="outlined"
          sx={{
            fontSize: "0.9rem",
            borderRadius: "12px",
            padding: "6px",
          }}
        />
      ))}
    </Box>
  );
}
