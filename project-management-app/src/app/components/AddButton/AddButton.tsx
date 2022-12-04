import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

export default function AddButton({
  clickHandler,
  content,
}: {
  clickHandler: () => void;
  content: string;
}) {
  return (
    <Button
      startIcon={<AddIcon />}
      onClick={clickHandler}
      sx={{
        width: "250px",
        height: "50px",
        p: "1rem",
        boxSizing: "border-box",
        background: "#070e4a",
        color: "#fff",
        position: "relative",
        fontSize: "1.1rem",
        "&:hover": {
          cursor: "pointer",
          transform: "scale(1.01)",
          background: "#0d4780",
        },
      }}
    >
      {content}
    </Button>
  );
}
