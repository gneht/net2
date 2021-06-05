import React from 'react'
import App from './App'

import handleCreateCard from './handlers/handleCreateCard'
import handleCreateColumn from './handlers/handleCreateColumn'
import handleRemoveCard from './handlers/handleRemoveCard'
import handleRemoveColumn from './handlers/handleRemoveColumn'

import toastRemoveColumn from './components/toasts/toastRemoveColumn'

import { CARDS, COLUMNS, OPTIONS } from './types'

export class SyncStateWrapper extends React.Component<
    {},
    {
        cards: CARDS
        columns: COLUMNS
        columnOrder: Array<string>
        collapsedOrder: Array<string>
    }
> {
    constructor(props: {}) {
        super(props)
        this.state = {
            cards: {},
            columns: {},
            columnOrder: [],
            collapsedOrder: [],
        }
    }

    setCards = async (newCards: CARDS) => {
        return new Promise((resolve) => {
            this.setState({ cards: newCards }, () => {
                resolve(null)
            })
        })
    }

    setColumns = async (newColumns: COLUMNS) => {
        return new Promise((resolve) => {
            this.setState({ columns: newColumns }, () => {
                resolve(null)
            })
        })
    }

    setColumnOrder = async (newColumnOrder: Array<string>) => {
        return new Promise((resolve) => {
            this.setState({ columnOrder: newColumnOrder }, () => {
                resolve(null)
            })
        })
    }

    setCollapsedOrder = async (newCollapsedOrder: Array<string>) => {
        return new Promise((resolve) => {
            this.setState({ collapsedOrder: newCollapsedOrder }, () => {
                resolve(null)
            })
        })
    }

    createCardHandler =
        (options: OPTIONS, cardMutexRef: any) =>
        (columnId: string) =>
        async (url: string) => {
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
        (
            options: OPTIONS,
            columnMutexRef: any,
            setColumnOrder: (columnOrder: Array<string>) => any
        ) =>
        async (title: string, imports: string) => {
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

    removeCardHandler = (columnId: string) => (cardId: string) => {
        handleRemoveCard(
            columnId,
            cardId,
            this.state.cards,
            this.state.columns,
            this.setCards,
            this.setColumns
        )
    }

    removeColumnHandler = async (columnId: string) => {
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

    render() {
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

export default SyncStateWrapper
