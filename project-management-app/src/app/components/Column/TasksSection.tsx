import { Draggable } from "react-beautiful-dnd";
import { Grid } from "@mui/material";
import { ITaskProps } from "../../utils/interfaces";
import Task from "../Task/Task";

type TasksSectionProps = {
  tasks: ITaskProps[];
};

export default function TasksSection({ tasks }: TasksSectionProps) {
  const style = {
    width: "100%",
    gap: 1,
    my: 2,
    flexWrap: "noWrap",
    height: "200px",
    overflowY: "auto",
    overflowX: "hidden",
    "&::-webkit-scrollbar": {
      width: "7px",
    },
    "&::-webkit-scrollbar-track": {
      background: "#d2d2d6",
    },
    "&::-webkit-scrollbar-thumb": {
      background: "#3f51b5",
    },
  };

  return (
    <Grid container item flexDirection="column" sx={style}>
      {tasks.map((item, index) => (
        <Draggable key={item._id} draggableId={item._id} index={index}>
          {(provided) => {
            return (
              <div
                style={{
                  width: "100%",
                }}
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
              >
                <Task {...item} />
              </div>
            );
          }}
        </Draggable>
      ))}
    </Grid>
  );
}
