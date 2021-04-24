import React from 'react';
import classNames from 'classnames';

type TableProps = {
  className?: string,
  headers: string[],
  children: React.ReactNode,
  [prop: string]: any
};

const Table = ({ headers, children, ...props }: TableProps) => {
  const tableClasses = classNames('flex flex-col', props.className);

  return (
    <div className={tableClasses}>
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {headers.map((header) => (
                    <th key={header} scope="col">
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {children}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

Table.defaultProps = {
  className: null
};

export default Table;
