const handleCollapse = (
    columnId: string,
    collapsed: boolean,
    columnOrder: Array<string>,
    setColumnOrder: (columnOrder: Array<string>) => any,
    collapsedOrder: Array<string>,
    setCollapsedOrder: (collapsedOrder: Array<string>) => any
) => {
    if (collapsed) {
        setCollapsedOrder(collapsedOrder.filter((c) => c !== columnId))
        setColumnOrder([...columnOrder, columnId])
    } else {
        setCollapsedOrder([columnId, ...collapsedOrder])
        setColumnOrder(columnOrder.filter((c) => c !== columnId))
    }
}

export default handleCollapse
