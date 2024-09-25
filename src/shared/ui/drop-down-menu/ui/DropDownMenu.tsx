import React, { FC, ReactNode } from 'react';
import cl from "./DropDownMenu.module.scss"
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import classNames from 'classnames';
interface IDropDownMenu {
	title: string | ReactNode,
	content: string | ReactNode,
	text?: boolean
}

export const DropDownMenu: FC<IDropDownMenu> = ({ title, content, text }) => {
	return (
		<details className={cl.info__block}>
			<summary className={classNames(cl.info__title, { [cl.info__text]: text })}>
				{title}
			</summary>
			{content}
		</details>
	);
};
