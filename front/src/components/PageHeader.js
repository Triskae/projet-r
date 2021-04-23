import React from 'react';
import BackButton from "./BackButton";
import classNames from "classnames";

const PageHeader = (props) => {
  const containerClassNames = classNames({'flex flex-row items-center': true, 'pb-8': props.displayBackButton});
  const titleClassNames = classNames({'pb-0': props.displayBackButton});

  return (
    <div className={containerClassNames}>
      {props.displayBackButton && <BackButton/>}
      <h1 className={titleClassNames}>{props.children}</h1>
    </div>
  );
};

export default PageHeader;
