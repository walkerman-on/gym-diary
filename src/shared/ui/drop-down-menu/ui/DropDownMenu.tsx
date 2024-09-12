import React, { FC, ReactNode } from 'react';
import cl from "./DropDownMenu.module.scss"
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';

interface IDropDownMenu {
	title: string | ReactNode,
	content: string | ReactNode
}

export const DropDownMenu: FC<IDropDownMenu> = ({ title, content }) => {
	return (
		<details className={cl.info__block}>
			<summary className={cl.info__title}>
				{title}
			</summary>
			{content}
		</details>
	);
};
