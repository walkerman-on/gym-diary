import React, { useEffect, useState } from 'react';
import cl from "./CreateExerciseofCategoryPage.module.scss";
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchExercisesCategoryById } from 'entities/exercisesCategory';
import { Input } from 'shared/ui/input';
import { Button } from 'shared/ui/button';
import { getCreateExercise } from 'app/providers/router';
import { createExercise } from "shared/helper/createExercise";
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { fetchExercisesByCategoryId } from 'entities/exercisesCategory/api/fetchExercisesByCategoryId';
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { deleteExercise } from 'shared/helper/deleteExercise';

export const CreateExerciseofCategoryPage = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [exerciseName, setExerciseName] = useState<string>("");
    const [selectedExerciseId, setSelectedExerciseId] = useState<string | null>(null);

    useEffect(() => {
        dispatch(fetchExercisesCategoryById(categoryId));
        dispatch(fetchExercisesByCategoryId({ categoryId: categoryId, userId: user.id }));
    }, [dispatch, categoryId, user.id]);

    const { currentCategory, error, loading } = useAppSelector(state => state?.exercisesCategory);

    const handleOnChange = (e: any) => {
        setExerciseName(e.target.value);
    };

    const navigate = useNavigate();
    const handleOnClick = () => {
        navigate(getCreateExercise());
    };
    const [selectedExercises, setSelectedExercises] = useState([])

    const selectExercise = (id: string) => {
        setSelectedExerciseId(id);
        setSelectedExercises([...selectedExercises, id])
        console.log({ selectedExercises })
        console.log(id)
    };

    const createExerciseOnClick = async () => {
        await createExercise(categoryId, { name: exerciseName, userId: user.id });
        setExerciseName('');
        dispatch(fetchExercisesByCategoryId({ categoryId, userId: user.id }));
    };



    const deleteExerciseOnClick = () => {

        deleteExercise({ id: "lxnid5f4", userId: user?.id })
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
                    <div>
                        {exerciseName !== "" && (
                            <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExerciseOnClick}>
                                Создать упражнение
                            </Button>
                        )}
                    </div>
                </section>
                <ul className={cl.exercises}>
                    {currentCategory?.exercises?.map(item => (
                        <li
                            className={cl.exerciseBlock}
                            key={item.id}
                            onClick={() => selectExercise(item.id)}
                        >
                            <span>{item?.name}</span>
                            <div className={classNames(cl.icon, { [cl.iconShow]: selectedExerciseId === item?.id })}>
                                <CheckIcon />
                            </div>
                        </li>
                    ))}
                </ul>
                <div className={cl.menu}>
                    <div className={cl.backArrow} onClick={handleOnClick}>
                        <ArrowLeftIcon />
                    </div>
                    <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={() => deleteExerciseOnClick}>
                        Удалить
                    </Button>
                </div>
            </div>
        </main>
    );
};
