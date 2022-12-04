import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
} from "../../utils/interfaces";
import InputModal from "../InputModal/InputModal";
import AddButton from "../AddButton/AddButton";
import BoardPageHeadSection from "./BoardPageHeadSection";
import DroppableColumn from "./DroppableColumn";

export default function BoardPage() {
  const { t } = useTranslation();
  const params = useParams();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contentArr, setContentArr] = useState(["", ""]);
  const [commonTaskColumn, setCommonTaskColumn] = useState<IColumnProps[]>([]);
  const { data, isSuccess } = useGetBoardByIdQuery(params?.boardId || "");
  const { data: arrColumns, isSuccess: isSuccessColumns } =
    useGetColumnListQuery(params?.boardId || "");
  const [createTrigger] = useCreateColumnMutation();
  const [tasksSetTrigger] = useTasksSetMutation();
  const { data: allTasks, isSuccess: isSuccessAllTasks } =
    useGetAllTasksSetByIdQuery(params?.boardId || "");

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
    title: t("boardPageContent.createTitle"),
    inputsContent: [t("boardPageContent.createContent")],
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
    }
  }, [isSuccess, data?.title]);

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;

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

  const containerStyle = {
    width: "100%",
    height: '400px',
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
  };

  const columnsWrapStyle = {
    mt: 2,
    gap: 2,
    flexDirection: "row",
    flexWrap: "nowrap",
    height: "50vh",
    width: "fit-content",
  };

  return (
    <Grid p="2rem">
      <BoardPageHeadSection contentArr={contentArr} />
      <DragDropContext onDragEnd={onDragEnd}>
        <Grid sx={containerStyle}>
          <Grid container sx={columnsWrapStyle}>
            {commonTaskColumn.map((item) => (
              <DroppableColumn item={item} key={item._id} />
            ))}
            <AddButton
              clickHandler={clickAddHandler}
              content={t("boardPageContent.button")}
            />
          </Grid>
          {isCreateModalOpen && <InputModal {...inputModalProps} />}
        </Grid>
      </DragDropContext>
    </Grid>
  );
}
