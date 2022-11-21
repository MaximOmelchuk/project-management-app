import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  useCreateColumnMutation,
  useGetBoardByIdQuery,
  useGetColumnListQuery,
} from "../../services/service";
import { parseBoardTitle } from "../../utils/utils";
import AddColumnButton from "./AddColumnButton";
import { IInputModalProps } from "../../utils/interfaces";
import InputModal from "../InputModal/InputModal";

export default function BoardPage() {
  const BUTTON_CONTENT = "Back";
  const [showTitle, setShowTitle] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contentArr, setContentArr] = useState(["", ""]);
  const params = useParams();
  const { data, isSuccess } = useGetBoardByIdQuery(params?.boardId || "");
  const { data: arrColumns, isSuccess: isSuccessColumns } =
    useGetColumnListQuery(params?.boardId || "");
  const [createTrigger, result] = useCreateColumnMutation();

  const inputModalProps: IInputModalProps = {
    title: "Create new Column",
    inputsContent: ["Column title"],
    confirmHandler: (value) => {
      createTrigger({
        id: params.boardId || "",
        body: { title: value.first, order: arrColumns?.length || 0 },
      });
      setIsCreateModalOpen(false);
    },
    closeHandler: () => {
      setIsCreateModalOpen(false);
    },
  };

  const clickAddHandler = () => {
    setIsCreateModalOpen(true);
  };

  useEffect(() => {
    if (isSuccess) {
      setContentArr(parseBoardTitle(data.title));
      setShowTitle(true);
    }
  }, [isSuccess]);

  return (
    <>
      {showTitle && (
        <Grid color="#fff" sx={{ maxWidth: "30rem" }}>
          <Grid container justifyContent="left" gap="1rem" sx={{ mb: 0.7 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ background: "#070e4a" }}
              startIcon={<ArrowBackIosIcon />}
            >
              {BUTTON_CONTENT}
            </Button>
            <Typography variant="h4" sx={{ display: "inline-Block" }}>
              {contentArr[0]}
            </Typography>
          </Grid>
          <Typography align="left" variant="subtitle1" sx={{ opacity: ".7" }}>
            {contentArr[1]}
          </Typography>
        </Grid>
      )}
      <Grid container flexDirection="column" sx={{ mt: 2 }}>
        <AddColumnButton clickHandler={clickAddHandler} />
      </Grid>
      {isSuccessColumns && console.log(arrColumns)}
      {isCreateModalOpen && <InputModal {...inputModalProps} />}
    </>
  );
}
