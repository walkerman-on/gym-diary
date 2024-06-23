import React, { FC } from 'react';
import cl from "./ExercisesGroup.module.scss"
import { Exercise } from 'shared/ui/exercise';

interface IExercisesGroup {
    userId: string
}

export const ExercisesGroup: FC<IExercisesGroup> = ({ userId }) => {
    return (
        <ul className={cl.exercises__group}>
            <Exercise userId={userId} />
        </ul>
    );
};
