import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import cl from "./NotFoundPage.module.scss"
import { getTraining } from 'app/providers/router';
import { Link } from 'react-router-dom';

export const NotFoundPage = () => {
  const { theme } = useTheme();

    return (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.NotFoundPage}>
            <span>Такой страницы нет, вернитесь к
                <Link to={getTraining()}>
                    <span className={cl.textBack}> тренировкам</span>
                </Link>
            </span>

            </div>
            
        </main>
    );
};
