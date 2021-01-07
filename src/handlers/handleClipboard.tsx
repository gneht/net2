import { CARDS, COLUMNS } from "../types";

const handleClipboard = (columnId: string, cards: CARDS, columns: COLUMNS) => {
  let out = "";
  let card;
  for (let i = 0; i < columns[columnId].cardIds.length; i++) {
    out += "\n";
    card = cards[columns[columnId].cardIds[i]];
    if (card.url) {
      out += card.url;
    }
  }
  navigator.clipboard.writeText(out);

  // Toast
  return;
};

export default handleClipboard;
