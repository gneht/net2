import { CARDS, COLUMNS } from "../types";

const handleCreateCard = (
  columnId: string,
  url: string,
  cards: CARDS,
  setCards: (cards: CARDS) => any,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any
) => {
  // Retrive card title (API call)
  // What should happen on fail? Ex. adding link offline

  // Find available card id
  let newCardId;
  let i = 0;
  while (true) {
    newCardId = "t" + i;
    if (!cards.hasOwnProperty(newCardId)) {
      break;
    }
    i++;
  }

  // Check if markdown link

  // https://davidwells.io/snippets/regex-match-markdown-links

  // Check if URL

  // Update cards
  const newCard = {
    id: newCardId,
    text: "DUMMY TITLE",
    url: url,
  };
  setCards({
    ...cards,
    [newCard.id]: newCard,
  });

  // Update column
  let newColumn = columns[columnId];
  newColumn.cardIds.push(newCardId);
  setColumns({
    ...columns,
    [newColumn.id]: newColumn,
  });
  return;
};

export default handleCreateCard;
