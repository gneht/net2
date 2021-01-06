export interface CARDS {
  [key: string]: {
    id: string;
    text: string;
  };
}

export interface COLUMNS {
  [key: string]: {
    id: string;
    title: string;
    cardIds: Array<string>;
  };
}
