import {
  Paper,
} from "@mui/material";

interface Props {
  title: string;
  description: string;
}

export default function TaskCard({ title, description }: Props) {

  return (
    <>
      <Paper
        sx={{
          width: "270px",
          minHeight: "200px",
          height: "fit-content",
          p: "1rem",
          boxSizing: "border-box",
          background: "#5385b5",
          color: "#fff",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.01)",
          },
        }}
        elevation={4}
      >
        <div>{title}</div>
        <div>{description}</div>
      </Paper>
    </>
  );
}
