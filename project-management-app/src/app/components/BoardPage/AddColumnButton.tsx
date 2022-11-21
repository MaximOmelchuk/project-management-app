import React from "react";
import { Button, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddColumnButton({
  clickHandler,
}: {
  clickHandler: () => void;
}) {
  const TEXT_CONTENT = "ADD COLUMN";

  return (
    <Button
      startIcon={<AddIcon />}
      onClick={clickHandler}
      sx={{
        width: "300px",
        height: "50px",
        p: "1rem 1rem",
        boxSizing: "border-box",
        background: "#5385b5",
        color: "#fff",
        position: "relative",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.01)",
          background: "#0d4780",
        },
      }}
    >
      {TEXT_CONTENT}
    </Button>
  );
}
