import { CARD, CARDS, COLUMN, COLUMNS } from '../types'

const handleGenerateLink: (
    columnIds: Array<string>,
    cards: CARDS,
    columns: COLUMNS,
    columnOrder: Array<string>
) => Promise<string> = async (columnIds, cards, columns, columnOrder) => {
    // Define request data
    const generatedColumns: COLUMNS = {}
    const generatedCards: CARDS = {}

    let currentColumn: COLUMN
    let currentCard: CARD
    for (let c = 0; c < columnIds.length; c++) {
        if ((currentColumn = columns[columnIds[c]])) {
            generatedColumns[columnIds[c]] = currentColumn
            for (let t = 0; t < currentColumn.cardIds.length; t++) {
                if ((currentCard = cards[currentColumn.cardIds[t]])) {
                    generatedCards[currentColumn.cardIds[t]] = currentCard
                } else {
                    // ERROR: CARD MUST EXIST
                }
            }
        }
    }

    const generatedColumnOrder = columnOrder.filter((c) =>
        columnIds.includes(c)
    )

    console.log({
        cards: generatedCards,
        columns: generatedColumns,
        columnOrder: generatedColumnOrder,
    })

    //   // POST request (returns id which we postpend to domain)
    //   fetch(`${SERVER_URI}`, {
    //     method: "POST",
    //     mode: "cors",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       cards: generatedCards,
    //       columns: generatedColumns,
    //       columnOrder: generatedColumnOrder,
    //     }),
    //   });

    // return link
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('https://tailwindcss.com/')
        }, 2000)
    })
}

export default handleGenerateLink
