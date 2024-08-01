import { useTheme } from 'app/providers/theme-provider';
import classNames from 'classnames';
import React from 'react';
import cl from "./DekstopSupportPage.module.scss"
import { Link } from 'react-router-dom';
import ShareIosIcon from 'shared/assets/icons/ShareIosIcon';
import AddIosIcon from 'shared/assets/icons/AddIosIcon';
import AppleIcon from 'shared/assets/icons/AppleIcon';
import AndroidIcon from 'shared/assets/icons/AndroidIcon';

export const DekstopSupportPage = () => {
	const { theme } = useTheme();

	return (
		<>
			<main className={classNames("app", cl.Dekstop, {}, [theme])}>
				<section className={cl.info}>
					<section>
						<h1 className={cl.title}>
							Этот сайт поддерживается только на мобильных устройствах и планшетах.
						</h1>
						<h2 className={cl.title}>
							Скачайте приложение на
							<span className={cl.icon}> IPhone </span>
							или <span className={cl.icon}> Android </span>
							для этого необходимо
						</h2>
					</section>
					<article className={cl.manual}>
						<section className={cl.manual__platform}>
							<h2 className={cl.manual__subtitle}> <AppleIcon /></h2>
							<ul className={cl.manual__list}>
								<li className={cl.manual__item}>
									<span>1. Нажать на кнопку</span>
									<ShareIosIcon />
								</li>
								<li className={cl.manual__item}>2. Нажать на кнопку <AddIosIcon /></li>
								<li className={cl.manual__item}>3. Добавить на экран "Домой"</li>
							</ul>
						</section>
						<section className={cl.manual__platform}>
							<h2 className={cl.manual__subtitle}> <AndroidIcon /></h2>
							<ul className={cl.manual__list}>
								<li className={cl.manual__item}>1. Нажать на кнопку "Настройки"</li>
								<li className={cl.manual__item}>2. Нажать на кнопку "На экран домой"</li>
							</ul>
						</section>
					</article>
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
