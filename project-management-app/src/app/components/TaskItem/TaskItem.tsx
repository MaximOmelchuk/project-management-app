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
        sx={{
          width: "270px",
          minHeight: "200px",
          boxSizing: "border-box",
          background: "#5385b5",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
            transform: "scale(1.01)",
          },
        }}
        elevation={4}
      >
        <Button
          sx={{
            width: "100%",
            height: "100%",
            justifyContent: "space-between",
            alignItems: "flex-start",
            p: "1rem",
            textTransform: "none",
            color: "#fff",
          }}
          onClick={openEditModalHandler}
          disableElevation={true}
        >
          <Grid container alignItems="center">

            <Grid container direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6" sx={{ maxHeight: "10rem", maxWidth: "75%", wordWrap: "break-word" }}>
                {title}
              </Typography>
              <IconButton>
                <DeleteIcon fontSize="large" htmlColor="#fff" onClick={(e) => {
                  e.stopPropagation();
                  deleteHandler();
                }} />
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
        </Button>
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
