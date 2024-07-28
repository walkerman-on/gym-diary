import React, { FC } from 'react';
import cl from './ExerciseFromCategory.module.scss';
import classNames from 'classnames';
import CheckIcon from 'shared/assets/icons/CheckIcon';
import { IExercise } from 'features/exercises';
import TrashIcon from 'shared/assets/icons/TrashIcon';

interface IExerciseProps {
    exercises: IExercise[],
    selectExerciseId: string[],
    selectExercise: (id: string) => void,
    value: boolean
}

export const ExerciseFromCategory: FC<IExerciseProps> = ({ exercises, selectExercise, selectExerciseId, value }) => {
    return (
        <>
            {exercises ? (
                exercises?.map((item) => (
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
                        {
                            value ? item && <TrashIcon color='var(--color-primary-400)' /> : item.selected && <CheckIcon />
                        }
                    </li>
                ))
            ) : (
                <h1>Упражнений пока нет, добавьте их</h1>
            )}
        </>
    );
};

