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
import { getCreateExercise } from 'app/providers/router';
import { createExercise } from "shared/helper/createExercise"
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { fetchExercisesByCategoryId } from 'entities/exercisesCategory/api/fetchExercisesByCategoryId';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';

export const CreateExerciseofCategoryPage = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [exerciseName, setExerciseName] = useState<string>("");

    useEffect(() => {
        dispatch(fetchExercisesCategoryById(categoryId));
        dispatch(fetchExercisesByCategoryId({ categoryId: categoryId, userId: user.id }));
    }, []);

    const { currentCategory, error, loading } = useAppSelector(state => state?.exercisesCategory);

    const handleOnChange = (e: any) => {
        setExerciseName(e.target.value);
    };

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(getCreateExercise());
    };

    // const createExerciseOnClick = () => {
    //     createExercise(categoryId, { name: exerciseName, userId: user.id });
    //     setExerciseName("");
    // };

    const createExerciseOnClick = async () => {
        await createExercise(categoryId, { name: exerciseName, userId: user.id });
        setExerciseName('');
        dispatch(fetchExercisesByCategoryId({ categoryId, userId: user.id })); // Загружаем обновленные данные после создания упражнения
    };

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
                    <div>
                        {
                            exerciseName !== "" &&
                            <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExerciseOnClick}>Создать упражнение</Button>
                        }
                    </div>
                </section>
                <ul className={cl.exercises}>
                    {
                        currentCategory?.exercises?.map(item => (
                            <li key={item.id}>{item?.name}</li>
                        ))
                    }
                </ul>
                <div className={cl.backArrow} onClick={handleOnClick}>
                    <ArrowLeftIcon />
                </div>
            </div>
        </main>
    );
};
