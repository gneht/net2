import { CARDS } from '../types'

const retrieveCardId = async (cards: CARDS) => {
    let t = 0
    let cardId

    while (true) {
        cardId = `t${t}`
        t++
        if (!cards.hasOwnProperty(cardId)) {
            break
        }
    }
    return cardId
}

export default retrieveCardId
