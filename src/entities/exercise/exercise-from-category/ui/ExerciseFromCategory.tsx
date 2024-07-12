import React, { FC } from 'react';
import cl from './ExerciseFromCategory.module.scss';
import classNames from 'classnames';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { IExercise } from 'features/exercises';

interface IExerciseProps {
    exercises: IExercise[],
    selectExerciseId: string[],
    selectExercise: (id: string) => void,
}

export const ExerciseFromCategory: FC<IExerciseProps> = ({ exercises, selectExercise, selectExerciseId }) => {
    return (
        <>
            {exercises.length > 0 ? (
                exercises.map((item) => (
                    <li
                        className={cl.exercise__item}
                        key={item.id}
                        onClick={() => selectExercise(item.id)}
                    >
                        <span
                            className={classNames(cl.subtitleExercise, {
                                [cl.subtitleExercise__active]: selectExerciseId.includes(item.id),
                            })}
                        >
                            {item.name}
                        </span>
                        {item.selected && <CheckIcon />}
                    </li>
                ))
            ) : (
                <h1>Упражнение не найдено, добавьте его</h1>
            )}
        </>
    );
};

