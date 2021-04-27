import React from 'react';
import classNames from 'classnames';
import BackButton from './BackButton';

type PageHeaderProps = {
  displayBackButton?: boolean,
  children: string
};

const PageHeader = ({ displayBackButton = false, children }: PageHeaderProps) => {
  const containerClassNames = classNames({
    'flex flex-row items-center': true,
    'pb-8': displayBackButton
  });
  const titleClassNames = classNames({ 'pb-0': displayBackButton });

  return (
    <div className={containerClassNames}>
      {displayBackButton && <BackButton />}
      <h1 className={titleClassNames}>{children}</h1>
    </div>
  );
};

PageHeader.defaultProps = {
  displayBackButton: false
};

export default PageHeader;
