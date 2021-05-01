import React, { MouseEventHandler } from 'react';
import classNames from 'classnames';

interface ButtonProps {
  className?: string;
  type?: 'submit' | 'button' | 'reset' | undefined;
  btnStyle?: 'base' | 'secondary';
  onClick?: MouseEventHandler<HTMLButtonElement>;
  children: React.ReactNode
}

const Button = ({ ...props }: ButtonProps) => {
  const buttonClasses = classNames({
    'w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500': props.btnStyle === 'base',
    'w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500': props.btnStyle === 'secondary',
  }, props.className);

  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={props.type}
      className={buttonClasses}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  className: null,
  type: 'button',
  btnStyle: 'base',
  onClick: null
};

export default Button;
