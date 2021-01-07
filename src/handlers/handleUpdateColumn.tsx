import { COLUMNS } from "../types";

const handleUpdateColumn = (
  columnId: string,
  title: string,
  columns: COLUMNS,
  setColumns: (columns: COLUMNS) => any
) => {
  const newColumn = {
    ...columns[columnId],
    title: title,
  };

  setColumns({
    ...columns,
    [columnId]: newColumn,
  });
  return;
};

export default handleUpdateColumn;
