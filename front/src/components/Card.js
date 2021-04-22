import React from 'react';

const Card = (props) => {
  return (
    <div className="bg-white overflow-hidden shadow rounded-lg">
      <div className="px-4 py-5 sm:p-6">
        {props.children}
      </div>
    </div>
  );
};

export default Card;
