import React from 'react';
import cl from "./ExercisesSearchCard.module.scss"
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';

export const ExercisesSearchCard = () => {
    const { exercises: findExercises } = useAppSelector(state => state?.exercises)

    return (
        <>
            {
                findExercises ?
                    findExercises?.map(item => (
                        <h1>{item?.name}</h1>
                    ))
                    : <h1>Такого упражнения не найдено(</h1>
            }
        </>
    );
};
