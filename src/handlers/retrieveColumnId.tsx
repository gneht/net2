const retrieveColumnId = async (
    columnOrder: Array<string>,
    collapsedOrder: Array<string>
): Promise<string> => {
    let c = 0
    let columnId
    const concatenated = columnOrder.concat(collapsedOrder)

    do {
        columnId = `c${c}`
        c++
    } while (concatenated.includes(columnId))

    return columnId
}

export default retrieveColumnId
