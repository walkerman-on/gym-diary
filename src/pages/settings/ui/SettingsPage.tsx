import cl from "./SettingsPage.module.scss"
import { Layout } from 'pages/layout';
import { ThemeSwitcher } from 'shared/ui/theme-switcher';
import { getDate } from 'app/providers/router';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Footer } from 'widgets/footer';
import EmailIcon from 'shared/assets/icons/EmailIcon';
import LogoutIcon from 'shared/assets/icons/LogoutIcon';
import { useLogout } from 'features/auth/hooks/useLogout';
import { DropDownMenu } from 'shared/ui/drop-down-menu';
import { Content } from "widgets/content";
import { Card } from "shared/ui/card";

const SettingsPage = () => {
	const { user } = useAuth()
	const { logout } = useLogout();

	const cardInfo = [
		{ id: "about", title: "О приложении", text: "🤖 Приложение работает в тестовом режиме" },
		{ id: "theme", title: "Светлая тема", text: "📆 Данная функция появится в официальном релизе" },
		{ id: "offline", title: "Оффлайн", text: "🛜 Оффлайн приложение пока недоступно" },
		{ id: "feedback", title: "Обратная связь", text: "💌 Все пожелания и предложения писать в телеграмм - @gym_diary_app" },
	]

	return (
		<>
			<Content>
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
						{
							cardInfo?.map((item) => (
								<DropDownMenu
									title={item?.title}
									content={
										<Card
											text={item?.text}
										/>
									}
									key={item?.id}
									text
								/>
							))
						}
					</article>
				</div>
			</Content>
			<Footer link={getDate()} text='Вернуться домой' />
		</>
	);
};

export default SettingsPage
