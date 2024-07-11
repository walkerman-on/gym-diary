import React, { FC, useState } from 'react';
import cl from "./Exercises.module.scss";
import { Exercise } from 'shared/ui/exercise';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { toggleExerciseSelected } from 'entities/exercisesCategory/model/slice/exercisesCategorySlice';
import { selectExerciseById } from 'entities/exercisesCategory/api/selectExerciseById';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import PeopleIcon from "shared/assets/img/people.svg"

export const Exercises: FC = () => {
    const currentCategory = useAppSelector(state => state.exercisesCategory.currentCategory);
    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const selectExercise = (id: string) => {
        setSelectedExerciseIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(itemId => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });
        dispatch(toggleExerciseSelected(id)); // Для обновления локального state
        dispatch(selectExerciseById({ userId: user?.id, exerciseId: id })); // Синхронизация с Firebase
    };

    // Проверка наличия данных перед рендерингом
    if (!currentCategory || !currentCategory.exercises) {
        return (<div className={cl.warning}>
            <h1 className={cl.warning__title}>выбери категорию</h1>
            <PeopleIcon />
        </div>)
    }

    return (
        <ul className={cl.exercises__group}>
            <Exercise
                exercises={currentCategory.exercises}
                selectExercise={selectExercise}
                selectExerciseId={selectedExerciseIds}
            />
        </ul>
    );
};
