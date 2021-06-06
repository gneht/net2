import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import ColumnHeader from './ColumnHeader'
import { COLUMNS } from '../types'

import { useMain } from '../context/main'

import './CollapsedColumns.css'

const CollapsedColumns: React.VFC<{
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
}> = (props) => {
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
            <div className="py-4 px-24 font-medium">Collapsed Columns</div>
            <Droppable
                droppableId="collapsed-columns"
                direction="vertical"
                type="collapsed-column"
            >
                {(provided) => (
                    <div
                        id="scrollCC"
                        className="h-96 flex flex-col items-start overflow-y-auto max-h-96 shadow-inner rounded-lg ring-1 ring-black ring-opacity-5 bg-white"
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
                                        {(providedDraggable) => (
                                            <div
                                                {...providedDraggable.draggableProps}
                                                ref={providedDraggable.innerRef}
                                            >
                                                <div className="flex-none my-2 mx-2 w-80 rounded-md shadow-md ring-1 ring-black ring-opacity-5 bg-white">
                                                    {/* This, including the line above, is the orignal drag/drop */}
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
                                                        collapse
                                                        collapseHandler={collapseHandler(
                                                            column.id
                                                        )}
                                                        dragHandleProps={
                                                            providedDraggable.dragHandleProps
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
                                                        showCardCount
                                                    />

                                                    <Droppable
                                                        droppableId={column.id}
                                                        type="card"
                                                    >
                                                        {(
                                                            droppableProvided,
                                                            snapshot
                                                        ) => (
                                                            <div
                                                                className={`${
                                                                    snapshot.isDraggingOver
                                                                        ? `bg-gray-100`
                                                                        : `bg-gray-50`
                                                                } transition`}
                                                                ref={
                                                                    droppableProvided.innerRef
                                                                }
                                                                {...droppableProvided.droppableProps}
                                                            >
                                                                {
                                                                    droppableProvided.placeholder
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
