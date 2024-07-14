import React, { FC, ReactNode } from 'react';
import cl from "./Layout.module.scss"
import { useTheme } from 'app/providers/ThemeProvider';
import classNames from 'classnames';

interface ILayout {
    children: ReactNode
}
export const Layout: FC<ILayout> = ({ children }) => {
    const { theme } = useTheme();

    return (
        <main className={classNames("app", cl.Layout, {}, [theme])}>
            {children}
        </main>);
};
