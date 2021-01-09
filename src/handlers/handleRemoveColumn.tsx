import { CARDS, COLUMNS } from "../types";

const handleRemoveColumn = (
  columnId: string,
  cards: CARDS,
  setCards: (cards: CARDS) => any,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any,
  columnOrder: Array<string>,
  setColumnOrder: (columnOrder: Array<string>) => any,
  collapsedOrder: Array<string>,
  setCollapsedOrder: (collapsedOrder: Array<string>) => any
) => {
  const newColumns = columns;
  const removedCards = newColumns[columnId].cardIds;

  let newCards = cards;
  let cardId;
  for (let i = 0; i < removedCards.length; i++) {
    cardId = removedCards[i];
    delete newCards[cardId];
  }
  delete newColumns[columnId];
  setCards(newCards);
  setColumns(newColumns);
  setColumnOrder(columnOrder.filter((e) => e !== columnId));
  setCollapsedOrder(collapsedOrder.filter((e) => e !== columnId));
  return;
};

export default handleRemoveColumn;
