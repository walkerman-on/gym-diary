import React, { FC, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import cl from "./ExerciseSearchForm.module.scss";
import { Input } from 'shared/ui/input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findExerciseByName } from 'features/exercises/api/findExerciseByName';
import { getAddExercise, getExercisesBySearch } from 'app/providers/router';

interface IExerciseSearchForm { }

export const ExerciseSearchForm: FC<IExerciseSearchForm> = React.memo(() => {
    const [exerciseName, setExerciseName] = useState<string>("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const findExerciseOnChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseName(e.target.value);
        dispatch(findExerciseByName({ exerciseName: e.target.value }));
    }, [setExerciseName, findExerciseByName])

    const handleFocus = useCallback(() => {
        navigate(getExercisesBySearch());
    }, [])

    const handleBlur = useCallback(() => {
        navigate(getAddExercise());
    }, [])

    return (
        <section className={cl.menu}>
            <Input
                placeholder="Искать"
                height='50px'
                value={exerciseName}
                onChange={findExerciseOnChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
            />
        </section>
    );
});
