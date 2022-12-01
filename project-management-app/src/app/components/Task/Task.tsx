import React, { useState } from "react";
import { Button, Paper, Typography, Grid } from "@mui/material";
import { IEditTaskModalProps, ITaskProps } from "../../utils/interfaces";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteTaskMutation } from "../../services/service";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import InputModal from "../InputModal/InputModal";
import EditTaskModal from "../EditTaskModal/EditTaskModal";

export default function Task({
  _id,
  title,
  order,
  boardId,
  columnId,
  description,
  userId,
  users,
}: ITaskProps) {
  const MODAL_CONTENT = "Are your sure you want to delete this task?";
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [triggerDelete] = useDeleteTaskMutation();

  const deleteHandler = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    e.stopPropagation();
    setIsConfirmModalOpen(true);
  };

  const confirmModalHandler = () => {
    triggerDelete({ boardId, columnId, taskId: _id });
  };

  const closeModalHandler = () => {
    setIsConfirmModalOpen(false);
  };

  const openEditModalHandler = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    e.stopPropagation();
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
      <Paper variant="outlined" sx={{ width: "100%", transform: "none" }}>
        <Grid
          sx={{
            width: "100%",
            justifyContent: "space-between",
            textTransform: "none",
            padding: '.5rem 1rem',
            zIndex: 2,
            "&:hover": { cursor: "pointer" },
          }}
          onClick={openEditModalHandler}
          container

          // disableElevation={true}
        >
          <Typography
            align="left"
            sx={{
              maxHeight: "10rem",
              maxWidth: "80%",
              wordWrap: "break-word",
            }}
          >
            {title}
          </Typography>
          <DeleteOutlineIcon onClick={deleteHandler} />
        </Grid>
      </Paper>
      {isConfirmModalOpen && (
        <ConfirmModal
          content={MODAL_CONTENT}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
      {isUpdateModalOpen && <EditTaskModal {...inputModalProps} />}
    </>
  );
}
