import { ExercisesFromCategory } from 'features/exercises/ui/exercises-from-category';
import React from 'react';
import cl from "./ExercisesCategoryCard.module.scss"
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';

export const ExercisesCategoryCard = () => {
    const { category__current } = useAppSelector(state => state.categories)

    return (
        <section className={cl.categories}>
            {
                category__current ? <ExercisesFromCategory /> : <h1>Выбери категорию</h1>
            }

        </section>
    );
};
