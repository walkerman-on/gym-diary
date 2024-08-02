import React from 'react';
import cl from "./SettingsPage.module.scss"
import { Layout } from 'pages/layout';
import { ThemeSwitcher } from 'shared/ui/theme-switcher';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import { Link } from 'react-router-dom';
import { getFeedback, getTraining } from 'app/providers/router';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Footer } from 'widgets/footer';
import EmailIcon from 'shared/assets/icons/EmailIcon';
import ThemeIcon from 'shared/assets/icons/ThemeIcon';
import LogoutIcon from 'shared/assets/icons/LogoutIcon';
import { useLogout } from 'features/auth/hooks/useLogout';

const SettingsPage = () => {
	const { user } = useAuth()
	const { logout } = useLogout();

	return (
		<Layout>
			<div className={cl.page}>
				<section className={cl.settings__info}>
					<h1 className={cl.page_title}>Профиль</h1>
					<p className={cl.settings__main}>
						<h2 className={cl.settings__title}>
							<ThemeSwitcher />
						</h2>
						<h2 className={cl.settings__title}>
							<EmailIcon />
							Почта: {user?.email}
						</h2>
						<h2 className={cl.settings__title}>
							<LogoutIcon onClick={logout} />
							Выйти из аккаунта
						</h2>
					</p>
				</section>
				<article className={cl.info__more}>
					<h1 className={cl.faq}>FAQ</h1>
					<details className={cl.info__block}>
						<summary className={cl.info__title}>
							<h2 className={cl.title}>Поделиться</h2>
							<ArrowDownIcon />
						</summary>
						<h2 className={cl.subtitle}>📆 Данная функция появится в официальном релизе</h2>
					</details>
					<details className={cl.info__block}>
						<summary className={cl.info__title}>
							<h2 className={cl.title}>О приложении</h2>
							<ArrowDownIcon />
						</summary>
						<h2 className={cl.subtitle}>🤖 Приложение работает в тестовом режиме (version <span className={cl.subtitle__version}> 1.0.0-beta</span>)</h2>

					</details>
					<details className={cl.info__block}>
						<summary className={cl.info__title}>
							<h2 className={cl.title}>Оффлайн и онлайн</h2>
							<ArrowDownIcon />
						</summary>
						<h2 className={cl.subtitle}>🛜 Оффлайн приложение пока недоступно</h2>
					</details>
					<details className={cl.info__block}>
						<summary className={cl.info__title}>
							<h2 className={cl.title}>Обратная связь</h2>
							<ArrowDownIcon />
						</summary>
						<h2 className={cl.subtitle}>💌 Все пожелания и предложения писать с пометкой
							<span className={cl.feedback__title}> #gym-diary_feedback </span>
							в телеграмм -
							<Link to={getFeedback()}>
								<span className={cl.feedback__title}>@walkerman_on</span>
							</Link>
						</h2>
					</details>
				</article>
			</div>
			<Footer link={getTraining()} text='На главную' />
		</Layout>
	);
};

export default SettingsPage
