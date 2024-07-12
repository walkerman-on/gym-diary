import React, { useEffect, useState } from 'react';
import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { PullButton } from 'shared/ui/pullButton';
import { Link, useNavigate } from 'react-router-dom';
import { getCreateExercise, getTraining } from 'app/providers/router';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { ExercisesFromCategoryPage } from 'pages/exercises-from-category';
import { useAuth } from 'features/auth/hooks/useAuth';
import { findExerciseByName } from 'features/exercises/api/findExerciseByName';
import { ExercisesCategoryCard } from 'widgets/exercises-card/exercises-category-card';
import { CategoriesCard } from 'widgets/categories-card';

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

    const navigate = useNavigate();
    const addMoreBtnHandler = () => {
        navigate(getTraining());
    };

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

                {/* {
                    findExercises ?
                        findExercises?.map(item => (
                            <h1>{item?.name}</h1>
                        ))
                        : <CategoriesCard />
                } */}
                <CategoriesCard />
                {/* widget для отображения категорий выше*/}
                {/* widget для отображения упражнений из категории*/}
                <ExercisesCategoryCard />
            </section>
            <div className={cl.footer}>
                <Button height="60px" radius="15px" onClick={addMoreBtnHandler}>
                    Добавить в тренировку
                </Button>
            </div>
        </main>);
};

