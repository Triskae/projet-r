import React from 'react';

type HeaderRowProps = {
  headers: string[]
};

const DatasetTableHeaderRow = ({ headers }: HeaderRowProps) => (
  <thead>
    <tr>
      {headers.map((header) => (
        <th
          key={header}
          scope="col"
          className="sticky top-0 bg-gray-50 border-l-0 border-r-0 border-b border-gray-200"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
);

export default DatasetTableHeaderRow;
