import { CARDS, COLUMNS } from '../types'

const handleRemoveColumn = async (
    columnId: string,
    cards: CARDS,
    columns: COLUMNS,
    columnOrder: Array<string>,
    collapsedOrder: Array<string>,
    setCards: (cards: CARDS) => any,
    setColumns: (columns: COLUMNS) => any,
    setColumnOrder: (columnOrder: Array<string>) => any,
    setCollapsedOrder: (collapsedOrder: Array<string>) => any
) => {
    // Delete Column
    const newColumns = columns
    const removedCards = newColumns[columnId].cardIds

    let newCards = cards
    let cardId
    for (let i = 0; i < removedCards.length; i++) {
        cardId = removedCards[i]
        delete newCards[cardId]
    }

    delete newColumns[columnId]

    await setColumnOrder(columnOrder.filter((e) => e !== columnId))
    await setCollapsedOrder(collapsedOrder.filter((e) => e !== columnId))
    await setColumns(newColumns)
    await setCards(newCards)

    return new Promise((resolve) => {
        resolve(null)
    })
}

export default handleRemoveColumn
