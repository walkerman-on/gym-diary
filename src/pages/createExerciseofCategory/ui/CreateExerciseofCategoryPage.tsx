import React, { useEffect, useState } from 'react';
import cl from "./CreateExerciseofCategoryPage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchExercisesCategoryById } from 'entities/exercisesCategory';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { getCreateExercise } from 'app/providers/router';

export const CreateExerciseofCategoryPage = () => {
    const { theme } = useTheme();
    const { categoryId } = useParams()
    const dispatch = useDispatch()
    const [exerciseName, setExerciseName] = useState<string>("")
    useEffect(() => {
        dispatch(fetchExercisesCategoryById(categoryId))
    }, [])

    const { currentCategory } = useAppSelector(state => state?.exercisesCategory)

    const handleOnChange = (e: any) => {
        setExerciseName(e.target.value)
    }
    const navigate = useNavigate()
    const handleOnClick = () => {
        navigate(getCreateExercise())
    }

    const createExercise = () => {
        console.log("exerciseName - ", exerciseName)
        setExerciseName("")
    }

    return (
        <main className={classNames("app container", {}, [theme])}>
            <div className={cl.CreateExerciseofCategoryPage}>
                <section className={cl.createExercise}>
                    <h1 className={cl.title}>{currentCategory?.title}</h1>
                    <Input
                        placeholder='Название упражнения'
                        height='50px'
                        value={exerciseName}
                        onChange={handleOnChange}
                    />
                </section>
                <section className={cl.createExerciseBlock}>
                    <div className={cl.backArrow} onClick={handleOnClick}>
                        <ArrowLeftIcon />
                    </div>
                    {
                        exerciseName !== "" &&
                        <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExercise}>Создать упражнение</Button>
                    }
                </section>

            </div>
        </main>);
};
