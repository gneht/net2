import { CARDS, COLUMNS, OPTIONS } from "../types";
import retrieveTitles from "./retrieveTitles";

const handleCreateColumn = (
  title: string,
  cards: CARDS,
  setCards: (cards: CARDS) => any,
  columns: COLUMNS,
  options: OPTIONS,
  setColumns: (columns: COLUMNS) => any,
  columnOrder: Array<string>,
  setColumnOrder: (columnOrder: Array<string>) => any,
  collapsedOrder: Array<string>,
  imports: string
) => {
  let newCards: { [id: string]: any } = {};
  let cardIds: Array<string> = [];
  let cardId;
  let t = 0;

  // Update cards
  if (options.markdownLinks) {
    //eslint-disable-next-line
    const regexMdLinks = /\[([^\[]+)\](\(.*\))/gm;
    let matches = imports.match(regexMdLinks) || [];

    //eslint-disable-next-line
    const singleMatch = /\[([^\[]+)\]\((.*)\)/;
    const parsedMatches = matches.map((m) => {
      const match = m.match(singleMatch) || [];
      return match;
    });

    // This chunk of code is repeated. Optimization possible?
    for (let i = 0; i < parsedMatches.length; i++) {
      while (true) {
        cardId = "t" + t;
        t++;
        if (!cards.hasOwnProperty(cardId)) {
          break;
        }
      }
      newCards[cardId] = {
        id: cardId,
        text: parsedMatches[i][1],
        url: parsedMatches[i][2],
      };
      cardIds.unshift(cardId);
    }

    setCards({ ...newCards, ...cards });
  } else {
    const regexLink = /(https?:\/\/[^\s]+)/g;
    let matches = imports.match(regexLink) || [];

    retrieveTitles(matches).then((res) => {
      for (let i = 0; i < matches.length; i++) {
        while (true) {
          cardId = "t" + t;
          t++;
          if (!cards.hasOwnProperty(cardId)) {
            break;
          }
        }
        newCards[cardId] = {
          id: cardId,
          text: res[i],
          url: matches[i],
        };
        cardIds.unshift(cardId);
      }
      setCards({ ...newCards, ...cards });

      /* REPEATED CODE: OPTIMIZE */

      // Update columns
      let newColumnId;
      let i = 0;
      const concatenated = columnOrder.concat(collapsedOrder);
      while (true) {
        newColumnId = "c" + i;
        if (!concatenated.includes(newColumnId)) {
          break;
        }
        i++;
      }

      const newColumn = {
        id: newColumnId,
        title: Boolean(title) ? title : "",
        cardIds: cardIds,
      };

      setColumns({
        ...columns,
        [newColumnId]: newColumn,
      });

      // Update columnOrder
      setColumnOrder([newColumnId, ...columnOrder]);
      return;
    });
    return;
  }

  // Update columns
  let newColumnId;
  let i = 0;
  const concatenated = columnOrder.concat(collapsedOrder);
  while (true) {
    newColumnId = "c" + i;
    if (!concatenated.includes(newColumnId)) {
      break;
    }
    i++;
  }

  const newColumn = {
    id: newColumnId,
    title: Boolean(title) ? title : "",
    cardIds: cardIds,
  };

  setColumns({
    ...columns,
    [newColumnId]: newColumn,
  });

  // Update columnOrder
  setColumnOrder([newColumnId, ...columnOrder]);
};

export default handleCreateColumn;
