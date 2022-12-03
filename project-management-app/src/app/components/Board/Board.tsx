import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteBoardMutation } from "../../services/service";
import { IBoardProps } from "../../utils/interfaces";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { parseBoardTitle } from "../../utils/utils";

export default function Board({ title, _id: id }: IBoardProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [boardTitle, boardDescription] = parseBoardTitle(title);
  const [triggerDelete] = useDeleteBoardMutation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModalHandler = () => setIsModalOpen(false);
  const confirmModalHandler = () => {
    triggerDelete(id);
    setIsModalOpen(false);
  };
  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const clickBoardHandler = () => navigate(`/boards/${id}`);

  const containerStyle = {
    width: "320px",
    minHeight: "200px",
    p: "1rem",
    boxSizing: "border-box",
    background: "#5385b5",
    color: "#fff",
    position: "relative",
    "&:hover": {
      cursor: "pointer",
    },
  }

  return (
    <>
      <Paper
        onClick={clickBoardHandler}
        sx={containerStyle}
        elevation={4}
      >
        <Typography align="left" variant="h6" sx={{ wordBreak: "break-word" }}>
          {boardTitle}
        </Typography>
        <Typography
          align="left"
          sx={{ opacity: ".7", wordBreak: "break-word" }}
          variant="subtitle1"
        >
          {boardDescription}
        </Typography>

        <IconButton
          size="large"
          onClick={deleteHandler}
          sx={{ position: "absolute", right: ".5rem", bottom: ".5rem" }}
        >
          <DeleteIcon fontSize="large" htmlColor="#fff" />
        </IconButton>
      </Paper>
      {isModalOpen && (
        <ConfirmModal
          content={t("boardContent.modalContent")}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
    </>
  );
}
