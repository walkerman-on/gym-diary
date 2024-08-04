import React, { FC } from 'react';
import cl from "./DropDownMenu.module.scss"
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';

interface IDropDownMenu {
	title: string,
	content: string
}

export const DropDownMenu: FC<IDropDownMenu> = ({ title, content }) => {
	return (
		<details className={cl.info__block}>
			<summary className={cl.info__title}>
				<h2 className={cl.title}>{title}</h2>
				<ArrowDownIcon />
			</summary>
			<h2 className={cl.subtitle}>{content}</h2>
		</details>
	);
};
