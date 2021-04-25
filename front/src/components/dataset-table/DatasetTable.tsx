import React, { useContext, useRef, useState } from 'react';
import { FixedSizeList, FixedSizeListProps } from 'react-window';
import { DatasetRow } from '../../models/Dataset';
import DatasetTableRow from './DatasetTableRow';
import DatasetTableHeaderRow from './DatasetTableHeaderRow';
import DatasetTableContext from './DatasetTableContext';

const InnerTable = React.forwardRef<HTMLDivElement, React.HTMLProps<HTMLDivElement>>(
  // eslint-disable-next-line react/prop-types
  ({ children, ...rest }, ref) => {
    const { headers, top } = useContext(DatasetTableContext);
    return (
      <div {...rest} ref={ref}>
        <table style={{ top, position: 'absolute', width: '100%' }}>
          <DatasetTableHeaderRow headers={headers} />
          <tbody>{children}</tbody>
        </table>
      </div>
    );
  }
);

type DatasetTableProps = {
  headers: string[]
  rows: DatasetRow[]
} & Omit<FixedSizeListProps, 'children' | 'innerElementType'>;

const DatasetTable = ({ headers, rows, ...rest }: DatasetTableProps) => {
  const listRef = useRef<FixedSizeList | null>();
  const [top, setTop] = useState(0);

  return (
    <DatasetTableContext.Provider value={{ top, setTop, headers, rows }}>
      <FixedSizeList
        {...rest}
        innerElementType={InnerTable}
        onItemsRendered={(props) => {
          const style = listRef.current
            // @ts-ignore private method access
            // eslint-disable-next-line no-underscore-dangle
            && listRef.current._getItemStyle(props.overscanStartIndex);
          setTop((style && style.top) || 0);
          // eslint-disable-next-line @typescript-eslint/no-unused-expressions
          rest.onItemsRendered && rest.onItemsRendered(props);
        }}
        ref={(el) => (listRef.current = el)}
      >
        {DatasetTableRow}
      </FixedSizeList>
    </DatasetTableContext.Provider>
  );
};

export default DatasetTable;
