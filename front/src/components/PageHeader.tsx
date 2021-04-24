import BackButton from "./BackButton";
import classNames from "classnames";
import React from "react";

type PageHeaderProps = {
  displayBackButton?: boolean,
  children?: React.ReactNode
}

const PageHeader = ({displayBackButton = false, children}: PageHeaderProps) => {
  const containerClassNames = classNames({'flex flex-row items-center': true, 'pb-8': displayBackButton});
  const titleClassNames = classNames({'pb-0': displayBackButton});

  return (
    <div className={containerClassNames}>
      {displayBackButton && <BackButton/>}
      <h1 className={titleClassNames}>{children}</h1>
    </div>
  );
};

export default PageHeader;
