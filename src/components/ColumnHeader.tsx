import { useState, useRef } from 'react'
import { useMain } from '../context/main'

import { COLUMN } from '../types'
import './ColumnHeader.css'

const ColumnHeader: React.VFC<{
    column: COLUMN
    removeColumnHandler: (columnId: string) => any
    clipboardHandler: (columnId: string) => any
    updateColumnHandler: (title: string) => any
    openAllCardsHandler: (columnId: string) => any
    collapse: boolean
    collapseHandler: (collapse: boolean) => any
    showSelection: boolean
    setShowSelection: (showSelection: boolean) => any
    selected: boolean
    selectionHandler: (columnId: string) => any
    dragHandleProps: any
    showCardCount?: boolean
}> = (props) => {
    const { options } = useMain()

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
    const input = useRef<any>(null)

    const onTargetClick = (e: any) => {
        if (e.target === e.currentTarget) {
            input.current.focus()
            input.current.select()
        }
        setShowTarget(false)
    }

    const handleKeydown = (e: any) => {
        if (e.which === 13 || e.which === 27) {
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
            className="p-4 flex justify-between space-x-2"
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
                {showCardCount ? (
                    <div className="whitespace-nowrap text-sm text-gray-500 ">
                        <p>
                            {column.cardIds.length} link
                            {column.cardIds.length === 1 ? '' : 's'}
                        </p>
                    </div>
                ) : (
                    <></>
                )}
                <div className="h-4 w-4 relative dropdown-wrapper">
                    <svg
                        className="h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                    </svg>
                    <div className="flex flex-col dropdown-container transition-all duration-150 absolute top-4 right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                        {collapse ? (
                            <button
                                type="button"
                                className="block inline-flex justify-evenly px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => collapseHandler(collapse)}
                            >
                                <div className="flex-initial w-4 h-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                                        />
                                    </svg>
                                </div>
                                <p>Expand</p>
                            </button>
                        ) : (
                            <button
                                type="button"
                                className="block inline-flex justify-evenly px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => collapseHandler(collapse)}
                            >
                                <div className="flex-initial w-4 h-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                                        />
                                    </svg>
                                </div>
                                <p>Collapse</p>
                            </button>
                        )}
                        <button
                            type="button"
                            className="block inline-flex justify-evenly px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => openAllCardsHandler(column.id)}
                        >
                            <div className="flex-initial w-4 h-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                    />
                                </svg>
                            </div>
                            <p>Open</p>
                        </button>
                        <button
                            type="button"
                            className="block inline-flex justify-evenly px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                            onClick={() => clipboardHandler(column.id)}
                        >
                            <div className="flex-initial w-4 h-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <p className="flex-initial">Copy</p>
                        </button>
                        {collapse ? (
                            <></>
                        ) : (
                            <button
                                type="button"
                                className="block inline-flex justify-evenly px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                                onClick={() => {
                                    selectionHandler(column.id)
                                    setShowSelection(true)
                                }}
                            >
                                <div className="flex-initial w-4 h-4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                                        />
                                    </svg>
                                </div>
                                Share
                            </button>
                        )}

                        <button
                            type="button"
                            className="block px-4 py-2 inline-flex justify-evenly text-sm bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900"
                            onClick={() => removeColumnHandler(column.id)}
                        >
                            <div className="flex-initial w-4 h-4">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                    />
                                </svg>
                            </div>
                            <p>Delete</p>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ColumnHeader
