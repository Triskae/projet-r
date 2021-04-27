export interface Dataset {
  headers: string[];
  data: DatasetRow[]
}

export interface DatasetRow {
  [key: string]: string
}
