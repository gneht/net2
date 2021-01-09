import { Draggable } from "react-beautiful-dnd";
import { CARD } from "../types";

function Card(props: {
  card: CARD;
  index: number;
  removeCardHandler: (cardId: string) => any;
}) {
  const { card, index, removeCardHandler } = props;
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <div
          className={`${
            snapshot.isDragging ? "bg-gray-100" : ""
          } mb-1 p-1 border-solid border-4 border-gray-400 rounded-md flex justify-between`}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {/* https://stackoverflow.com/questions/38599939/how-to-get-larger-favicon-from-googles-api/46044485 */}
          <img
            className="h-5 w-5"
            alt="favicon"
            src={"http://www.google.com/s2/favicons?sz=64&domain=" + card.url}
          ></img>
          <div>{card.text ? card.text : card.url}</div>
          <div>
            <button onClick={() => navigator.clipboard.writeText(card.url)}>
              C
            </button>
            <button onClick={() => removeCardHandler(card.id)}>X</button>
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Card;
