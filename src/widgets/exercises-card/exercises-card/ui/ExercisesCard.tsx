import React from 'react';
import cl from "./ExercisesCard.module.scss"
import { ExercisesSearchCard } from 'widgets/exercises-card/exercises-search-card';
import { CategoriesCard } from 'widgets/categories-card';
import { ExercisesCategoryCard } from 'widgets/exercises-card/exercises-category-card';

export const ExercisesCard = () => {
    return (
        <>
            {/* Добавить в store Exercises функцию findExerciseByName() и по условию добавить в exercise_search искомое упражнение 
            и в этом компоненте отрисовать по условию: 
                exercise_search ? 
                <ExercisesSearchCard /> 
                : <>
                    <CategoriesCard />
                    <ExercisesCategoryCard />
                  </>
        */}
            <ExercisesSearchCard />
            <CategoriesCard />
            <ExercisesCategoryCard />
        </>
    );
};
