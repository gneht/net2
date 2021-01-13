import { CARDS, COLUMNS, OPTIONS } from "../types";
import retrieveTitles from "./retrieveTitles";
import retrieveColumnId from "./retrieveColumnId";

const handleCreateColumn = async (
  title: string,
  imports: string,

  cards: CARDS,
  columns: COLUMNS,
  columnOrder: Array<string>,
  collapsedOrder: Array<string>,
  options: OPTIONS,

  setCards: (cards: CARDS) => any,
  setColumns: (columns: COLUMNS) => any,
  setColumnOrder: (columnOrder: Array<string>) => any
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

      // cardId = await retrieveCardId(cards);

      newCards[cardId] = {
        id: cardId,
        text: parsedMatches[i][1],
        url: parsedMatches[i][2],
      };
      cardIds.unshift(cardId);
    }

    await setCards({ ...newCards, ...cards });
  } else {
    const regexLink = /(https?:\/\/[^\s]+)/g;
    let matches = imports.match(regexLink) || [];

    let res = await retrieveTitles(matches);

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
    await setCards({ ...newCards, ...cards });

    /* REPEATED CODE: OPTIMIZE */

    // Update columns
    let newColumnId = await retrieveColumnId(columnOrder, collapsedOrder);

    const newColumn = {
      id: newColumnId,
      title: Boolean(title) ? title : "",
      cardIds: cardIds,
    };

    await setColumns({
      ...columns,
      [newColumnId]: newColumn,
    });

    // Update columnOrder
    await setColumnOrder([newColumnId, ...columnOrder]);

    return;
  }

  // Update columns
  let newColumnId = await retrieveColumnId(columnOrder, collapsedOrder);

  const newColumn = {
    id: newColumnId,
    title: Boolean(title) ? title : "",
    cardIds: cardIds,
  };

  console.log({
    ...columns,
    [newColumnId]: newColumn,
  });

  await setColumns({
    ...columns,
    [newColumnId]: newColumn,
  });

  // Update columnOrder
  await setColumnOrder([newColumnId, ...columnOrder]);
};

export default handleCreateColumn;
