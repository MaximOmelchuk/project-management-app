import { useState } from "react";
import { Grid, Typography, Button, Box, useMediaQuery } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {
  useCreateBoardMutation,
  useGetBoardsListQuery,
} from "../../services/service";
import { IInputModalProps } from "../../utils/interfaces";
import Board from "../Board/Board";
import InputModal from "../InputModal/InputModal";
import { Loader } from "../Loader/Loader";
import { getToken } from "../../utils/tokenUtils";
import { useNavigate } from "react-router-dom";

export default function MainPage() {
  const { data, isSuccess, isFetching } = useGetBoardsListQuery(undefined);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [createTrigger] = useCreateBoardMutation();
  const userId = window.localStorage.getItem("app_user_id") || "";
  const matches = useMediaQuery("(min-width:500px)");

  const createHandler = () => setIsCreateModalOpen(true);
  const { t } = useTranslation();
  const navigate = useNavigate();

  if (!getToken()) {
    navigate('/');
  }

  const inputModalProps: IInputModalProps = {
    title: t("mainPageContent.createTitle"),
    inputsContent: [
      t("mainPageContent.createContentFirst"),
      t("mainPageContent.createContentSecond"),
    ],
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
    <Grid sx={{ maxWidth: "1500px", p: '2rem', mx: 'auto'}}>
      <Typography
        variant="h4"
        align="left"
        sx={{ mb: 2, fontWeight: "600" }}
        color="#fff"
      >
        {t("mainPageContent.title")}
      </Typography>
      <Grid container justifyContent="left">
        <Button
          variant="contained"
          size={matches ? "large" : "medium"}
          endIcon={<AddCircleOutlineIcon />}
          onClick={createHandler}
          sx={{ mb: 2, alignSelf: "left" }}
        >
         {t('mainPageContent.button')}
        </Button>{" "}
      </Grid>
      {isCreateModalOpen && <InputModal {...inputModalProps} />}
      {isFetching ?
        <Box maxWidth="500px" margin="auto">
          <Loader isOpen={true} />
        </Box> :
        <Grid container gap="1rem">
          {isSuccess &&
            [...data].reverse().map((item) => <Board {...item} key={item._id} />)}
        </Grid>}
    </Grid>
  );
}
