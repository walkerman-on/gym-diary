import React, { FC } from 'react';
import cl from './Exercise.module.scss';
import classNames from 'classnames';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { IExercise } from 'entities/exercises';

interface IExerciseProps {
    exercises: IExercise[],
    selectExerciseId: string[],
    selectExercise: (id: string) => void,
}

export const Exercise: FC<IExerciseProps> = ({ exercises, selectExercise, selectExerciseId }) => {
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
                <h1>Упражнений пока нет, добавьте их</h1>
            )}
        </>
    );
};

export default Exercise;
