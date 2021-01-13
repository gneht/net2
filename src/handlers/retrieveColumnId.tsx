const retrieveColumnId = async (
  columnOrder: Array<string>,
  collapsedOrder: Array<string>
) => {
  let c = 0;
  let columnId;
  const concatenated = columnOrder.concat(collapsedOrder);
  while (true) {
    columnId = "c" + c;
    if (!concatenated.includes(columnId)) {
      break;
    }
    c++;
  }

  return columnId;
};

export default retrieveColumnId;
