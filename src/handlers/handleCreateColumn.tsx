import { CARDS, COLUMNS, OPTIONS } from '../types'
import retrieveTitles from './retrieveTitles'
import retrieveColumnId from './retrieveColumnId'

const handleCreateColumn = async (
    title: string,
    imports: string,

    cards: CARDS,
    columns: COLUMNS,
    columnOrder: Array<string>,
    collapsedOrder: Array<string>,
    options: OPTIONS,

    setCards: (cards: CARDS) => Promise<null>,
    setColumns: (columns: COLUMNS) => Promise<null>,
    setColumnOrder: (columnOrder: Array<string>) => Promise<null>
): Promise<void> => {
    const newCards: {
        [id: string]: { id: string; text: string | null; url: string }
    } = {}
    const cardIds: Array<string> = []
    let cardId
    let t = 0

    // Update cards
    if (options.markdownLinks) {
        // eslint-disable-next-line
        const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm
        const matches = imports.match(regexMdLinks) || []

        // eslint-disable-next-line
        const singleMatch = /\[([^\[]+)\]\((.*)\)/
        const parsedMatches = matches.map((m) => {
            const match = m.match(singleMatch) || []
            return match
        })

        // This chunk of code is repeated. Optimization possible?
        for (let i = 0; i < parsedMatches.length; i++) {
            do {
                cardId = `t${t}`
                t++
            } while (!cards.hasOwnProperty(cardId))

            // cardId = await retrieveCardId(cards);

            newCards[cardId] = {
                id: cardId,
                text: parsedMatches[i][1],
                url: parsedMatches[i][2],
            }
            cardIds.unshift(cardId)
        }

        await setCards({ ...newCards, ...cards })
    } else {
        const regexLink = /(https?:\/\/[^\s]+)/g
        const matches = imports.match(regexLink) || []

        const res = await retrieveTitles(matches)

        for (let i = 0; i < matches.length; i++) {
            do {
                cardId = `t${t}`
                t++
            } while (!cards.hasOwnProperty(cardId))

            newCards[cardId] = {
                id: cardId,
                text: res[i],
                url: matches[i],
            }
            cardIds.unshift(cardId)
        }
        await setCards({ ...newCards, ...cards })

        /* REPEATED CODE: OPTIMIZE */

        // Update columns
        const newColumnId = await retrieveColumnId(columnOrder, collapsedOrder)

        const newColumn = {
            id: newColumnId,
            title: title || '',
            cardIds,
        }

        await setColumns({
            ...columns,
            [newColumnId]: newColumn,
        })

        // Update columnOrder
        await setColumnOrder([newColumnId, ...columnOrder])

        return
    }

    // Update columns
    const newColumnId = await retrieveColumnId(columnOrder, collapsedOrder)

    const newColumn = {
        id: newColumnId,
        title: title || '',
        cardIds,
    }

    await setColumns({
        ...columns,
        [newColumnId]: newColumn,
    })

    // Update columnOrder
    await setColumnOrder([newColumnId, ...columnOrder])
}

export default handleCreateColumn
