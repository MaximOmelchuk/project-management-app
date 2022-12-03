import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Button, Grid, Typography } from "@mui/material";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  useCreateColumnMutation,
  useGetBoardByIdQuery,
  useGetColumnListQuery,
  useTasksSetMutation,
  useGetAllTasksSetByIdQuery,
} from "../../services/service";
import {
  parseBoardTitle,
  reduceTaskData,
  replaceOrderWithIndexInArray,
} from "../../utils/utils";
import {
  IColumnProps,
  IInputModalProps,
  ITaskProps,
  ITasksState,
} from "../../utils/interfaces";
import InputModal from "../InputModal/InputModal";
import AddButton from "../AddButton/AddButton";
import Column from "../Column/Column";

export default function BoardPage() {
  const BUTTON_CONTENT = "Back";
  const ADD_COLUMN_BUTTON_CONTENT = "Add column";
  const { t } = useTranslation();

  const navigate = useNavigate();
  const params = useParams();
  const [showTitle, setShowTitle] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contentArr, setContentArr] = useState(["", ""]);

  const { data, isSuccess } = useGetBoardByIdQuery(params?.boardId || "");
  const { data: arrColumns, isSuccess: isSuccessColumns } =
    useGetColumnListQuery(params?.boardId || "");
  const [createTrigger, result] = useCreateColumnMutation();
  const [tasksSetTrigger] = useTasksSetMutation();
  const { data: allTasks, isSuccess: isSuccessAllTasks } =
    useGetAllTasksSetByIdQuery(params?.boardId || "");
  const [commonTaskColumn, setCommonTaskColumn] = useState<IColumnProps[]>([]);

  useEffect(() => {
    if (isSuccessAllTasks && isSuccessColumns) {
      const columnsCopy = [...arrColumns].map((column) => {
        const tasksForColumn = allTasks
          .filter((task: ITaskProps) => task.columnId === column._id)
          .sort((a, b) => a.order - b.order);
        return { ...column, tasks: tasksForColumn };
      });
      setCommonTaskColumn(columnsCopy);
    }
  }, [isSuccessAllTasks, allTasks, isSuccessColumns, arrColumns]);

  const inputModalProps: IInputModalProps = {
    title: t('boardPageContent.createTitle'),
    inputsContent: [t('boardPageContent.createContent')],
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

  const backClickHandler = () => {
    navigate(-1);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination, draggableId } = result;

    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = commonTaskColumn?.find(
        (column) => column._id === source.droppableId
      );
      const destColumn = commonTaskColumn?.find(
        (column) => column._id === destination.droppableId
      );
      const sourceItems = [...(sourceColumn?.tasks || [])];
      const destItems = [...(destColumn?.tasks || [])];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      const replacedOrdersArrSource = replaceOrderWithIndexInArray(sourceItems);
      const replacedOrdersArrDest = replaceOrderWithIndexInArray(destItems);
      const preparedArrSource = reduceTaskData(replacedOrdersArrSource);
      const preparedArrDest = reduceTaskData(
        replacedOrdersArrDest,
        destColumn?._id
      );
      setCommonTaskColumn((prevState) =>
        prevState.map((column) => {
          return column._id === source.droppableId
            ? { ...column, tasks: replacedOrdersArrSource }
            : column._id === destination.droppableId
            ? { ...column, tasks: replacedOrdersArrDest }
            : column;
        })
      );
      tasksSetTrigger([...preparedArrSource, ...preparedArrDest]);
    } else {
      const sourceColumn = commonTaskColumn?.find(
        (column) => column._id === source.droppableId
      );
      const prevTasksArr = sourceColumn?.tasks || [];
      const copiedTasksArr = [...prevTasksArr];
      const [removed] = copiedTasksArr.splice(source.index, 1);
      copiedTasksArr.splice(destination.index, 0, removed);
      const replacedOrdersArr = replaceOrderWithIndexInArray(copiedTasksArr);
      const preparedArr = reduceTaskData(replacedOrdersArr);
      setCommonTaskColumn((prevState) =>
        prevState.map((column) => {
          return column._id === source.droppableId
            ? { ...column, tasks: replacedOrdersArr }
            : column;
        })
      );
      tasksSetTrigger(preparedArr);
    }
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
              {t('boardPageContent.title')}
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
        <Grid
          sx={{
            width: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            "&::-webkit-scrollbar": {
              height: "10px",
            },
            "&::-webkit-scrollbar-track": {
              background: "#d2d2d6",
            },
            "&::-webkit-scrollbar-thumb": {
              background: "#3f51b5",
            },
          }}
        >
          <Grid
            container
            sx={{
              mt: 2,
              gap: 2,
              flexDirection: "row",
              flexWrap: "nowrap",
              height: "50vh",
              width: "fit-content",
            }}
          >
            {[...commonTaskColumn].reverse().map((item) => (
              <Droppable droppableId={item._id} key={item._id}>
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Column {...item} isDragging={snapshot.isDraggingOver} />
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            ))}
            <AddButton
              clickHandler={clickAddHandler}
              content={t('boardPageContent.button')}
            />
          </Grid>
          {isCreateModalOpen && <InputModal {...inputModalProps} />}
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
