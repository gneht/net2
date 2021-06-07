import { Draggable } from 'react-beautiful-dnd'
import { CARD } from '../types'

import { useMain } from '../context/main'

import { IoMdCopy } from 'react-icons/io'
import { RiDeleteBack2Line } from 'react-icons/ri'
import { HiOutlineDotsVertical } from 'react-icons/hi'

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
                        snapshot.isDragging && 'ring-blue-500 ring-opacity-50'
                    } p-4 rounded-md shadow-md ring-2 bg-white ring-black ring-opacity-5 flex justify-between items-center space-x-4`}
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
                        <HiOutlineDotsVertical />
                        <div className="flex flex-col dropdown-container transition-all duration 150 absolute top-4 right-0 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
                            <button
                                type="button"
                                className="block px-4 py-2 inline-flex justify-start items-center text-sm text-gray-700 hover:bg-white hover:text-gray-900"
                                onClick={() =>
                                    navigator.clipboard.writeText(card.url)
                                }
                            >
                                <IoMdCopy className="mr-2" />
                                <p className="flex-initial">Copy</p>
                            </button>
                            <button
                                type="button"
                                className="block px-4 py-2 inline-flex justify-start items-center text-sm bg-red-50 text-red-700 hover:bg-red-100 hover:text-red-900"
                                onClick={() => removeCardHandler(card.id)}
                            >
                                <RiDeleteBack2Line className="mr-2" />
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
