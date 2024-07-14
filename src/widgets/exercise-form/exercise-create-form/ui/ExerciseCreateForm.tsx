import React, { useState } from 'react';
import cl from "./ExerciseCreateForm.module.scss"
import { Input } from 'shared/ui/input';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { findExerciseByName } from 'features/exercises/api/findExerciseByName';
import { useAuth } from 'features/auth/hooks/useAuth';
import { Button } from 'shared/ui/button';
import { createExercise } from 'shared/helper/createExercise';

export const ExerciseCreateForm = () => {
    const { user } = useAuth();
    const [exerciseName, setExerciseName] = useState<string>("")


    const handleOnChange = (e: any) => {
        setExerciseName(e.target.value);
    };


    const createExerciseOnClick = async () => {
        createExercise("5HaVigAH", { name: exerciseName, userId: user.id });
        setExerciseName('');
    };

    return (
        <section className={cl.menu}>
            <Input
                placeholder='Создать упражнение'
                height='50px'
                value={exerciseName}
                onChange={handleOnChange}
            />
            <div>
                {exerciseName !== "" && (
                    <Button height='50px' radius='12px' style={{ flex: "1" }} onClick={createExerciseOnClick}>
                        Создать упражнение
                    </Button>
                )}
            </div>
        </section>
    );
};

