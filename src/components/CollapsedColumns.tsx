import { Draggable, Droppable } from 'react-beautiful-dnd'
import ColumnHeader from './ColumnHeader'
import { COLUMNS } from '../types'

import { useMain } from '../context/main'

import './CollapsedColumns.css'

const CollapsedColumns = (props: {
    columns: COLUMNS
    collapsedOrder: Array<string>
    selected: Array<string>
    setShowSelection: (showSelected: boolean) => any
    removeColumnHandler: (columnId: string) => any
    updateColumnHandler: (columnId: string) => any
    openAllCardsHandler: (columnId: string) => any
    clipboardHandler: (columnId: string) => any
    collapseHandler: (columnId: string) => any
    selectionHandler: (columnId: string) => any
}) => {
    const { options } = useMain()
    const {
        columns,
        collapsedOrder,
        selected,
        setShowSelection,
        removeColumnHandler,
        updateColumnHandler,
        openAllCardsHandler,
        clipboardHandler,
        collapseHandler,
        selectionHandler,
    } = props
    return (
        <div className="m-4">
            <div
                className={`py-4 px-24 mb-4 shadow-md rounded-md ring-1 ring-black ring-opacity-5 bg-white text-gray-600 font-medium bg-${options.theme}-50`}
            >
                Collapsed Columns
            </div>
            <Droppable
                droppableId="collapsed-columns"
                direction="vertical"
                type="collapsed-column"
            >
                {(provided) => (
                    <div
                        id="scrollCC"
                        className="h-96 flex flex-col items-start overflow-y-auto max-h-96 shadow-inner ring-1 ring-black ring-opacity-5 bg-white"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                    >
                        {collapsedOrder
                            .filter((e) => {
                                return columns[e]
                            })
                            .map((e, index) => {
                                const column = columns[e]
                                return (
                                    <Draggable
                                        key={column.id}
                                        draggableId={column.id}
                                        index={index}
                                    >
                                        {(provided) => (
                                            <div
                                                {...provided.draggableProps}
                                                ref={provided.innerRef}
                                            >
                                                <div className="flex-none my-2 mx-2 w-80 rounded-md shadow-md ring-1 ring-black ring-opacity-5 bg-white">
                                                    {/* This, including the line above, is the orignal drag/drop*/}
                                                    <ColumnHeader
                                                        column={column}
                                                        removeColumnHandler={
                                                            removeColumnHandler
                                                        }
                                                        clipboardHandler={
                                                            clipboardHandler
                                                        }
                                                        updateColumnHandler={
                                                            updateColumnHandler
                                                        }
                                                        openAllCardsHandler={
                                                            openAllCardsHandler
                                                        }
                                                        collapse={true}
                                                        collapseHandler={collapseHandler(
                                                            column.id
                                                        )}
                                                        dragHandleProps={
                                                            provided.dragHandleProps
                                                        }
                                                        showSelection={false}
                                                        selected={selected.includes(
                                                            column.id
                                                        )}
                                                        selectionHandler={
                                                            selectionHandler
                                                        }
                                                        setShowSelection={
                                                            setShowSelection
                                                        }
                                                        showCardCount={true}
                                                    />

                                                    <Droppable
                                                        droppableId={column.id}
                                                        type="card"
                                                    >
                                                        {(
                                                            provided,
                                                            snapshot
                                                        ) => (
                                                            <div
                                                                className={`${
                                                                    snapshot.isDraggingOver
                                                                        ? `bg-${options.theme}-100`
                                                                        : `bg-${options.theme}-50`
                                                                } p-1 transition`}
                                                                ref={
                                                                    provided.innerRef
                                                                }
                                                                {...provided.droppableProps}
                                                            >
                                                                {
                                                                    provided.placeholder
                                                                }
                                                            </div>
                                                        )}
                                                    </Droppable>
                                                </div>
                                            </div>
                                        )}
                                    </Draggable>
                                )
                            })}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </div>
    )
}

export default CollapsedColumns
