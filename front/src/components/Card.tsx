import React from 'react';
import classNames from 'classnames';

type CardProps = {
  className?: string;
  children: React.ReactNode
};

const Card = ({ className, children }: CardProps) => {
  const cardClassName = classNames(
    'bg-white overflow-hidden shadow rounded-lg',
    className
  );

  return (
    <div className={cardClassName}>
      <div className="px-4 py-5 sm:p-6">
        {children}
      </div>
    </div>
  );
};

Card.defaultProps = {
  className: ''
};

export default Card;
