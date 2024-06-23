import React, { FC, useEffect, useState } from 'react';
import cl from './Exercise.module.scss';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import classNames from 'classnames';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { selectExerciseById } from 'entities/exercises/api/selectExerciseById';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { fetchAllExercises } from 'entities/exercises/api/fetchAllExercises';
import { toggleExerciseSelected } from 'entities/exercises/model/slice/exercisesSlice';

interface IExercise {
    userId: string
}

export const Exercise: FC<IExercise> = ({ userId }) => {
    const { currentCategory, error, loading } = useAppSelector((state) => state.exercisesCategory);
    const { exercises } = useAppSelector((state) => state.exercises);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    const dispatch = useAppDispatch();

    const selectExercise = (id: string) => {
        setSelectedExerciseIds((prevIds) => {
            if (prevIds.includes(id)) {
                return prevIds.filter((itemId) => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });
        dispatch(toggleExerciseSelected(id)); // Оптимистическое обновление
        dispatch(selectExerciseById({ userId: userId, exerciseId: id })); // Синхронизация с Firebase
    };

    useEffect(() => {
        dispatch(fetchAllExercises({ userId: userId }));
    }, []);

    if (loading) {
        return <h1>Загрузка...</h1>;
    }

    if (error) {
        return <h1>Ошибка: {error}</h1>;
    }

    return (
        <>
            {currentCategory?.exercises?.length > 0 ? (
                currentCategory.exercises.map((item) => (
                    <li
                        className={cl.exercise__item}
                        key={item.id}
                        onClick={() => selectExercise(item.id)}
                    >
                        <span
                            className={classNames(cl.subtitleExercise, {
                                [cl.subtitleExercise__active]: exercises?.some(ex => ex.id === item.id && ex.selected),
                            })}
                        >
                            {item.name}
                        </span>
                        {exercises?.some(ex => ex.id === item.id && ex.selected) && <CheckIcon />}
                    </li>
                ))
            ) : (
                <h1>Упражнений пока нет(</h1>
            )}
        </>
    );
};

export default Exercise;
