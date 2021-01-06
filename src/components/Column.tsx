import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";

function Column(props: {
  column: { id: string; title: string };
  cards: Array<{ id: string; text: string }>;
  index: number;
}) {
  const { column, cards, index } = props;
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-72 flex-none m-1 border-solid border-4 border-indigo-400 rounded-md"
        >
          <h3 className="p-1" {...provided.dragHandleProps}>
            {column.title}
          </h3>
          <Droppable droppableId={column.id} type="card">
            {(provided, snapshot) => (
              <div
                className={`${
                  snapshot.isDraggingOver ? "bg-blue-100" : ""
                } p-1 transition`}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {cards.map((c, index) => (
                  <Card key={c.id} card={c} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
