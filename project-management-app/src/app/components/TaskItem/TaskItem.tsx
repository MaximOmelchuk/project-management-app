import { Button, Grid, IconButton, Paper, Typography } from "@mui/material";
import { useState } from "react";
import { IEditTaskModalProps, ITaskProps } from "../../utils/interfaces";
import EditTaskModal from "../EditTaskModal/EditTaskModal";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteTaskMutation } from "../../services/service";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { useTranslation } from "react-i18next";

export default function TaskCard({
  _id,
  title,
  order,
  boardId,
  columnId,
  description,
  userId,
  users,
}: ITaskProps) {
  const { t } = useTranslation();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [triggerDelete] = useDeleteTaskMutation();
  const deleteHandler = () => setIsConfirmModalOpen(true);

  const confirmModalHandler = () => {
    triggerDelete({ boardId, columnId, taskId: _id });
  };

  const closeModalHandler = () => {
    setIsConfirmModalOpen(false);
  };

  const openEditModalHandler = () => {
    setIsUpdateModalOpen(true);
  };

  const inputModalProps: IEditTaskModalProps = {
    title,
    description,
    userId,
    users,
    columnId,
    order,
    boardId,
    taskId: _id,
    closeHandler: () => {
      setIsUpdateModalOpen(false);
    },
  };

  return (
    <>
      <Paper
        onClick={openEditModalHandler}
        sx={{
          width: "270px",
          minHeight: "200px",
          boxSizing: "border-box",
          p: "1rem",
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

            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ maxHeight: "10rem", maxWidth: "75%", wordWrap: "break-word" }}>
                {title}
              </Typography>
              <IconButton onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler();
                }}>
                <DeleteIcon fontSize="large" htmlColor="#fff" />
              </IconButton>
            </Grid>
            <Paper variant="outlined" sx={{ width: "100%", p: "0.5rem" }}>
              <Typography
                sx={{ wordWrap: "break-word" }}
              >
                {description}
              </Typography>
            </Paper>
          </Grid>
      </Paper>
      {isConfirmModalOpen && (
        <ConfirmModal
          content={t('search.deleteTitle')}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
      {isUpdateModalOpen && <EditTaskModal {...inputModalProps} />}
    </>
  );
}
