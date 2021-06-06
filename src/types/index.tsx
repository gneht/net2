export interface CARD {
    id: string
    text: string | null
    url: string
}

export interface CARDS {
    [key: string]: CARD
}

export interface COLUMN {
    id: string
    title: string
    cardIds: Array<string>
}

export interface COLUMNS {
    [key: string]: COLUMN
}

export interface OPTIONS {
    markdownLinks: boolean
    openOnLaunch: boolean
    showCollapsed: boolean
}
