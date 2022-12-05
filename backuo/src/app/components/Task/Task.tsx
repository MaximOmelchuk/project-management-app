import { Button, Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { ITaskProps } from "../../utils/interfaces";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useDeleteTaskMutation } from "../../services/service";
import ConfirmModal from "../ConfirmModal/ConfirmModal";

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
  const [triggerDelete] = useDeleteTaskMutation();
  const deleteHandler = () => setIsConfirmModalOpen(true);
  const confirmModalHandler = () => {
    triggerDelete({ boardId, columnId, taskId: _id });
  };
  const closeModalHandler = () => {
    setIsConfirmModalOpen(false);
  };

  return (
    <>
      <Paper variant="outlined" sx={{ width: "100%" }}>
        <Button
          sx={{
            width: "100%",
            justifyContent: "space-between",
            textTransform: "none",
          }}
          onClick={() => console.log("fire button")}
          disableElevation={true}
        >
          <Typography
            align="left"
            sx={{ maxHeight: "10rem", maxWidth: "80%", wordWrap: "break-word" }}
          >
            {title}
          </Typography>
          <DeleteOutlineIcon
            onClick={(e) => {
              e.stopPropagation();
              deleteHandler();
            }}
          />
        </Button>
      </Paper>
      {isConfirmModalOpen && (
        <ConfirmModal
          content={MODAL_CONTENT}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
    </>
  );
}
