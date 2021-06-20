import React, { useState, useRef } from 'react'

import { COLUMN } from '../types'
import './ColumnHeader.css'

import { BiExpand } from 'react-icons/bi'
import { BsArrowsCollapse } from 'react-icons/bs'
import { RiExternalLinkLine, RiDeleteBack2Line } from 'react-icons/ri'
import { IoMdCopy } from 'react-icons/io'
import { HiOutlineLink, HiOutlineDotsVertical } from 'react-icons/hi'

import { DraggableProvided } from 'react-beautiful-dnd'

const ColumnHeader: React.VFC<{
    column: COLUMN
    removeColumnHandler: (columnId: string) => Promise<void>
    clipboardHandler: (columnId: string) => void
    updateColumnHandler: (title: string) => void
    openAllCardsHandler: (columnId: string) => void
    collapse: boolean
    collapseHandler: (collapse: boolean) => void
    showSelection: boolean
    setShowSelection: React.Dispatch<React.SetStateAction<boolean>>
    selected: boolean
    selectionHandler: (columnId: string) => void
    dragHandleProps: DraggableProvided['dragHandleProps']
    showCardCount?: boolean
}> = (props) => {
    const {
        column,
        removeColumnHandler,
        clipboardHandler,
        updateColumnHandler,
        openAllCardsHandler,
        collapse,
        collapseHandler,
        showSelection,
        setShowSelection,
        selected,
        selectionHandler,
        dragHandleProps,
        showCardCount = false,
    } = props

    const [title, setTitle] = useState(column.title)
    const [showTarget, setShowTarget] = useState(true)

    // Consider resizeInputs
    const input = useRef<HTMLInputElement>(null)

    const onTargetClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
        if (e.target === e.currentTarget && input.current) {
            input.current.focus()
            input.current.select()
        }
        setShowTarget(false)
    }

    const handleKeydown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
        if ((e.which === 13 || e.which === 27) && input.current) {
            input.current.blur()
        }
    }

    const onBlur = () => {
        if (title !== column.title) {
            updateColumnHandler(title)
        }
        setShowTarget(true)
    }

    return (
        <div
            className="p-4 flex justify-between items-center space-x-2"
            {...dragHandleProps}
        >
            {showSelection && (
                <div>
                    <input
                        type="checkbox"
                        checked={selected}
                        onChange={() => {
                            selectionHandler(column.id)
                        }}
                    />
                </div>
            )}
            <div className="relative">
                {showTarget && (
                    <button
                        type="button"
                        aria-label="Button"
                        className="absolute inset-0 cursor-pointer"
                        onClick={onTargetClick}
                    />
                )}
                <input
                    ref={input}
                    value={title}
                    onChange={(e) => {
                        setTitle(e.target.value)
                    }}
                    onBlur={onBlur}
                    onKeyDown={handleKeydown}
                    className="bg-transparent text-gray-600 font-medium text-sm border-b-2 border-transparent focus:outline-none focus:border-gray-500 w-full"
                    placeholder="Untitled"
                />
            </div>

            <div className="flex items-baseline space-x-1">
                {showCardCount && (
                    <div className="whitespace-nowrap text-sm text-gray-500 ">
                        <p>
                            {column.cardIds.length} link
                            {column.cardIds.length === 1 ? '' : 's'}
                        </p>
                    </div>
                )}
                <div className="h-4 w-4 relative dropdown-wrapper">
                    <HiOutlineDotsVertical />
                    <div className="z-10 flex flex-col dropdown-container transition-all duration-150 absolute top-4 right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        {collapse ? (
                            <button
                                type="button"
                                className="block inline-flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => collapseHandler(collapse)}
                            >
                                <BiExpand className="mr-2" />
                                <p>Expand</p>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="block inline-flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => collapseHandler(collapse)}
                            >
                                <BsArrowsCollapse className="mr-2" />
                                <p>Collapse</p>
                            </button>
                        )}
                        <button
                            type="button"
                            className="block inline-flex items-center justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => openAllCardsHandler(column.id)}
                        >
                            <RiExternalLinkLine className="mr-2" />
                            <p>Open</p>
                        </button>
                        <button
                            type="button"
                            className="block items-center inline-flex justify-start px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => clipboardHandler(column.id)}
                        >
                            <IoMdCopy className="mr-2" />
                            <p className="flex-initial">Copy</p>
                        </button>
                        {collapse ? (
                            <></>
                        ) : (
                            <button
                                type="button"
                                className="block items-center inline-flex justify-start text-sm px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => {
                                    selectionHandler(column.id)
                                    setShowSelection(true)
                                }}
                            >
                                <HiOutlineLink className="mr-2" />
                                Share
                            </button>
                        )}

                        <button
                            type="button"
                            className="block items-center px-4 py-2 text-sm inline-flex justify-start bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900"
                            onClick={() => removeColumnHandler(column.id)}
                        >
                            <RiDeleteBack2Line className="mr-2" />
                            <p>Delete</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColumnHeader
