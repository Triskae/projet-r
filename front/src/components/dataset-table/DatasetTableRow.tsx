import React, { useContext } from 'react';
import { generateUniqueID } from 'web-vitals/dist/modules/lib/generateUniqueID';
import classNames from 'classnames';
import DatasetTableContext from './DatasetTableContext';

type DatasetTableRowProps = {
  index: number
};

const DatasetTableRow = ({ index }: DatasetTableRowProps) => {
  const { headers, rows } = useContext(DatasetTableContext);
  const rowClassName = classNames({
    'bg-gray-50': index % 2 !== 0
  });

  return (
    <tr key={generateUniqueID()} className={rowClassName}>
      {headers.map((header) => (
        <td key={generateUniqueID()}>{rows[index][header]}</td>
      ))}
    </tr>
  );
};

export default DatasetTableRow;
