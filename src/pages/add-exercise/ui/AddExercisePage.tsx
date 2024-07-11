import React, { useEffect, useState } from 'react';
import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PullButton } from 'shared/ui/pullButton';
import { Link } from 'react-router-dom';
import { getCreateExercise } from 'app/providers/router';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findExerciseByName } from 'entities/exercises/api/findExerciseByName';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { ExercisesCategory } from 'features/exercises-category';
import { Exercises } from 'widgets/exercises';

export const AddExercisePage = () => {
    const { user } = useAuth();
    const { theme } = useTheme();

    const [exerciseName, setExerciseName] = useState<string>("")

    const dispatch = useAppDispatch()
    const { exercises: findExercises } = useAppSelector(state => state?.exercises)

    const findExerciseOnChange = (e: any) => {
        setExerciseName(e.target.value)
        dispatch(findExerciseByName({ userId: user?.id, namePrefix: e.target.value }))
    }

    return (
        <main className={classNames("app container", cl.AddExercisePage, {}, [theme])}>
            <section className={cl.menu}>
                <Input
                    placeholder="Искать"
                    height='50px'
                    value={exerciseName}
                    onChange={(e) => findExerciseOnChange(e)}
                />
                <Link to={getCreateExercise()}>
                    <Button height='60px' radius="15px">Создать упражнение +</Button>
                </Link>
            </section>

            <section className={cl.categories}>

                {
                    findExercises ?
                        findExercises?.map(item => (
                            <h1>{item?.name}</h1>
                        ))
                        : <ExercisesCategory />
                }
                <Exercises />
            </section>
        </main>);
};

