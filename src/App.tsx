import React, { useEffect, useState, useRef } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { Mutex } from "async-mutex";

import { MainContext } from "./context/main";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

import Header from "./components/Header";
import NewColumnComponent from "./components/NewColumnComponent";
import Column from "./components/Column";
import CollapsedColumns from "./components/CollapsedColumns";
import WrappedToastContainer from "./components/WrappedToastContainer";

import handleDragEnd from "./handlers/handleDragEnd";
import handleClipboard from "./handlers/handleClipboard";
import handleUpdateColumn from "./handlers/handleUpdateColumn";
import handleOpenAllCards from "./handlers/handleOpenAllCards";
import handleCollapse from "./handlers/handleCollapse";

import toastCollapse from "./components/toasts/toastCollapse";
import toastClipboard from "./components/toasts/toastClipboard";

import emptyState from "./assets/undraw_blank_canvas_3rbb.svg";

import { CARDS, COLUMNS, OPTIONS } from "./types";

const App = (props: {
  cards: CARDS;
  columns: COLUMNS;
  columnOrder: Array<string>;
  collapsedOrder: Array<string>;
  setCards: (cards: CARDS) => any;
  setColumns: (columns: COLUMNS) => any;
  setColumnOrder: (columnOrder: Array<string>) => any;
  setCollapsedOrder: (collapsedOrder: Array<string>) => any;
  createCardHandler: (options: OPTIONS, cardMutexRef: any) => any;
  createColumnHandler: (
    options: OPTIONS,
    columnMutexRef: any,
    setColumnOrder: (columnOrder: Array<string>) => any
  ) => any;
  removeCardHandler: (columnId: string) => any;
  removeColumnHandler: (columnId: string) => any;
}) => {
  const {
    cards,
    columns,
    columnOrder,
    collapsedOrder,
    setCards,
    setColumns,
    setColumnOrder,
    setCollapsedOrder,
    createCardHandler,
    createColumnHandler,
    removeCardHandler,
    removeColumnHandler,
  } = props;

  const cardMutexRef = useRef(new Mutex());
  const columnMutexRef = useRef(new Mutex());

  const [options, setOptions] = useState<OPTIONS>({
    markdownLinks: false,
    openOnLaunch: true,
    showCollapsed: true,
    theme: "gray",
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
      columnOrder,
      collapsedOrder,
      setColumns,
      setColumnOrder,
      setCollapsedOrder
    );
    setSnap(true);
  };

  const updateColumnHandler = (columnId: string) => (title: string) => {
    handleUpdateColumn(columnId, title, columns, setColumns);
  };

  const openAllCardsHandler = (columnId: string) => {
    handleOpenAllCards(columnId, cards, columns);
  };

  const clipboardHandler = (columnId: string) => {
    handleClipboard(columnId, cards, columns, options);
    toastClipboard();
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
    toastCollapse(collapsed);
  };

  const selectionHandler = (columnId: string) => {
    if (selected.includes(columnId)) {
      setSelected(selected.filter((c) => c !== columnId));
    } else {
      setSelected([...selected, columnId]);
    }
  };

  return (
    <MainContext.Provider
      value={{
        cards,
        columns,
        columnOrder,
        collapsedOrder,
        options,
        cardMutexRef,
        columnMutexRef,
        setCards,
        setColumns,
        setColumnOrder,
        setCollapsedOrder,
        setOptions,
      }}
    >
      <div className="h-screen">
        <Header
          selected={selected}
          setSelected={setSelected}
          showSelection={showSelection}
          setShowSelection={setShowSelection}
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
                      createColumnHandler={createColumnHandler(
                        options,
                        columnMutexRef,
                        setColumnOrder
                      )}
                    />
                    {columnOrder.length === 0 ? (
                      <div
                        className={`w-80 h-96 flex flex-col justify-evenly items-center space-y-6 flex-none m-4 rounded-md shadow-md ring-1 ring-black ring-opacity-5 bg-${options.theme}-100`}
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
                    {columnOrder
                      .filter((e) => {
                        return columns[e];
                      })
                      .map((e, index) => {
                        const column = columns[e];
                        if (column) {
                          const columnCards = column.cardIds.map(
                            (c) => cards[c]
                          );
                          return (
                            <Column
                              key={column.id}
                              /* Objects */
                              column={column}
                              cards={columnCards}
                              index={index}
                              options={options}
                              showSelection={showSelection}
                              selected={selected.includes(column.id)}
                              /* Card handlers */
                              createCardHandler={createCardHandler(
                                options,
                                cardMutexRef
                              )}
                              removeCardHandler={removeCardHandler(column.id)}
                              /* Column Handlers */
                              updateColumnHandler={updateColumnHandler(
                                column.id
                              )}
                              removeColumnHandler={removeColumnHandler}
                              /* Misc handlers */
                              clipboardHandler={clipboardHandler}
                              openAllCardsHandler={openAllCardsHandler}
                              collapseHandler={collapseHandler(column.id)}
                              selectionHandler={selectionHandler}
                              setShowSelection={setShowSelection}
                            ></Column>
                          );
                        } else {
                          return <></>;
                        }
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
        <WrappedToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </MainContext.Provider>
  );
};

export default App;
