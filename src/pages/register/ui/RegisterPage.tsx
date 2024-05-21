import { useTheme } from 'app/providers/ThemeProvider';
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/input';
import cl from "./RegisterPage.module.scss"
export const RegisterPage = () => {
  const { theme } = useTheme();

    return (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.RegisterPage}></div>
            <Input/>
            <Input/>
        </main>
    );
};
