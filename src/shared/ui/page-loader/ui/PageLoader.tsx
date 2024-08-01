import React from 'react';
import Logo from "../../../assets/img/logo.svg"
import cl from "./PageLoader.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/theme-provider';

export const PageLoader = () => {
	const { theme } = useTheme();

	return (
		<main className={classNames("app", cl.loader, {}, [theme])}>
			<div className={cl.logo__block}>
				<div className={cl.container}>
					<Logo />
				</div>
				<span className={cl.title}>Gym Diary</span>
			</div>
			<div className={cl.footer}>
				<span className={cl.subtitle}>© 2024 Gym Diary
				</span>
			</div>
		</main>
	);
};
