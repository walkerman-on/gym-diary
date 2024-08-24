import React from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/theme-provider';
import cl from "./NotFoundPage.module.scss"
import { getDate, getTraining } from 'app/providers/router';
import { Link } from 'react-router-dom';
import { Layout } from 'pages/layout';

export const NotFoundPage = () => {
    const { theme } = useTheme();

    return (
        <Layout>
            <div className={cl.NotFoundPage}>
                <span>Такой страницы нет, вернитесь к
                    <Link to={getDate()}>
                        <span className={cl.textBack}> тренировкам</span>
                    </Link>
                </span>

            </div>
        </Layout>
    );
};
