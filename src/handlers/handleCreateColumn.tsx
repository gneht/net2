import { CARDS, COLUMNS } from "../types";

const handleCreateColumn = (
  title: string,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any,
  columnOrder: Array<string>,
  setColumnOrder: (columnOrder: Array<string>) => any
) => {
  let newColumnId;
  let i = 0;
  while (true) {
    newColumnId = "c" + i;
    if (!columns.hasOwnProperty(newColumnId)) {
      break;
    }
    i++;
  }

  // Update columns
  const newColumn = {
    id: newColumnId,
    title: Boolean(title) ? title : "",
    cardIds: [],
  };

  setColumns({
    ...columns,
    [newColumnId]: newColumn,
  });

  // Update columnOrder
  setColumnOrder([newColumnId, ...columnOrder]);
};

export default handleCreateColumn;
