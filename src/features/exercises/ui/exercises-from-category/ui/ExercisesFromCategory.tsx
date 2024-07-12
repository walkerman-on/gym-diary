import React, { FC, useState } from 'react';
import cl from "./ExercisesFromCategory.module.scss";
import { ExerciseFromCategory } from 'entities/exercise/exercise-from-category';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import PeopleIcon from "shared/assets/img/people.svg"
import { useAuth } from 'features/auth/hooks/useAuth';
import { toggleExerciseSelected } from 'features/categories/model/slice/categoriesSlice';
import { selectExerciseById } from 'features/exercises/api/selectExerciseById';

export const ExercisesFromCategory: FC = () => {
    const category = useAppSelector(state => state.categories?.category__current);
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
    if (!category || !category.exercises) {
        return (<div className={cl.warning}>
            <div style={{ width: "320px" }}>
                <PeopleIcon />

            </div>
            <h1 className={cl.warning__title}>выбери категорию</h1>
        </div>)
    }

    return (
        <ul className={cl.exercises__group}>
            <ExerciseFromCategory
                exercises={category.exercises}
                selectExercise={selectExercise}
                selectExerciseId={selectedExerciseIds}
            />
        </ul>
    );
};
