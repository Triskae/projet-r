import React from 'react';
import { DatasetRow } from '../../models/Dataset';

type DatasetTableContextValues = {
  top: number
  setTop: (top: number) => void
  headers: string[],
  rows: DatasetRow[]
};

const DatasetTableContext = React.createContext<DatasetTableContextValues>({
  top: 0,
  setTop: () => {
  },
  headers: [],
  rows: []
});

export default DatasetTableContext;
