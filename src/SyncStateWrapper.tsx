import React from 'react'
import App from './App'

import { Mutex } from 'async-mutex'

import handleCreateCard from './handlers/handleCreateCard'
import handleCreateColumn from './handlers/handleCreateColumn'
import handleRemoveCard from './handlers/handleRemoveCard'
import handleRemoveColumn from './handlers/handleRemoveColumn'

import toastRemoveColumn from './components/toasts/toastRemoveColumn'

import { CARDS, COLUMNS, OPTIONS } from './types'

export class SyncStateWrapper extends React.Component<
    Record<string, unknown>,
    {
        cards: CARDS
        columns: COLUMNS
        columnOrder: Array<string>
        collapsedOrder: Array<string>
    }
> {
    constructor(props: Record<string, unknown>) {
        super(props)
        this.state = {
            cards: {},
            columns: {},
            columnOrder: [],
            collapsedOrder: [],
        }
    }

    setCards = async (newCards: CARDS): Promise<null> => {
        return new Promise((resolve) => {
            this.setState({ cards: newCards }, () => {
                resolve(null)
            })
        })
    }

    setColumns = async (newColumns: COLUMNS): Promise<null> => {
        return new Promise((resolve) => {
            this.setState({ columns: newColumns }, () => {
                resolve(null)
            })
        })
    }

    setColumnOrder = async (newColumnOrder: Array<string>): Promise<null> => {
        return new Promise((resolve) => {
            this.setState({ columnOrder: newColumnOrder }, () => {
                resolve(null)
            })
        })
    }

    setCollapsedOrder = async (
        newCollapsedOrder: Array<string>
    ): Promise<null> => {
        return new Promise((resolve) => {
            this.setState({ collapsedOrder: newCollapsedOrder }, () => {
                resolve(null)
            })
        })
    }

    createCardHandler =
        (options: OPTIONS, cardMutexRef: React.MutableRefObject<Mutex>) =>
        (columnId: string) =>
        async (url: string): Promise<void> => {
            const release = await cardMutexRef.current.acquire()
            try {
                await handleCreateCard(
                    columnId,
                    url,
                    this.state.cards,
                    this.state.columns,
                    options,
                    this.setCards,
                    this.setColumns
                )
            } finally {
                release()
            }
        }

    createColumnHandler =
        (options: OPTIONS, columnMutexRef: React.MutableRefObject<Mutex>) =>
        async (title: string, imports: string): Promise<void> => {
            const release = await columnMutexRef.current.acquire()
            try {
                await handleCreateColumn(
                    title,
                    imports,
                    this.state.cards,
                    this.state.columns,
                    this.state.columnOrder,
                    this.state.collapsedOrder,
                    options,
                    this.setCards,
                    this.setColumns,
                    this.setColumnOrder
                )
            } finally {
                release()
            }
        }

    removeCardHandler =
        (columnId: string) =>
        (cardId: string): void => {
            handleRemoveCard(
                columnId,
                cardId,
                this.state.cards,
                this.state.columns,
                this.setCards,
                this.setColumns
            )
        }

    removeColumnHandler = async (columnId: string): Promise<void> => {
        await handleRemoveColumn(
            columnId,
            this.state.cards,
            this.state.columns,
            this.state.columnOrder,
            this.state.collapsedOrder,
            this.setCards,
            this.setColumns,
            this.setColumnOrder,
            this.setCollapsedOrder
        )
        await toastRemoveColumn()
    }

    render(): React.ReactNode {
        return (
            <App
                cards={this.state.cards}
                columns={this.state.columns}
                columnOrder={this.state.columnOrder}
                collapsedOrder={this.state.collapsedOrder}
                setCards={this.setCards}
                setColumns={this.setColumns}
                setColumnOrder={this.setColumnOrder}
                setCollapsedOrder={this.setCollapsedOrder}
                createCardHandler={this.createCardHandler}
                createColumnHandler={this.createColumnHandler}
                removeCardHandler={this.removeCardHandler}
                removeColumnHandler={this.removeColumnHandler}
            />
        )
    }
}
