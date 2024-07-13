import React from 'react';
import cl from "./ExercisesSearchCard.module.scss"
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { ExercisesFromCategory } from 'features/exercises/ui/exercises-from-category';

export const ExercisesSearchCard = () => {
    const { exercise__search } = useAppSelector(state => state?.exercises)

    return (
        <>
            {
                exercise__search.length > 0 ?
                    <ExercisesFromCategory exercises__all />
                    : <h1 className={cl.title}>Такого упражнения не найдено(</h1>
            }
        </>
    );
};
