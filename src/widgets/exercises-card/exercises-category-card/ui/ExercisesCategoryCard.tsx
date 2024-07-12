import { ExercisesFromCategory } from 'features/exercises/ui/exercises-from-category';
import React from 'react';
import cl from "./ExercisesCategoryCard.module.scss"

export const ExercisesCategoryCard = () => {
    return (
        <section className={cl.categories}>
            <ExercisesFromCategory />
        </section>
    );
};
