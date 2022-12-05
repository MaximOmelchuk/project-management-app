import React, { useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useTranslation } from "react-i18next";
import { useDeleteTaskMutation } from "../../services/service";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { IEditTaskModalProps, ITaskProps } from "../../utils/interfaces";
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
  const { t } = useTranslation();
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

  const containerStyle = {
    width: "100%",
    justifyContent: "space-between",
    textTransform: "none",
    padding: ".5rem 1rem",
    zIndex: 2,
    "&:hover": { cursor: "pointer" },
  };

  const titleStyle = {
    maxHeight: "10rem",
    maxWidth: "80%",
    wordWrap: "break-word",
  };

  return (
    <>
      <Paper variant="outlined" sx={{ width: "100%", transform: "none" }}>
        <Grid sx={containerStyle} onClick={openEditModalHandler} container>
          <Typography align="left" sx={titleStyle}>
            {title}
          </Typography>
          <DeleteOutlineIcon onClick={deleteHandler} />
        </Grid>
      </Paper>
      {isConfirmModalOpen && (
        <ConfirmModal
          content={t("taskContent.modalContent")}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
      {isUpdateModalOpen && <EditTaskModal {...inputModalProps} />}
    </>
  );
}
