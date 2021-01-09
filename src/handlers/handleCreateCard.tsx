import { CARD, CARDS, COLUMNS, OPTIONS } from "../types";
import retrieveTitle from "./retrieveTitle";

const handleCreateCard = (
  columnId: string,
  url: string,
  cards: CARDS,
  setCards: (cards: CARDS) => any,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any,
  options: OPTIONS
) => {
  // Find available card id
  let newCardId: string;
  let i = 0;
  while (true) {
    newCardId = "t" + i;
    if (!cards.hasOwnProperty(newCardId)) {
      break;
    }
    i++;
  }

  // Check if markdown link
  if (options.markdownLinks) {
    // https://davidwells.io/snippets/regex-match-markdown-links
    const regex = /^\[([\w\s\d]+)\]\(((?:\/|https?:\/\/)[\w\d./?=#]+)\)$/;
    const match = url.match(regex);

    // Check if URL
    let newCard: { id: string; text: string; url: string };
    if (match) {
      // Update cards
      newCard = {
        id: newCardId,
        text: match[1],
        url: match[2],
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
    }
  }

  // SELF HOSTING SHOULD SPEED THIS UP (BUT BY HOW MUCH?)
  retrieveTitle(url)
    .then((res) => {
      let newCard: CARD;
      newCard = {
        id: newCardId,
        text: res,
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
    })
    .catch((res) => {
      console.log(res);
    });
};

export default handleCreateCard;
