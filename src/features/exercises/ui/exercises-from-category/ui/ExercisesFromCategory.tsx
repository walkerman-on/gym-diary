import React, { FC, useEffect, useMemo, useState } from 'react';
import cl from "./ExercisesFromCategory.module.scss";
import { ExerciseFromCategory } from 'entities/exercise/exercise-from-category';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import PeopleIcon from "shared/assets/img/people.svg"
import { useAuth } from 'features/auth/hooks/useAuth';
import { toggleExerciseSelected } from 'features/categories/model/slice/categoriesSlice';
import { selectExerciseById } from 'features/exercises/api/selectExerciseById';
import { ExerciseCreateForm } from 'widgets/exercise-form/exercise-create-form';
import { useParams } from 'react-router-dom';
import { Skeleton } from 'shared/ui/skeleton';

interface IExercisesFromCategory {
    exercises__all?: boolean,
}

export const ExercisesFromCategory: FC<IExercisesFromCategory> = ({ exercises__all }) => {
    const category = useAppSelector(state => state.categories?.category__current);
    const { exercise__search, loading: exerciseLoading } = useAppSelector(state => state?.exercises);
    const { categoryId } = useParams<{ categoryId: string }>();
    const { user } = useAuth();
    const dispatch = useAppDispatch();

    const { loading } = useAppSelector(state => state?.categories)

    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);


    const selectExercise = (id: string) => {
        setSelectedExerciseIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(itemId => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });
        dispatch(toggleExerciseSelected(id)); // Local state update
        dispatch(selectExerciseById({ userId: user?.id, exerciseId: id })); // Sync with Firebase
    };
    console.log("category", category?.exercises)
    if (!category) {
        return (
            null
        );
    }

    // if (!category) {
    //     return (
    //         <div className={cl.warning}>
    //             <div style={{ width: "320px" }}>
    //                 {/* <PeopleIcon /> */}
    //             </div>
    //             <h1 className={cl.warning__title}>Выберите категорию</h1>
    //         </div>
    //     );
    // }

    const exercises = exercises__all ? exercise__search : category?.exercises;

    return (
        <>
            <ExerciseCreateForm />
            <ul className={cl.exercises__group}>
                <ExerciseFromCategory
                    exercises={exercises}
                    selectExercise={selectExercise}
                    selectExerciseId={selectedExerciseIds}
                />
            </ul>
        </>
    );
};
