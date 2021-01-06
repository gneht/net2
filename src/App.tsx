import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { CARDS, COLUMNS } from "./types";

import NewListComponent from "./components/NewListComponent";
import Column from "./components/Column";

import dragEndHandler from "./handlers/dragEndHandler";

import "./App.css";

function App() {
  const [cards, setCards] = useState<CARDS>({});
  const [columns, setColumns] = useState<COLUMNS>({});
  const [columnOrder, setColumnOrder] = useState<Array<string>>([]);

  useEffect(() => {
    // Load board and set options

    /* DUMMY DATA */
    setCards({
      t0: { id: "t0", text: "Apple" },
      t1: { id: "t1", text: "Disney" },
      t2: { id: "t2", text: "Dog" },
      t3: { id: "t3", text: "Cat" },
      t4: { id: "t4", text: "The Giving Tree" },
    });
    setColumnOrder(["c1", "c2", "c0"]);
    setColumns({
      c0: { id: "c0", title: "Stonks", cardIds: ["t0", "t1"] },
      c1: { id: "c1", title: "Cute Animals", cardIds: ["t2", "t3"] },
      c2: { id: "c2", title: "Books", cardIds: ["t4"] },
    });

    // Update board on change
  }, []);

  const onDragStart = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragUpdate = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragEnd = (result: any) => {
    dragEndHandler(result, columns, setColumns, columnOrder, setColumnOrder);
  };

  // const createListHandler = () => {
  //   // Check storage capacity
  //   // Update columns
  //   // Update columnOrder
  // };
  // const removeListHandler = () => {
  //   // Remove column
  //   // Update columnOrder
  // };
  // const updateListHandler = () => {
  //   // Check storage capacity
  //   // Update columns
  //   // Update columnOrder
  // };

  // const createCardHandler = () => {
  //   // Update cards
  //   // Update column
  // };
  // const removeCardHandler = () => {
  //   // Remove card
  //   // Update column
  // };

  // const openAllCardsHandler = () => {};

  // const clipboardHandler = () => {};

  return (
    <div className="h-screen">
      <div className="h-1/3 flex items-end">
        <h1 className="text-xl ml-8">
          Net{" "}
          <span role="img" aria-label="goal-net">
            🥅
          </span>
        </h1>
      </div>
      <div className="h-2/3">
        <DragDropContext
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="h-full flex items-start overflow-x-auto"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                <NewListComponent
                // createListHandler={createListHandler}
                />
                {columnOrder.map((e, index) => {
                  const column = columns[e];
                  const columnCards = column.cardIds.map((c) => cards[c]);
                  return (
                    <Column
                      key={column.id}
                      column={column}
                      cards={columnCards}
                      index={index}
                      // removeListHandler={removeListHandler}
                      // updateListHandler={updateListHandler}
                      // createCardHandler={createCardHandler}
                      // removeCardHandler={removeCardHandler}
                      // openAllCardsHandler={openAllCardsHandler}
                      // clipboardHandler={clipboardHandler}
                    ></Column>
                  );
                })}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
