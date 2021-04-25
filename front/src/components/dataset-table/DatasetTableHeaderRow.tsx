import React from 'react';

type HeaderRowProps = {
  headers: string[]
};

const DatasetTableHeaderRow = ({ headers }: HeaderRowProps) => (
  <thead className="bg-gray-50">
    <tr>
      {headers.map((header) => (
        <th key={header} scope="col">
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default DatasetTableHeaderRow;
