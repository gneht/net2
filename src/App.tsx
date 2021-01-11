import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

import { CARDS, COLUMNS, OPTIONS } from "./types";

import Header from "./components/Header";
import NewColumnComponent from "./components/NewColumnComponent";
import Column from "./components/Column";
import CollapsedColumns from "./components/CollapsedColumns";

import handleDragEnd from "./handlers/handleDragEnd";
import handleCreateCard from "./handlers/handleCreateCard";
import handleRemoveCard from "./handlers/handleRemoveCard";
import handleCreateColumn from "./handlers/handleCreateColumn";
import handleRemoveColumn from "./handlers/handleRemoveColumn";
import handleClipboard from "./handlers/handleClipboard";
import handleUpdateColumn from "./handlers/handleUpdateColumn";
import handleOpenAllCards from "./handlers/handleOpenAllCards";
import handleCollapse from "./handlers/handleCollapse";
import handleGenerateLink from "./handlers/handleGenerateLink";

import emptyState from "./assets/undraw_blank_canvas_3rbb.svg";

import "./App.css";

const App = () => {
  const [cards, setCards] = useState<CARDS>({});
  const [columns, setColumns] = useState<COLUMNS>({});
  const [columnOrder, setColumnOrder] = useState<Array<string>>([]);
  const [collapsedOrder, setCollapsedOrder] = useState<Array<string>>([]);

  const [options, setOptions] = useState<OPTIONS>({
    markdownLinks: false,
    openOnLaunch: true,
    showCollapsed: true,
  });

  const [snap, setSnap] = useState<boolean>(true);

  const [showSelection, setShowSelection] = useState<boolean>(false);
  const [selected, setSelected] = useState<Array<string>>([]);

  useEffect(() => {
    // Update board on load
    const storedCards = localStorage.getItem("cards");
    const storedColumns = localStorage.getItem("columns");
    const storedColumnOrder = localStorage.getItem("columnOrder");
    const storedCollapsedOrder = localStorage.getItem("collapsedOrder");
    const storedOptions = localStorage.getItem("options");

    if (
      storedCards &&
      storedColumns &&
      storedColumnOrder &&
      storedOptions &&
      storedCollapsedOrder
    ) {
      const parsedCards = JSON.parse(storedCards);
      setCards(parsedCards);
      const parsedColumns = JSON.parse(storedColumns);
      setColumns(parsedColumns);
      const parsedColumnOrder = JSON.parse(storedColumnOrder);
      setColumnOrder(parsedColumnOrder);
      const parsedCollapsedOrder = JSON.parse(storedCollapsedOrder);
      setCollapsedOrder(parsedCollapsedOrder);
      const parsedOptions = JSON.parse(storedOptions);
      setOptions(parsedOptions);
    }
  }, []);

  useEffect(() => {
    var root = document.documentElement;
    if (snap) {
      root.className += " snapWrapTrue";
      root.classList.remove("snapWrapFalse");
    } else {
      root.className += " snapWrapFalse";
      root.classList.remove("snapWrapTrue");
    }
  }, [snap]);

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
    localStorage.setItem("collapsedOrder", JSON.stringify(collapsedOrder));
  }, [collapsedOrder]);

  useEffect(() => {
    localStorage.setItem("options", JSON.stringify(options));
  }, [options]);

  const onBeforeDragStart = () => {
    setSnap(false);
  };

  const onDragStart = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragUpdate = () => {
    // https://github.com/eggheadio-projects/Beautiful-and-Accessible-Drag-and-Drop-with-react-beautiful-dnd-notes/blob/master/07-react-customise-the-appearance-of-an-app-using-react-beautiful-dnd-ondragstart-and-ondragend.md
  };
  const onDragEnd = (result: any) => {
    handleDragEnd(
      result,
      columns,
      setColumns,
      columnOrder,
      setColumnOrder,
      collapsedOrder,
      setCollapsedOrder
    );
    setSnap(true);
  };

  const createColumnHandler = (title: string, imports: string) => {
    handleCreateColumn(
      title,
      cards,
      setCards,
      columns,
      options,
      setColumns,
      columnOrder,
      setColumnOrder,
      collapsedOrder,
      imports
    );
  };
  const removeColumnHandler = (columnId: string) => {
    handleRemoveColumn(
      columnId,
      cards,
      setCards,
      columns,
      setColumns,
      columnOrder,
      setColumnOrder,
      collapsedOrder,
      setCollapsedOrder
    );
  };
  const updateColumnHandler = (columnId: string) => (title: string) => {
    handleUpdateColumn(columnId, title, columns, setColumns);
  };

  const createCardHandler = (columnId: string) => (url: string) => {
    handleCreateCard(
      columnId,
      url,
      cards,
      setCards,
      columns,
      setColumns,
      options
    );
  };

  const removeCardHandler = (columnId: string) => (cardId: string) => {
    handleRemoveCard(columnId, cardId, cards, setCards, columns, setColumns);
  };

  const openAllCardsHandler = (columnId: string) => {
    handleOpenAllCards(columnId, cards, columns);
  };

  const clipboardHandler = (columnId: string) => {
    handleClipboard(columnId, cards, columns, options);
  };

  const collapseHandler = (columnId: string) => (collapsed: boolean) => {
    handleCollapse(
      columnId,
      collapsed,
      columnOrder,
      setColumnOrder,
      collapsedOrder,
      setCollapsedOrder
    );
  };

  const generateLinkHandler = (columnIds: Array<string>) => {
    /* 
    We need: 
    a way to start selection, 
    a way to select a column
    a way to deselect a column
    a way to stop selection
    an indication that a column has been selected 
    submit button, 
    toast or open link
    */
    handleGenerateLink(columnIds, cards, columns, columnOrder);
  };

  const selectionHandler = (columnId: string) => {
    if (selected.includes(columnId)) {
      setSelected(selected.filter((c) => c !== columnId));
    } else {
      setSelected([...selected, columnId]);
    }
  };

  return (
    <div className="h-screen">
      <Header
        options={options}
        setOptions={setOptions}
        selected={selected}
        setSelected={setSelected}
        showSelection={showSelection}
        setShowSelection={setShowSelection}
        generateLinkHandler={generateLinkHandler}
        columnsCount={columnOrder.length}
      ></Header>
      <div style={{ position: "absolute", top: "20%" }} className="h-4/5">
        <DragDropContext
          onBeforeDragStart={onBeforeDragStart}
          onDragStart={onDragStart}
          onDragUpdate={onDragUpdate}
          onDragEnd={onDragEnd}
        >
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => {
              return (
                <div
                  className={`snapChild pt-16 px-16 flex items-start w-max`}
                  // https://stackoverflow.com/questions/37112218/css3-100vh-not-constant-in-mobile-browser
                  style={{ minHeight: "-webkit-fill-available" }}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  <NewColumnComponent
                    options={options}
                    createColumnHandler={createColumnHandler}
                  />
                  {columnOrder.length === 0 ? (
                    <div
                      className={`w-80 h-96 flex flex-col justify-evenly items-center space-y-6 flex-none m-4 rounded-md shadow-md ring-1 ring-black ring-opacity-5 bg-gray-100`}
                    >
                      <img
                        className="w-64 flex-initial"
                        src={emptyState}
                        style={{ filter: "grayscale(100%)" }}
                        alt="Empty State"
                      />
                      <div className="flex-initial flex flex-col items-center">
                        <h4 className="text-lg font-medium text-gray-500">
                          You haven't saved any links!
                        </h4>
                        <p className="text-gray-500">
                          How about creating a new column?
                        </p>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
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
                        showSelection={showSelection}
                        selected={selected.includes(column.id)}
                        removeColumnHandler={removeColumnHandler}
                        updateColumnHandler={updateColumnHandler(column.id)}
                        createCardHandler={createCardHandler(column.id)}
                        removeCardHandler={removeCardHandler(column.id)}
                        openAllCardsHandler={openAllCardsHandler}
                        clipboardHandler={clipboardHandler}
                        collapseHandler={collapseHandler(column.id)}
                        selectionHandler={selectionHandler}
                        setShowSelection={setShowSelection}
                      ></Column>
                    );
                  })}
                  {provided.placeholder}
                  {options.showCollapsed ? (
                    <CollapsedColumns
                      columns={columns}
                      collapsedOrder={collapsedOrder}
                      selected={selected}
                      removeColumnHandler={removeColumnHandler}
                      updateColumnHandler={updateColumnHandler}
                      openAllCardsHandler={openAllCardsHandler}
                      clipboardHandler={clipboardHandler}
                      collapseHandler={collapseHandler}
                      selectionHandler={selectionHandler}
                      setShowSelection={setShowSelection}
                    />
                  ) : (
                    <></>
                  )}
                </div>
              );
            }}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default App;
