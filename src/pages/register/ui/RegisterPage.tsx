import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { AuthForm } from 'widgets/authForm';
import cl from "./RegisterPage.module.scss"
import { getLogin } from 'app/providers/router';
import { Link } from 'react-router-dom';
import { useSignUp } from 'features/auth/hooks/useSignUp';

export const RegisterPage = () => {
    const { theme } = useTheme();
    const { signUp } = useSignUp();


    return (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.RegisterPage}>
                <AuthForm title='Регистрация' handleClick={signUp} />
                <Link to={getLogin()}>
                    <span className={cl.passwText}>Войти</span>
                </Link>
            </div>
        </main>
    );
};
