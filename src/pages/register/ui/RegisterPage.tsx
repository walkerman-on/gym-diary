import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AuthForm } from 'widgets/authForm';
import { useLogin } from 'entities/Auth/hooks/useLogin';
import cl from "./RegisterPage.module.scss"
import { getLogin } from 'app/providers/router';
import { Link } from 'react-router-dom';

export const RegisterPage = () => {
  const { theme } = useTheme();
   const { login } = useLogin() 

    return (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.RegisterPage}>
                <AuthForm title='Регистрация'handleClick={login}/>
                <Link to={getLogin()}>
                    <span className={cl.passwText}>Войти</span>
                </Link>
            </div>
        </main>
    );
};
