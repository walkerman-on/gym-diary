import { useTheme } from 'app/providers/ThemeProvider';
import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { AuthForm } from 'widgets/authForm';
export const RegisterPage = () => {
  const { theme } = useTheme();

    return (
        <main className={classNames("app", {}, [theme])}>
            <AuthForm/>
        </main>
    );
};
