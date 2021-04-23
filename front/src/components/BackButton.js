import React from 'react';
import { ArrowLeftIcon } from "@heroicons/react/solid";
import { useHistory } from 'react-router-dom';

const BackButton = () => {
  const history = useHistory();

  return (
    <button
      className="h-fit mr-2 p-1 bg-gray-100 rounded-full text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ring-offset-gray-100"
      onClick={() => history.goBack()}
    >
      <ArrowLeftIcon className="h-6 w-6" aria-hidden="true"/>
    </button>
  );
};

export default BackButton;
