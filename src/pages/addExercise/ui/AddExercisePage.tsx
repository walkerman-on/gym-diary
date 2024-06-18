import React, { useEffect, useState } from 'react';
import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowRightIcon from 'shared/assets/icons/ArrowRightIcon';
import { PullButton } from 'shared/ui/pullButton';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesCategory } from 'entities/exercisesCategory';
import { ExercisesCategory } from 'widgets/exercisesCategory';

export const AddExercisePage = () => {
    const { theme } = useTheme();
    const [collapsed, setCollapsed] = useState<boolean>(true);

    const toggleMenu = () => {
        setCollapsed(prevState => !prevState);
    };
    return (
        <main className={classNames("app container", {}, [theme])}>
            <div className={cl.AddExercisePage}>
                <PullButton onClick={toggleMenu} />
                <section className={cl.searchBlock}>
                    <Input placeholder="Искать" height='50px' />
                </section>
                <section className={cl.exercisesBlock}>
                    <Button height='60px' radius="15px">Создать упражнение +</Button>
                    <ExercisesCategory />
                </section>
            </div>
        </main>);
};

