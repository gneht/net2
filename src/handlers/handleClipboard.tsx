import { CARDS, COLUMNS, OPTIONS } from '../types'

const handleClipboard = (
    columnId: string,
    cards: CARDS,
    columns: COLUMNS,
    options: OPTIONS
) => {
    let out = ''
    let card
    for (let i = 0; i < columns[columnId].cardIds.length; i++) {
        card = cards[columns[columnId].cardIds[i]]
        if (options.markdownLinks) {
            out += `[${card.text}](${card.url})\n`
        } else {
            out += `${card.url}\n`
        }
    }
    navigator.clipboard.writeText(out)

    // Toast
}

export default handleClipboard
