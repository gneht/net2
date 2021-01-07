import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { CARDS, COLUMNS, OPTIONS } from "./types";

import Header from "./components/Header";
import NewColumnComponent from "./components/NewColumnComponent";
import Column from "./components/Column";

import handleDragEnd from "./handlers/handleDragEnd";
import handleCreateCard from "./handlers/handleCreateCard";
import handleRemoveCard from "./handlers/handleRemoveCard";
import handleCreateColumn from "./handlers/handleCreateColumn";
import handleRemoveColumn from "./handlers/handleRemoveColumn";
import handleClipboard from "./handlers/handleClipboard";
import handleUpdateColumn from "./handlers/handleUpdateColumn";
import handleOpenAllCards from "./handlers/handleOpenAllCards";

import "./App.css";

const App = () => {
  const [cards, setCards] = useState<CARDS>({});
  const [columns, setColumns] = useState<COLUMNS>({});
  const [columnOrder, setColumnOrder] = useState<Array<string>>([]);

  const [options, setOptions] = useState<OPTIONS>({
    markdownLinks: false,
    openOnLaunch: true,
  });

  useEffect(() => {
    // Update board on load
    const storedCards = localStorage.getItem("cards");
    const storedColumns = localStorage.getItem("columns");
    const storedColumnOrder = localStorage.getItem("columnOrder");
    const storedOptions = localStorage.getItem("options");

    if (storedCards && storedColumns && storedColumnOrder && storedOptions) {
      const parsedCards = JSON.parse(storedCards);
      setCards(parsedCards);
      const parsedColumns = JSON.parse(storedColumns);
      setColumns(parsedColumns);
      const parsedColumnOrder = JSON.parse(storedColumnOrder);
      setColumnOrder(parsedColumnOrder);
      const parsedOptions = JSON.parse(storedOptions);
      setOptions(parsedOptions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cards", JSON.stringify(cards));
  }, [cards]);

  useEffect(() => {
    localStorage.setItem("columns", JSON.stringify(columns));
  }, [columns]);

  useEffect(() => {
    localStorage.setItem("columnOrder", JSON.stringify(columnOrder));
  }, [columnOrder]);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const onDragStart = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragUpdate = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragEnd = (result: any) => {
    handleDragEnd(result, columns, setColumns, columnOrder, setColumnOrder);
  };

  const createColumnHandler = (title: string) => {
    handleCreateColumn(title, columns, setColumns, columnOrder, setColumnOrder);
  };
  const removeColumnHandler = (columnId: string) => {
    handleRemoveColumn(
      columnId,
      cards,
      setCards,
      columns,
      setColumns,
      columnOrder,
      setColumnOrder
    );
  };
  const updateColumnHandler = (columnId: string) => (title: string) => {
    handleUpdateColumn(columnId, title, columns, setColumns);
  };

  const createCardHandler = (columnId: string) => (url: string) => {
    handleCreateCard(columnId, url, cards, setCards, columns, setColumns);
  };

  const removeCardHandler = (columnId: string) => (cardId: string) => {
    handleRemoveCard(columnId, cardId, cards, setCards, columns, setColumns);
  };

  const openAllCardsHandler = (columnId: string) => {
    handleOpenAllCards(columnId, cards, columns);
  };

  const clipboardHandler = (columnId: string) => {
    handleClipboard(columnId, cards, columns);
  };

  return (
    <div className="h-screen">
      <Header options={options} setOptions={setOptions}></Header>
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
                <NewColumnComponent
                  options={options}
                  createColumnHandler={createColumnHandler}
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
                      options={options}
                      removeColumnHandler={removeColumnHandler}
                      updateColumnHandler={updateColumnHandler(column.id)}
                      createCardHandler={createCardHandler(column.id)}
                      removeCardHandler={removeCardHandler(column.id)}
                      openAllCardsHandler={openAllCardsHandler}
                      clipboardHandler={clipboardHandler}
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
};

export default App;
