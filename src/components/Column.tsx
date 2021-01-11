import { Droppable, Draggable } from "react-beautiful-dnd";
import Card from "./Card";
import ColumnHeader from "./ColumnHeader";
import ColumnFooter from "./ColumnFooter";
import emptyState from "../assets/undraw_No_data_re_kwbl.svg";

import "./Column.css";

import { CARD, COLUMN, OPTIONS } from "../types";

function Column(props: {
  column: COLUMN;
  cards: Array<CARD>;
  index: number;
  options: OPTIONS;
  showSelection: boolean;
  selected: boolean;
  setShowSelection: (showSelection: boolean) => any;
  createCardHandler: (text: string) => any;
  removeCardHandler: (cardId: string) => any;
  removeColumnHandler: (columnId: string) => any;
  clipboardHandler: (columnId: string) => any;
  updateColumnHandler: (title: string) => any;
  openAllCardsHandler: (columnId: string) => any;
  collapseHandler: (collapse: boolean) => any;
  selectionHandler: (columnId: string) => any;
}) {
  const {
    column,
    cards,
    index,
    options,
    showSelection,
    selected,
    setShowSelection,
    createCardHandler,
    removeCardHandler,
    removeColumnHandler,
    clipboardHandler,
    updateColumnHandler,
    openAllCardsHandler,
    collapseHandler,
    selectionHandler,
  } = props;

  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided) => (
        <div className="" {...provided.draggableProps} ref={provided.innerRef}>
          <div
            className={`w-80 flex-none m-4 rounded-md shadow-md ring-1 ring-black ring-opacity-5 ${
              selected ? "bg-gray-100" : "bg-white"
            }`}
          >
            <ColumnHeader
              column={column}
              removeColumnHandler={removeColumnHandler}
              clipboardHandler={clipboardHandler}
              updateColumnHandler={updateColumnHandler}
              openAllCardsHandler={openAllCardsHandler}
              collapse={false}
              showSelection={showSelection}
              setShowSelection={setShowSelection}
              selected={selected}
              selectionHandler={selectionHandler}
              collapseHandler={collapseHandler}
              dragHandleProps={provided.dragHandleProps}
            />

            <Droppable droppableId={column.id} type="card">
              {(provided, snapshot) => (
                <div
                  id="scrollDiv"
                  className={`${
                    snapshot.isDraggingOver ? "bg-gray-100" : ""
                  } p-4 space-y-4 transition max-h-80 overflow-y-auto shadow-inner`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {cards.length === 0 && !snapshot.isDraggingOver ? (
                    <div>
                      <img
                        className="w-12 m-auto"
                        src={emptyState}
                        alt="Empty State"
                      />{" "}
                    </div>
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
            <ColumnFooter
              options={options}
              createCardHandler={createCardHandler}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
}

export default Column;