import { Draggable } from 'react-beautiful-dnd'
import { CARD } from '../types'

import { useMain } from '../context/main'

const Card: React.VFC<{
    card: CARD
    index: number
    removeCardHandler: (cardId: string) => any
}> = (props) => {
    const { options } = useMain()
    const { card, index, removeCardHandler } = props

    return (
        <Draggable draggableId={card.id} index={index}>
            {(provided, snapshot) => (
                <div
                    className={`${
                        snapshot.isDragging
                            ? 'bg-white'
                            : `bg-${options.theme}-50`
                    } p-4 rounded-md shadow-md ring-1 ring-black ring-opacity-5 flex justify-between space-x-4`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    <img
                        className="h-5 w-5"
                        // style={{ filter: "grayscale(100%)" }}
                        alt="favicon"
                        src={`http://www.google.com/s2/favicons?sz=64&domain=${card.url}`}
                    />
                    <div>
                        <div className="text-gray-700">
                            {card.text ? card.text : card.url}
                        </div>
                    </div>
                    <div className="w-4 h-4 relative dropdown-wrapper">
                        <svg
                            className="w-4 h-4"
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
                        <div className="flex flex-col dropdown-container transition-all duration 150 absolute top-4 right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <button
                                type="button"
                                className={`block px-4 py-2 inline-flex justify-evenly text-sm text-gray-700 hover:bg-${options.theme}-100 hover:text-gray-900`}
                                onClick={() =>
                                    navigator.clipboard.writeText(card.url)
                                }
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
                            <button
                                type="button"
                                className="block px-4 py-2 inline-flex justify-evenly text-sm bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900"
                                onClick={() => removeCardHandler(card.id)}
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
            )}
        </Draggable>
    )
}

export default Card
