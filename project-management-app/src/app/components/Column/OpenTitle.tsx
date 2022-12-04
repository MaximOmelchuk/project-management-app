import { ChangeEventHandler } from "react";
import { Grid, TextField, IconButton } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

type OpenTitleProps = {
  titleInput: string;
  changeTitleHandler: ChangeEventHandler<HTMLInputElement>;
  approveSwitchHandler: () => void;
  denySwitchHandler: () => void;
};

export default function OpenTitle({
  titleInput,
  changeTitleHandler,
  approveSwitchHandler,
  denySwitchHandler,
}: OpenTitleProps) {
    
  const inputStyle = {
    width: "75%",
    height: "50px",
    alignSelf: "center",
    justifyContent: "center",
    input: {
      color: "#fff",
      borderColor: "#fff",
      alignSelf: "center",
    },
    "& .MuiOutlinedInput-root:hover": {
      "& > fieldset": {
        borderColor: "#f0f0f0",
        boxShadow: "4px 4px 8px 0px rgba(230, 237, 242, 0.2)",
      },
    },
    fieldset: { borderColor: "#fff" },
    ".Mui-focused fieldset": { borderColor: "#fff" },
    ".css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
      { borderColor: "#fff" },
    "& .MuiOutlinedInput-root": {
      "&.Mui-focused fieldset": {
        borderColor: "#fff",
      },
    },
  };

  return (
    <Grid container item direction="row">
      <TextField
        color="primary"
        size="small"
        autoFocus
        value={titleInput}
        sx={inputStyle}
        onChange={changeTitleHandler}
      />

      <IconButton
        aria-label="delete"
        size="small"
        color="success"
        onClick={approveSwitchHandler}
      >
        <TaskAltIcon htmlColor="#62f598" />
      </IconButton>
      <IconButton
        aria-label="delete"
        size="small"
        color="error"
        onClick={denySwitchHandler}
      >
        <DeleteOutlineIcon htmlColor="#f0806e" />
      </IconButton>
    </Grid>
  );
}
