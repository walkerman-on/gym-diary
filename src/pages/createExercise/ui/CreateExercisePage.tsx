import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { ExercisesCategory } from 'widgets/exercisesCategory';
import cl from "./CreateExercisePage.module.scss"
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import { getAddExercise } from 'app/providers/router';

export const CreateExercisePage = () => {

    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleOnClick = () => {
        navigate(getAddExercise());
    };

    return (
        <main className={classNames("app", cl.CreateExercisePage, {}, [theme])}>
            <div className={cl.chooseBlock}>
                <h2 className={cl.subTitle}>Новое упражнение</h2>
                <h1 className={cl.title}>Выбери категорию</h1>
            </div>
            <ExercisesCategory createExercise />
            <div className={cl.footer}>
                <ArrowLeftIcon onClick={handleOnClick} />
            </div>
        </main>);
};
