import { CARDS, COLUMNS } from '../types'

const handleRemoveCard = async (
    columnId: string,
    cardId: string,
    cards: CARDS,
    columns: COLUMNS,
    setCards: (cards: CARDS) => any,
    setColumns: (columns: COLUMNS) => any
) => {
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
    let newCards = cards
    delete newCards[cardId]

    await setCards(newCards)

    return
}

export default handleRemoveCard
