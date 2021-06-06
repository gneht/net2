import { CARD, CARDS, COLUMNS, OPTIONS } from '../types'
import retrieveTitle from './retrieveTitle'
import retrieveCardId from './retrieveCardId'

const handleCreateCard = async (
    columnId: string,
    url: string,
    cards: CARDS,
    columns: COLUMNS,
    options: OPTIONS,
    setCards: (cards: CARDS) => any,
    setColumns: (columns: COLUMNS) => any
) => {
    // Find available card id
    const newCardId = await retrieveCardId(cards)

    // Check if markdown link
    if (options.markdownLinks) {
        // https://davidwells.io/snippets/regex-match-markdown-links
        const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/
        const match = url.match(regex)

        // Check if URL
        let newCard: { id: string; text: string; url: string }
        if (match) {
            // Update cards
            newCard = {
                id: newCardId,
                text: match[1],
                url: match[2],
            }
            await setCards({
                ...cards,
                [newCard.id]: newCard,
            })
            // Update column
            const newColumn = columns[columnId]
            newColumn.cardIds.push(newCardId)
            await setColumns({
                ...columns,
                [newColumn.id]: newColumn,
            })
            return
        }
    }

    // SELF HOSTING SHOULD SPEED THIS UP (BUT BY HOW MUCH?)
    const res = await retrieveTitle(url)
    const newCard = {
        id: newCardId,
        text: res,
        url,
    }
    await setCards({
        ...cards,
        [newCard.id]: newCard,
    })
    // Update column
    const newColumn = columns[columnId]
    newColumn.cardIds.push(newCardId)
    await setColumns({
        ...columns,
        [newColumn.id]: newColumn,
    })
}

export default handleCreateCard
