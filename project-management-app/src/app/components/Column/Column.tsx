import { ChangeEventHandler, useState } from "react";
import {
  Paper,
  Typography,
  IconButton,
  Grid,
  TextField,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import AddIcon from "@mui/icons-material/Add";
import { Draggable } from "react-beautiful-dnd";
import { useTranslation } from "react-i18next";
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useCreateTaskMutation,
} from "../../services/service";
import { IColumnPropsDrag, IInputModalProps } from "../../utils/interfaces";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Task from "../Task/Task";
import InputModal from "../InputModal/InputModal";

export default function Column({
  _id,
  title,
  order,
  boardId,
  tasks,
}: IColumnPropsDrag) {
  const { t } = useTranslation();
  const [triggerUpdate] = useUpdateColumnMutation();
  const [triggerDelete] = useDeleteColumnMutation();
  const [triggerCreate] = useCreateTaskMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTitleOpen, setIsTitleOPen] = useState(false);
  const [isAddTaskModalOpen, setIsAddTaskModalOpen] = useState(false);
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

  const addTaskHandler = () => setIsAddTaskModalOpen(true);

  const inputModalProps: IInputModalProps = {
    title: t("columnContent.modalTitle"),
    inputsContent: [t("columnContent.modalContentFirst"), t("columnContent.modalContentSecond")],
    confirmHandler: (value) => {
      const userId = window.localStorage.getItem("app_user_id") || "";
      triggerCreate({
        boardId,
        columnId: _id,
        body: {
          title: value.first,
          description: value.second || "",
          order: tasks?.length || 0,
          userId,
          users: [userId],
        },
      });
      setIsAddTaskModalOpen(false);
    },
    closeHandler: () => {
      setIsAddTaskModalOpen(false);
    },
  };

  return (
    <>
      <Paper
        sx={{
          width: "320px",
          maxHeight: "100%",
          height: "fit-content",
          p: "1rem",
          boxSizing: "border-box",
          background: "#5385b5",
          color: "#fff",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
            opacity: ".9",
          },
        }}
        elevation={4}
      >
        <Grid container alignItems="center">
          {isTitleOpen ? (
            <Grid container item direction="row">
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
            </Grid>
          ) : (
            <Grid container item direction="row">
              <Button
                disableElevation
                sx={{
                  width: "80%",
                  color: "#fff",
                  justifyContent: "left",
                  textTransform: "none",
                  "&:hover": {
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
            </Grid>
          )}

          <Grid
            container
            item
            flexDirection="column"
            sx={{
              width: "100%",
              gap: 1,
              my: 2,
              flexWrap: "noWrap",
              height: "200px",
              overflowY: "auto",
              overflowX: "hidden",
              "&::-webkit-scrollbar": {
                width: "7px",
              },
              "&::-webkit-scrollbar-track": {
                background: "#d2d2d6",
              },
              "&::-webkit-scrollbar-thumb": {
                background: "#3f51b5",
              },
            }}
          >
            {tasks.map((item, index) => {
              return (
                <Draggable key={item._id} draggableId={item._id} index={index}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        style={{
                          width: "100%",
                        }}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      >
                        <Task {...item} />
                      </div>
                    );
                  }}
                </Draggable>
              );
            })}
          </Grid>
          <Button
            startIcon={<AddIcon />}
            disableElevation
            variant="contained"
            fullWidth
            onClick={addTaskHandler}
            sx={{
              color: "#fff",
            }}
          >
            {t("columnContent.button")}
          </Button>
        </Grid>
      </Paper>
      {isModalOpen && (
        <ConfirmModal
          content={t("columnContent.modalContent")}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
      {isAddTaskModalOpen && <InputModal {...inputModalProps} />}
    </>
  );
}
