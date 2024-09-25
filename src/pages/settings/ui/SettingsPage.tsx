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

const SettingsPage = () => {
	const { user } = useAuth()
	const { logout } = useLogout();

	return (
		<>
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
					<DropDownMenu title='О приложении' content='🤖 Приложение работает в тестовом режиме' />
					<DropDownMenu title='Поделиться' content='📆 Данная функция появится в официальном релизе' />
					<DropDownMenu title='Оффлайн' content='🛜 Оффлайн приложение пока недоступно' />
					<DropDownMenu title='Обратная связь' content='💌 Все пожелания и предложения писать с пометкой #gym-diary_feedback в телеграмм - @walkerman_on' />
				</article>
			</div>
			<Footer link={getDate()} text='Вернуться домой' />
		</>
	);
};

export default SettingsPage
