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
import { deleteExercises } from 'shared/helper/deleteExercise';
import { Skeleton } from 'shared/ui/skeleton';

export const CreateExerciseofCategoryPage = () => {
    const { user } = useAuth();
    const { theme } = useTheme();
    const { categoryId } = useParams();
    const dispatch = useDispatch();
    const [exerciseName, setExerciseName] = useState<string>("");
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    useEffect(() => {
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

    const selectExercise = (id: string) => {
        setSelectedExerciseIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(itemId => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });
    };

    const createExerciseOnClick = async () => {
        createExercise(categoryId, { name: exerciseName, userId: user.id });
        setExerciseName('');
        dispatch(fetchExercisesByCategoryId({ categoryId, userId: user.id }));
    };

    const handleDeleteExercises = async () => {
        deleteExercises({ ids: selectedExerciseIds, userId: user?.id });
        setSelectedExerciseIds([]);
        dispatch(fetchExercisesByCategoryId({ categoryId, userId: user.id }));
    };

    return (
        <main className={classNames("app", cl.CreateExerciseofCategoryPage, {}, [theme])}>
            <section className={cl.createExerciseHeader}>
                {
                    loading ? <Skeleton height='50px' width="150px" />
                        : <h1 className={cl.titleCategory}>{currentCategory?.title}</h1>
                }
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
            {
                currentCategory?.exercises
                    ? <ul className={cl.exercises__group}>
                        {currentCategory?.exercises?.map(item => (
                            <li
                                className={cl.exercise__item}
                                key={item.id}
                                onClick={() => selectExercise(item.id)}
                            >
                                <span className={classNames(cl.subtitleExercise, { [cl.subtitleExercise__active]: selectedExerciseIds.includes(item?.id) })}>{item?.name}</span>
                                {
                                    selectedExerciseIds.includes(item?.id) &&
                                    <CheckIcon />
                                }
                            </li>
                        ))}
                    </ul>
                    : <ul className={cl.exercises__group}>
                        <h1>Загрузка...</h1>
                    </ul>
            }
            <div className={cl.menuFooter}>
                <ArrowLeftIcon onClick={handleOnClick} />
                {
                    selectedExerciseIds.length > 0 &&
                    <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={handleDeleteExercises}>
                        Удалить
                    </Button>
                }
            </div>
        </main>
    );
};
