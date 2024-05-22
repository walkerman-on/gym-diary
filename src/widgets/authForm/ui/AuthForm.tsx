import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import cl from "./AuthForm.module.scss"

export const AuthForm = () => {
    return (
       <div className={cl.AuthPage}>
                <span className={cl.textTitle}>Авторизация</span>
                <section className={cl.authBlock}>
                    <div className={cl.authInput}>
                        <Input height="50px" placeholder='Логин'/>
                        <Input height="50px" placeholder='Пароль'/>
                    </div>
                    <div className={cl.authButton}>
                        <Button height='50px'radius='7px'>Войти</Button>
                        <Button height='50px'radius='7px' variant="outlined">Регистрация</Button>
                    </div>
                    <span className={cl.passwText}>Восстановить пароль</span>
                </section>
            </div>
    );
};
