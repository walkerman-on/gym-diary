import { ExercisesInWorkout } from 'features/exercises/ui/exercises-in-workout';
import React from 'react';
import cl from "./ExercisesWorkoutCard.module.scss"

export const ExercisesWorkoutCard = () => {
    return (
        <section className={cl.menu}>
            <ExercisesInWorkout />
        </section>

    );
};
