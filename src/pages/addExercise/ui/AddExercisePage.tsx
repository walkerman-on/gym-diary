import React, { useEffect, useState } from 'react';
import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PullButton } from 'shared/ui/pullButton';
import { ExercisesCategory } from 'widgets/exercisesCategory';
import { Link } from 'react-router-dom';
import { getCreateExercise } from 'app/providers/router';

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
                    <Link to={getCreateExercise()}>
                        <Button height='60px' radius="15px">Создать упражнение +</Button>
                    </Link>
                    <ExercisesCategory />
                </section>
            </div>
        </main>);
};

