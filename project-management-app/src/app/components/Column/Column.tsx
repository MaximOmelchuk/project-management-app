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
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
} from "../../services/service";
import { IColumnProps } from "../../utils/interfaces";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

export default function Column({ _id, title, order, boardId }: IColumnProps) {
  const MODAL_CONTENT = "Are your sure you want to delete this column?";
  const [triggerUpdate] = useUpdateColumnMutation();
  const [triggerDelete] = useDeleteColumnMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitleOpen, setIsTitleOPen] = useState(false);
  const [titleInput, setTitleInput] = useState(title);
  const [backUpInput, setBackUpInput] = useState(title);

  const changeTitleHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setTitleInput(e?.target?.value || "");
  };

  const titleSwitchHandler = () => {
    setIsTitleOPen(!isTitleOpen);
  };

  const approveSwitchHandler = () => {
    setBackUpInput(titleInput);
    titleSwitchHandler();
    triggerUpdate({
      boardId,
      columnId: _id,
      body: { title: titleInput, order },
    });
  };

  const denySwitchHandler = () => {
    setTitleInput(backUpInput);
    titleSwitchHandler();
  };

  const deleteColumnHandler = () => {
    setIsModalOpen(true);
  };

  const confirmModalHandler = () => {
    triggerDelete({ boardId, columnId: _id });
  };

  const closeModalHandler = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Paper
        sx={{
          width: "350px",
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
              <IconButton onClick={deleteColumnHandler}>
                <DeleteIcon fontSize="large" htmlColor="#fff" />
              </IconButton>
            </>
          )}
        </Grid>
      </Paper>
      {isModalOpen && (
        <ConfirmModal
          content={MODAL_CONTENT}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
    </>
  );
}
