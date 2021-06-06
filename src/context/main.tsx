import { createContext, useContext } from 'react'
import { CARDS, COLUMNS, OPTIONS } from '../types'

type ContextProps = {
    cards: CARDS
    columns: COLUMNS
    columnOrder: Array<string>
    collapsedOrder: Array<string>
    options: OPTIONS
    cardMutexRef: any
    columnMutexRef: any

    setCards: (cards: CARDS) => any
    setColumns: (columns: COLUMNS) => any
    setColumnOrder: (columnOrder: Array<string>) => any
    setCollapsedOrder: (collapsedOrder: Array<string>) => any
    setOptions: (options: OPTIONS) => any
}

export const MainContext = createContext<ContextProps>({
    cards: {},
    columns: {},
    columnOrder: [],
    collapsedOrder: [],
    options: {
        markdownLinks: false,
        openOnLaunch: true,
        showCollapsed: true,
    },
    cardMutexRef: null,
    columnMutexRef: null,

    setCards: (cards: CARDS) => {},
    setColumns: (columns: COLUMNS) => {},
    setColumnOrder: (columnOrder: Array<string>) => {},
    setCollapsedOrder: (collapsedOrder: Array<string>) => {},
    setOptions: (options: OPTIONS) => {},
})

export function useMain() {
    return useContext(MainContext)
}
