import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Grid, Typography } from "@mui/material";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  useCreateColumnMutation,
  useGetBoardByIdQuery,
  useGetColumnListQuery,
} from "../../services/service";
import { parseBoardTitle } from "../../utils/utils";
import { IColumnProps, IInputModalProps } from "../../utils/interfaces";
import InputModal from "../InputModal/InputModal";
import AddButton from "../AddButton/AddButton";
import Column from "../Column/Column";

export default function BoardPage() {
  const BUTTON_CONTENT = "Back";
  const ADD_COLUMN_BUTTON_CONTENT = "Add column";

  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contentArr, setContentArr] = useState(["", ""]);
  const [arrColumnsState, setArrColumnState] = useState<IColumnProps[]>([]);
  const params = useParams();
  const { data, isSuccess } = useGetBoardByIdQuery(params?.boardId || "");
  const { data: arrColumns, isSuccess: isSuccessColumns } =
    useGetColumnListQuery(params?.boardId || "");
  const [createTrigger, result] = useCreateColumnMutation();

  useEffect(() => {
    if (isSuccessColumns) {
      setArrColumnState(arrColumns || []);
    }
  }, [isSuccessColumns]);

  const inputModalProps: IInputModalProps = {
    title: "Create new Column",
    inputsContent: ["Column title"],
    confirmHandler: (value) => {
      createTrigger({
        id: params.boardId || "",
        body: { title: value.first, order: arrColumnsState?.length || 0 },
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

  const backClickHandler = () => {
    navigate(-1);
  };

  const onDragEnd = () => {
    console.log("fire");
  };

  return (
    <Grid p="2rem">
      {showTitle && (
        <Grid color="#fff" sx={{ maxWidth: "30rem", mb: 2 }}>
          <Grid container justifyContent="left" gap="1rem" sx={{ mb: 0.7 }}>
            <Button
              variant="outlined"
              size="large"
              sx={{ background: "#070e4a" }}
              startIcon={<ArrowBackIosIcon />}
              onClick={backClickHandler}
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
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid sx={{ width: "100%", overflowX: "auto" }}>
          <Grid
            container
            sx={{
              mt: 2,
              gap: 2,
              flexDirection: "row",
              flexWrap: "nowrap",
              height: "50vh",
              maxHeight: "70vh",
              width: "fit-content",
            }}
          >
            {[...arrColumnsState].reverse().map((item) => (
              <Droppable droppableId={item._id} key={item._id}>
                {(provided, snapshot) => (
                  <div
                    style={{ padding: "1rem" }}
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    key={item._id}
                  >
                    <Column {...item} setArrColumnState={setArrColumnState} />
                  </div>
                )}
              </Droppable>
            ))}
            <AddButton
              clickHandler={clickAddHandler}
              content={ADD_COLUMN_BUTTON_CONTENT}
            />
          </Grid>
          {isCreateModalOpen && <InputModal {...inputModalProps} />}
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
