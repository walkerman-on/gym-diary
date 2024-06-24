import React, { FC, useEffect, useState } from 'react';
import cl from './Exercise.module.scss';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import classNames from 'classnames';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toggleExerciseSelected } from 'entities/exercisesCategory/model/slice/exercisesCategorySlice';
import { selectExerciseById } from 'entities/exercisesCategory/api/selectExerciseById';

interface IExercise {
    userId: string
}

export const Exercise: FC<IExercise> = ({ userId }) => {
    const { currentCategory } = useAppSelector((state) => state.exercisesCategory);
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
        dispatch(toggleExerciseSelected(id)); // Для обновления локального state
        dispatch(selectExerciseById({ userId: userId, exerciseId: id })); // Синхронизация с Firebase
    };


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
                                [cl.subtitleExercise__active]: selectedExerciseIds.includes(item.id),
                            })}
                        >
                            {item.name}
                        </span>
                        {item?.selected === true && <CheckIcon />}
                    </li>
                ))
            ) : (
                <h1>Упражнений пока нет(</h1>
            )}
        </>
    );
};

export default Exercise;
