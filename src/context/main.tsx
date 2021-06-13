import { createContext, useContext } from 'react'
import { CARDS, COLUMNS, OPTIONS } from '../types'

import { Mutex } from 'async-mutex'

type ContextProps = {
    cards: CARDS
    columns: COLUMNS
    columnOrder: Array<string>
    collapsedOrder: Array<string>
    options: OPTIONS
    cardMutexRef?: React.MutableRefObject<Mutex>
    columnMutexRef?: React.MutableRefObject<Mutex>

    setCards: (cards: CARDS) => Promise<null>
    setColumns: (columns: COLUMNS) => Promise<null>
    setColumnOrder: (columnOrder: Array<string>) => Promise<null>
    setCollapsedOrder: (collapsedOrder: Array<string>) => Promise<null>
    setOptions: React.Dispatch<React.SetStateAction<OPTIONS>>
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

    setCards: () => new Promise(() => null),
    setColumns: () => new Promise(() => null),
    setColumnOrder: () => new Promise(() => null),
    setCollapsedOrder: () => new Promise(() => null),
    setOptions: () => {},
})

export function useMain(): ContextProps {
    return useContext(MainContext)
}
