import { CARDS, COLUMNS } from "../types";

const handleRemoveCard = (
  columnId: string,
  cardId: string,
  cards: CARDS,
  setCards: (cards: CARDS) => any,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any
) => {
  // Remove card
  let newCards = cards;
  delete newCards[cardId];

  setCards(newCards);

  // Update column
  const oldColumn = columns[columnId];
  const newCardIds = Array.from(oldColumn.cardIds);
  newCardIds.splice(newCardIds.indexOf(cardId), 1);
  const newColumn = {
    ...oldColumn,
    cardIds: newCardIds,
  };

  setColumns({
    ...columns,
    [newColumn.id]: newColumn,
  });
  return;
};

export default handleRemoveCard;
