import React, { useContext } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import DatasetTableContext from './DatasetTableContext';

type DatasetTableRowProps = {
  index: number
};

const DatasetTableRow = ({ index }: DatasetTableRowProps) => {
  const { headers, rows } = useContext(DatasetTableContext);

  return (
    <tr key={generateUniqueID()}>
      {headers.map((header) => (
        <td key={generateUniqueID()}>{rows[index][header]}</td>
      ))}
    </tr>
  );
};

export default DatasetTableRow;
