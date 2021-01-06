import { Draggable } from "react-beautiful-dnd";

function Card(props: { card: { id: string; text: string }; index: number }) {
  const { card, index } = props;
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${
            snapshot.isDragging ? "bg-indigo-100" : ""
          } mb-1 p-1 border-solid border-4 border-blue-400 rounded-md`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {card.text}
        </div>
      )}
    </Draggable>
  );
}

export default Card;
