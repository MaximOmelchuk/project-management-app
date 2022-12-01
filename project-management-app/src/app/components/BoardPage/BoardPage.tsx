import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import { parseBoardTitle } from "../../utils/utils";
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

  const navigate = useNavigate();
  const [showTitle, setShowTitle] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [contentArr, setContentArr] = useState(["", ""]);
  // const [arrColumnsState, setArrColumnState] = useState<IColumnProps[]>([]);
  const [tasksState, setTasksState] = useState<ITasksState>({});
  const params = useParams();
  const { data, isSuccess } = useGetBoardByIdQuery(params?.boardId || "");
  const { data: arrColumns, isSuccess: isSuccessColumns } =
    useGetColumnListQuery(params?.boardId || "");
  const [createTrigger, result] = useCreateColumnMutation();
  const [tasksSetTrigger] = useTasksSetMutation();
  const { data: allTasks, isSuccess: isSuccessAllTasks } =
    useGetAllTasksSetByIdQuery(params?.boardId || "");
  const [unorderedTasksState, setUnorderedTasksState] = useState<ITaskProps[]>(
    []
  );

  // useEffect(() => {
  //   if (isSuccessColumns) {
  //     setArrColumnState(arrColumns || []);
  //   }
  // }, [isSuccessColumns]);

  useEffect(() => {
    if (isSuccessAllTasks) {
      setUnorderedTasksState(allTasks);
      const arrColumnId = [...new Set(allTasks.map((item) => item.columnId))] // .map(item => allTasks.filter(taskItem => taskItem.columnId === item))
      setTasksState();
    }
  }, [isSuccessAllTasks, allTasks]);

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

  const setTasksHandler = (arr: ITaskProps[]) => {
    setTasksState((prev) => {
      if (!arr.length) {
        return prev;
      }
      const copy = { ...prev };
      const columnId = arr[0].columnId;
      copy[columnId] = [...arr];
      return copy;
    });
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    if (!result.destination) return;
    const { source, destination, draggableId } = result;
    console.log(source, "------source");
    console.log(destination, "------destination");

    if (source.droppableId !== destination.droppableId) {
      //   const sourceColumn = columns[source.droppableId];
      //   const destColumn = columns[destination.droppableId];
      //   const sourceItems = [...sourceColumn.items];
      //   const destItems = [...destColumn.items];
      //   const [removed] = sourceItems.splice(source.index, 1);
      //   destItems.splice(destination.index, 0, removed);
      //   setColumns({
      //     ...columns,
      //     [source.droppableId]: {
      //       ...sourceColumn,
      //       items: sourceItems,
      //     },
      //     [destination.droppableId]: {
      //       ...destColumn,
      //       items: destItems,
      //     },
      //   });
    } else {
      const prevTasksArr = tasksState[source.droppableId];
      const copiedTasksArr = [...prevTasksArr];
      const [removed] = copiedTasksArr.splice(source.index, 1);
      copiedTasksArr.splice(destination.index, 0, removed);
      const preparedArr = copiedTasksArr.map(({ _id, columnId }, index) => ({
        order: index,
        _id,
        columnId,
      }));
      // const startIndex = source.index;
      // const endIndex = destination.index;
      // const movedTask = prevTasksArr.find(item => item.order === startIndex);
      // const refactoredArr = prevTasksArr.map(item => {
      //   if (item.order <= endIndex) {
      //     item.
      //   }
      // })

      tasksSetTrigger(preparedArr);
      //   const column = columns[source.droppableId];
      //   const copiedItems = [...column.items];
      //   const [removed] = copiedItems.splice(source.index, 1);
      //   copiedItems.splice(destination.index, 0, removed);
      //   setColumns({
      //     ...columns,
      //     [source.droppableId]: {
      //       ...column,
      //       items: copiedItems,
      //     },
      //   });
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
                {(provided, snapshot) => {
                  return (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      <Column {...item} setTasksHandler={setTasksHandler} />
                      {provided.placeholder}
                    </div>
                  );
                }}
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
