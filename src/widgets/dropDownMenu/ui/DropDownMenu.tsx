import React, { FC } from 'react';
import classNames from 'classnames';
import cl from "./DropDownMenu.module.scss";

export interface IProps {
  collapsed: boolean;
  maxHeight: number; // Add maxHeight as a prop
}

export const DropDownMenu: FC<IProps> = ({ collapsed, maxHeight, children }) => {
  return (
    <div
      className={classNames(cl.DropDownMenu, { [cl.expanded]: !collapsed })}
      style={{ '--max-height': `${maxHeight}px` } as React.CSSProperties}
    >
      {children}
    </div>
  );
};
