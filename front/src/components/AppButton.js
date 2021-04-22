import React from 'react';
import PropTypes from "prop-types";

const AppButton = (props) => {
  let classes = "w-full items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500";
  if (props.additionalClasses) classes += ` ${props.additionalClasses}`;

  return (
    <button
      type="button"
      className={classes}
      onClick={props.action}
    >
      {props.children}
    </button>
  );
};

AppButton.propTypes = {
  action: PropTypes.func,
  children: PropTypes.node,
  additionalClasses: PropTypes.string
}

export default AppButton;
