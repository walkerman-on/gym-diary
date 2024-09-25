import React, { FC } from 'react';
import cl from "./Card.module.scss"

interface ICard {
	text: string
}

export const Card: FC<ICard> = ({ text }) => {
	return (
		<div className={cl.card}>
			{text}
		</div>
	);
};
