import { Droppable } from "react-beautiful-dnd";
import { IColumnProps } from "../../utils/interfaces";
import Column from "../Column/Column";

type DroppableColumnProps = {
    item: IColumnProps;
}

export default function DroppableColumn({item}: DroppableColumnProps) {
  return (
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
  );
}
