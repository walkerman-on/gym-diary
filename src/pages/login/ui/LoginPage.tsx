import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AuthForm } from 'widgets/authForm';
import { useLogin } from 'entities/Auth/hooks/useLogin';
import cl from "./LoginPage.module.scss"
import { Link } from 'react-router-dom';
import { getRegister } from 'app/providers/router';

export const LoginPage = () => {
  const { theme } = useTheme();
   const { login } = useLogin() 

    return (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.LoginPage}>
                <AuthForm title='Войти' handleClick={login}/>
                <Link to={getRegister()}>
                    <span className={cl.passwText}>Регистрация</span>
                </Link>
            </div>
        </main>
    );
};
