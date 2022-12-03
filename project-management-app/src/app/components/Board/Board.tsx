import { useState } from "react";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Paper, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  useDeleteBoardMutation,
  useUpdateBoardMutation,
} from "../../services/service";
import { IBoardData, IBoardProps } from "../../utils/interfaces";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import { parseBoardTitle } from "../../utils/utils";

export default function Board({ title, _id: id, owner, users }: IBoardProps) {
  const navigate = useNavigate();
  const params = useParams();
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

  return (
    <>
      <Paper
        onClick={() => navigate(`/boards/${id}`)}
        sx={{
          width: "320px",
          minHeight: "200px",
          p: "1rem 1rem",
          boxSizing: "border-box",
          background: "#5385b5",
          color: "#fff",
          position: "relative",
          "&:hover": {
            cursor: "pointer",
            // transform: "scale(1.01)",
          },
        }}
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
          content={t('boardContent.modalContent')}
          confirmHandler={confirmModalHandler}
          closeHandler={closeModalHandler}
        />
      )}
    </>
  );
}
