import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import cl from "./AuthForm.module.scss"
import { FC, useCallback, useState } from 'react';


interface IForm {
  title: string;
  handleClick: (email: string, pass: string) => void;
}

export const AuthForm:FC<IForm> = ({ title, handleClick }) => {
    const [userData, setUserData] = useState({ login: '', password: '' });

  const onLoginHandle = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prev) => ({ ...prev, login: e.target.value }));
  }, []);

  const onPasswordHandle = useCallback((e: React.ChangeEvent<HTMLInputElement>): void => {
    setUserData((prev) => ({ ...prev, password: e.target.value }));
  }, []);

  const onBtnClick = useCallback((): void => {
    handleClick(userData.login, userData.password);
  }, [userData, handleClick]);

    return (
       <div className={cl.AuthPage}>
                <span className={cl.textTitle}>Авторизация</span>
                <section className={cl.authBlock}>
                    <div className={cl.authInput}>
                        <Input 
                            value={userData.login} 
                            onChange={onLoginHandle}
                            height="50px" 
                            placeholder='Логин'
                        />
                        <Input 
                            height="50px" 
                            placeholder='Пароль'
                            type="password" 
                            value={userData.password} 
                            onChange={onPasswordHandle}
                        />
                    </div>
                    <div className={cl.authButton}>
                        <Button height='50px'radius='7px' onClick={onBtnClick}>{title}</Button>
                    </div>
                </section>
            </div>
    );
};
