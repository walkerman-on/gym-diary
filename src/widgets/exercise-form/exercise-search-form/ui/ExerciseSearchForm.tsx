import React, { FC, useState } from 'react';
import cl from "./ExerciseSearchForm.module.scss"
import { Input } from 'shared/ui/input';
import { getCreateExercise } from 'app/providers/router';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findExerciseByName } from 'features/exercises/api/findExerciseByName';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Link } from 'react-router-dom';
import { Button } from 'shared/ui/button';
import { User } from 'features/auth';


interface IExerciseSearchForm {
}

export const ExerciseSearchForm: FC<IExerciseSearchForm> = () => {
    const [exerciseName, setExerciseName] = useState<string>("")

    const dispatch = useAppDispatch()

    const findExerciseOnChange = (e: any) => {
        setExerciseName(e.target.value)
        dispatch(findExerciseByName({ exerciseName: e.target.value }))
    }

    return (
        <section className={cl.menu}>
            <Input
                placeholder="Искать"
                height='50px'
                value={exerciseName}
                onChange={(e) => findExerciseOnChange(e)}
            />
        </section>
    );
};