import React from 'react';
import cl from "./Loader.module.scss"

export const Loader = () => {
	return (
		<div className={cl.Loader}>
			<span className={cl.loader}></span>
		</div>
	);
};
