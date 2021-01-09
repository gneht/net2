import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import ColumnHeader from "./ColumnHeader";
import ColumnFooter from "./ColumnFooter";

import { CARD, COLUMN, OPTIONS } from "../types";

function Column(props: {
  column: COLUMN;
  cards: Array<CARD>;
  index: number;
  options: OPTIONS;
  createCardHandler: (text: string) => any;
  removeCardHandler: (cardId: string) => any;
  removeColumnHandler: (columnId: string) => any;
  clipboardHandler: (columnId: string) => any;
  updateColumnHandler: (title: string) => any;
  openAllCardsHandler: (columnId: string) => any;
  collapseHandler: (collapse: boolean) => any;
}) {
  const {
    column,
    cards,
    index,
    options,
    createCardHandler,
    removeCardHandler,
    removeColumnHandler,
    clipboardHandler,
    updateColumnHandler,
    openAllCardsHandler,
    collapseHandler,
  } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div {...provided.draggableProps} ref={provided.innerRef}>
          <div className="w-80 flex-none m-1 border-solid border-4 border-gray-400 rounded-md">
            {/* This, including the line above, is the orignal drag/drop*/}
            <ColumnHeader
              column={column}
              removeColumnHandler={removeColumnHandler}
              clipboardHandler={clipboardHandler}
              updateColumnHandler={updateColumnHandler}
              openAllCardsHandler={openAllCardsHandler}
              collapse={false}
              collapseHandler={collapseHandler}
              dragHandleProps={provided.dragHandleProps}
            />

            <Droppable droppableId={column.id} type="card">
              {(provided, snapshot) => (
                <div
                  className={`${
                    snapshot.isDraggingOver ? "bg-gray-100" : ""
                  } p-1 transition`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {false ? (
                    <></>
                  ) : (
                    cards.map((c, index) => (
                      <Card
                        key={c.id}
                        card={c}
                        index={index}
                        removeCardHandler={removeCardHandler}
                      />
                    ))
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {false ? (
              <></>
            ) : (
              <ColumnFooter
                options={options}
                createCardHandler={createCardHandler}
              />
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Column;
