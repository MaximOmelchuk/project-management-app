import { ChangeEventHandler, EventHandler, useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import { NavLink } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

export default function Column({
  data,
}: {
  data: { _id: string; title: string; order: number; boardId: string };
}) {
  const [isTitleOpen, setIsTitleOPen] = useState(false);
  const [titleInput, setTitleInput] = useState(data.title);
  const [backUpInput, setBackUpInput] = useState(data.title);

  const changeTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleInput(e?.target?.value || "");
  };

  const titleSwitchHandler = () => {
    setIsTitleOPen(!isTitleOpen);
  };

  const approveSwitchHandler = () => {
    setBackUpInput(titleInput);
    titleSwitchHandler();
  };

  const denySwitchHandler = () => {
    setTitleInput(backUpInput);
    titleSwitchHandler();
  };

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
      <Grid container alignItems="center">
        {isTitleOpen ? (
          <>
            <TextField
              color="primary"
              size="small"
              autoFocus
              value={titleInput}
              sx={{
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
              }}
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
          </>
        ) : (
          <>
            <Button
              //   variant="text"
              disableElevation
              sx={{
                width: "80%",
                color: "#fff",
                justifyContent: "left",
                textTransform: "none",
                "&:hover": {
                  transform: "scale(1.01)",
                  border: "2px solid #fff",
                },
              }}
              onClick={titleSwitchHandler}
            >
              <Typography variant="h6" align="left">
                {backUpInput}
              </Typography>
            </Button>
            <IconButton>
              <DeleteIcon fontSize="large" htmlColor="#fff" />
            </IconButton>
          </>
        )}
      </Grid>
    </Paper>
    // </NavLink>
  );
}
