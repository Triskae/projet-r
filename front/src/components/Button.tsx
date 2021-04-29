import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: string
}

const Button = ({ ...props }: ButtonProps) => {
  const buttonClasses = classNames(
    'w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500',
    props.className
  );

  return (
    <button
      type="submit"
      className={buttonClasses}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  className: null,
  onClick: null
};

export default Button;
