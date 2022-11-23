import { useState } from "react";
import { Grid, Typography, Button } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  useCreateBoardMutation,
  useGetBoardsListQuery,
} from "../../services/service";
import { IInputModalProps } from "../../utils/interfaces";
import Board from "../Board/Board";
import Column from "../Column/Column";
import InputModal from "../InputModal/InputModal";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { data, isSuccess } = useGetBoardsListQuery(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTrigger] = useCreateBoardMutation();
  console.log(data);
  const userId = window.localStorage.getItem("app_user_id") || "";

  const createHandler = () => setIsCreateModalOpen(true);
  const inputModalProps: IInputModalProps = {
    title: "Create new Board",
    inputsContent: ["Board title", "Board description"],
    confirmHandler: (value) => {
      createTrigger({
        title: JSON.stringify(Object.values(value)),
        owner: userId,
        users: [userId],
      });
      setIsCreateModalOpen(false);
    },
    closeHandler: () => {
      setIsCreateModalOpen(false);
    },
  };

  return (
    <>
      <Typography
        variant="h4"
        align="left"
        sx={{ mb: 2, fontWeight: "600" }}
        color="#fff"
      >
        YOUR BOARDS
      </Typography>
      <Grid container justifyContent="left">
        <Button
          variant="contained"
          size="large"
          endIcon={<AddCircleOutlineIcon />}
          onClick={createHandler}
          sx={{ mb: 2, alignSelf: "left" }}
        >
          Add new board
        </Button>{" "}
      </Grid>
      {isCreateModalOpen && <InputModal {...inputModalProps} />}
      <Grid container gap="1rem">
        {isSuccess &&
          [...data].reverse().map((item) => <Board {...item} key={item._id} />)}
        {/* <Column
          data={{ _id: "dfdf", title: "New Title", order: 1, boardId: "sdsds" }}
        /> */}
      </Grid>
    </>
  );
}
