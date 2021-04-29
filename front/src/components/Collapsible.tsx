import React from 'react';
import { Disclosure } from '@headlessui/react';
import { ChevronUpIcon } from '@heroicons/react/solid';

interface CollapsibleProps {
  collapsibleTitle: string;

  [key: string]: any;
}

const Collapsible = ({ collapsibleTitle, ...props }: CollapsibleProps) => (
  <div {...props}>
    <Disclosure>
      {({ open }) => (
        <>
          <Disclosure.Button
            className="flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-blue-900 bg-blue-100 rounded-lg hover:bg-blue-200 focus:outline-none focus-visible:ring focus-visible:ring-blue-500 focus-visible:ring-opacity-75"
          >
            <span>{collapsibleTitle}</span>
            <ChevronUpIcon
              className={`${open ? 'transform rotate-180' : ''} w-5 h-5 text-blue-900`}
            />
          </Disclosure.Button>
          <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm">
            {props.children}
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  </div>
);

export default Collapsible;
