import { CARDS } from '../types'

const retrieveCardId = async (cards: CARDS): Promise<string> => {
    let t = 0
    let cardId

    do {
        cardId = `t${t}`
        t++
    } while (!cards.hasOwnProperty(cardId))
    return cardId
}

export default retrieveCardId
