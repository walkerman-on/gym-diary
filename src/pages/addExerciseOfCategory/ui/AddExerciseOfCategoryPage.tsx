import React, { useEffect } from 'react';
import cl from "./AddExerciseOfCategoryPage.module.scss"
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesCategoryById } from 'entities/exercisesCategory';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { getAddExercise, getCreateExerciseofCategory } from 'app/providers/router';
import { Button } from 'shared/ui/button';

export const AddExerciseOfCategoryPage = () => {
    const { theme } = useTheme();

    const { categoryId } = useParams()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchExercisesCategoryById(categoryId))
    }, [])

    const navigate = useNavigate()

    const handleOnClick = () => {
        navigate(getAddExercise())
    }

    const createExercise = () => {
        navigate(getCreateExerciseofCategory(categoryId))
    }
    const { currentCategory } = useAppSelector(state => state?.exercisesCategory)

    return (
        <main className={classNames("app container", {}, [theme])}>
            <div className={cl.CreateExerciseofCategoryPage}>
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
            </div>
        </main>);
};
