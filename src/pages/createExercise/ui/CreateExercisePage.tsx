import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { ExercisesCategory } from 'widgets/exercisesCategory';
import cl from "./CreateExercisePage.module.scss"

export const CreateExercisePage = () => {
    const { theme } = useTheme();

    return (
        <main className={classNames("app container", {}, [theme])}>
            <div className={cl.CreateExercisePage}>
                <div className={cl.titleBlock}>
                    <h2 className={cl.subTitle}>Новое упражнение</h2>
                    <h1 className={cl.title}>Выбери категорию</h1>
                </div>
                <ExercisesCategory createExercise />
            </div>
        </main>);
};
