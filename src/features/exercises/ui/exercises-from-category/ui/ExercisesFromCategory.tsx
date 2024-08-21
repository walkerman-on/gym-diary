import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
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
import { deleteExerciseById } from 'features/exercises';
import { Loader } from 'shared/ui/loader';

interface IExercisesFromCategory {
    exercises__all?: boolean,
    categoryId: string
}
const MemoizedExerciseCreateForm = React.memo(ExerciseCreateForm);

export const ExercisesFromCategory: FC<IExercisesFromCategory> = ({ exercises__all, categoryId }) => {

    const category = useAppSelector(state => state.categories?.category__current);

    const { exercise__search } = useAppSelector(state => state?.exercises);
    const dispatch = useAppDispatch();

    const [deleteState, setDeleteState] = useState<boolean>(false)

    const valueOnChange = useCallback((value: boolean) => {
        setDeleteState(value)
    }, [setDeleteState])

    const [selectedExerciseIds, setSelectedExerciseIds] = useState<string[]>([]);

    const selectExercise = (id: string) => {
        setSelectedExerciseIds(prevIds => {
            if (prevIds.includes(id)) {
                return prevIds.filter(itemId => itemId !== id);
            } else {
                return [...prevIds, id];
            }
        });

        if (deleteState) {
            dispatch(deleteExerciseById({ exerciseID: id }));

        } else {
            dispatch(toggleExerciseSelected(id));
            // dispatch(selectExerciseById({ exerciseID: id }));
        }

    };

    if (!categoryId) {
        return (
            null
        );
    }

    const exercises = exercises__all ? exercise__search : category?.exercises;

    return (
        <>
            {/* <ExerciseCreateForm onValueChange={valueOnChange} /> */}
            <MemoizedExerciseCreateForm onValueChange={valueOnChange} />
            {
                exercises ?
                    <ul className={cl.exercises__group}>
                        <ExerciseFromCategory
                            exercises={exercises}
                            selectExercise={selectExercise}
                            selectExerciseId={selectedExerciseIds}
                            value={deleteState}
                        />
                    </ul>
                    :
                    <Loader />
            }
        </>
    );
};
