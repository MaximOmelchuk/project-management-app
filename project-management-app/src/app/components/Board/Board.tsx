import { Paper, Typography, IconButton } from "@mui/material";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Board({
  title,
  // content,
}: {
  title: string;
  // content?: string;
}) {
  return (
    // <NavLink to={"./"}>
    <Paper
      sx={{
        width: "350px",
        minHeight: "200px",
        p: "1rem 1rem",
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
      <Typography align="left" variant="h6">
        {title}
      </Typography>
      {/* {content && (
        <Typography align="left" variant="body1">
          {content}
        </Typography>
      )} */}
      <IconButton
        size="large"
        sx={{ position: "absolute", right: ".5rem", bottom: ".5rem" }}
      >
        <DeleteIcon fontSize="large" htmlColor="#fff" />
      </IconButton>
    </Paper>
    // </NavLink>
  );
}
