import { ChangeEventHandler, useState } from "react";
import {
  Paper,
  Grid,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTranslation } from "react-i18next";
import {
  useDeleteColumnMutation,
  useUpdateColumnMutation,
  useCreateTaskMutation,
} from "../../services/service";
import { IColumnPropsDrag, IInputModalProps } from "../../utils/interfaces";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import InputModal from "../InputModal/InputModal";
import OpenTitle from "./OpenTitle";
import ClosedTitle from "./ClosedTitle";
import TasksSection from "./TasksSection";

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
    inputsContent: [
      t("columnContent.modalContentFirst"),
      t("columnContent.modalContentSecond"),
    ],
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

  const containerStyle = {
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
  };

  return (
    <>
      <Paper sx={containerStyle} elevation={4}>
        <Grid container alignItems="center">
          {isTitleOpen ? (
            <OpenTitle
              titleInput={titleInput}
              changeTitleHandler={changeTitleHandler}
              approveSwitchHandler={approveSwitchHandler}
              denySwitchHandler={denySwitchHandler}
            />
          ) : (
            <ClosedTitle
              backUpInput={backUpInput}
              titleSwitchHandler={titleSwitchHandler}
              deleteColumnHandler={deleteColumnHandler}
            />
          )}
          <TasksSection tasks={tasks} />
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
