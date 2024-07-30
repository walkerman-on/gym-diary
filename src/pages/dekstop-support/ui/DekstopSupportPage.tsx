import { useTheme } from 'app/providers/theme-provider';
import classNames from 'classnames';
import React from 'react';
import cl from "./DekstopSupportPage.module.scss"
import { Link } from 'react-router-dom';

export const DekstopSupportPage = () => {
	const { theme } = useTheme();

	return (
		<>
			<main className={classNames("app", cl.Dekstop, {}, [theme])}>
				<section className={cl.main}>
					<h1 className={cl.title}>Этот сайт поддерживается только на мобильных устройствах и планшетах</h1>
				</section>
				<div className={cl.footer}>
					<span className={cl.subtitle}>© 2024 Gym Diary <span className={cl.figure}>|</span> designed and created by
						<Link to={"https://t.me/walkerman_on"}>
							<span className={cl.creator}> Alex Groshev</span>
						</Link>
					</span>
				</div>
			</main>

		</>

	)
};
