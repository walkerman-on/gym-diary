import React, { useEffect } from 'react';
import cl from "./ExercisesFromCategoryPage.module.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { getAddExercise, getCreateExerciseofCategory } from 'app/providers/router';
import { Button } from 'shared/ui/button';
import { fetchCategoryCurrent } from 'features/categories/api/fetchCategoryCurrent';
import { useAuth } from 'features/auth/hooks/useAuth';

export const ExercisesFromCategoryPage = () => {
    const { theme } = useTheme();
    const { user } = useAuth()

    const { categoryId } = useParams()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategoryCurrent({ userId: user?.id, categoryId: categoryId }))
    }, [])

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(getAddExercise())
    }

    const createExercise = () => {
        navigate(getCreateExerciseofCategory(categoryId))
    }
    const { category__current } = useAppSelector(state => state?.categories)

    return (
        <main className={classNames("app container", {}, [theme])}>
            {/* <div className={cl.CreateExerciseofCategoryPage}>
                <section>
                    <h1 className={cl.title}>{currentCategory?.title}</h1>
                    <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExercise}>Создать упражнение</Button>
                </section>
                <ul className={cl.createExerciseBlock}>
                    <li>Бицепс в тренажере</li>
                </ul>
                <div className={cl.backArrow} onClick={handleOnClick}>
                    <ArrowLeftIcon />
                </div>
            </div> */}
        </main>
    );
};
