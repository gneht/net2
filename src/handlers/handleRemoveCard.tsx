import { CARDS, COLUMNS } from '../types'

const handleRemoveCard = async (
    columnId: string,
    cardId: string,
    cards: CARDS,
    columns: COLUMNS,
    setCards: (cards: CARDS) => Promise<null>,
    setColumns: (columns: COLUMNS) => Promise<null>
): Promise<void> => {
    // Update column
    const oldColumn = columns[columnId]
    const newCardIds = Array.from(oldColumn.cardIds)
    newCardIds.splice(newCardIds.indexOf(cardId), 1)
    const newColumn = {
        ...oldColumn,
        cardIds: newCardIds,
    }

    await setColumns({
        ...columns,
        [newColumn.id]: newColumn,
    })

    // Remove card
    const newCards = cards
    delete newCards[cardId]

    await setCards(newCards)
}

export default handleRemoveCard
