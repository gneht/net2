import { COLUMNS } from '../types'

const handleUpdateColumn = async (
    columnId: string,
    title: string,
    columns: COLUMNS,
    setColumns: (columns: COLUMNS) => any
) => {
    const newColumn = {
        ...columns[columnId],
        title,
    }

    await setColumns({
        ...columns,
        [columnId]: newColumn,
    })
}

export default handleUpdateColumn
