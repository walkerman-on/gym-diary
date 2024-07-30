import React, { FC, useState } from 'react';
import cl from "./ExerciseSearchForm.module.scss"
import { Input } from 'shared/ui/input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findExerciseByName } from 'features/exercises/api/findExerciseByName';

interface IExerciseSearchForm {
}

export const ExerciseSearchForm: FC<IExerciseSearchForm> = React.memo(() => {
    const [exerciseName, setExerciseName] = useState<string>("")

    const dispatch = useAppDispatch()

    const findExerciseOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseName(e.target.value)
        dispatch(findExerciseByName({ exerciseName: e.target.value }))
    }

    return (
        <section className={cl.menu}>
            <Input
                placeholder="Искать"
                height='50px'
                value={exerciseName}
                onChange={findExerciseOnChange}
            />
        </section>
    );
});
