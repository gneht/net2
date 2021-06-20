import { CARDS, COLUMNS } from '../types'

const handleOpenAllCards = (
    columnId: string,
    cards: CARDS,
    columns: COLUMNS
): void => {
    // Check open in different window?
    let currentUrl
    for (let i = 0; i < columns[columnId].cardIds.length; i++) {
        currentUrl = cards[columns[columnId].cardIds[i]].url
        if (currentUrl) {
            window.open(currentUrl)
        }
    }
}

export default handleOpenAllCards
