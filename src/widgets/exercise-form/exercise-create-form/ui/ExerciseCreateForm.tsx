import React, { useState } from 'react';
import cl from "./ExerciseCreateForm.module.scss";
import { Input } from 'shared/ui/input';
import { useAuth } from 'features/auth/hooks/useAuth';
import classNames from 'classnames';
import MoreIcon from 'shared/assets/icons/MoreIcon';
import AddIcon from 'shared/assets/icons/AddIcon';
import { useParams } from 'react-router-dom';
import { createExercise } from 'features/exercises';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ExerciseCreateForm = () => {
    const { user } = useAuth();
    const [exerciseName, setExerciseName] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseName(e.target.value);
    };

    const { categoryId } = useParams()
    const dispatch = useAppDispatch()

    const createExerciseOnClick = async () => {
        setIsVisible(prev => !prev); // инвертируем состояние isVisible
        dispatch(createExercise({ exercisesCategoryID: categoryId, exerciseData: { name: exerciseName, userId: user.id } }));
        setExerciseName('');
    };

    const openFormClick = () => {
        setIsVisible(prev => !prev); // инвертируем состояние isVisible
    }

    return (
        <section className={cl.menu}>
            <div className={classNames(cl.element, { [cl.hidden]: !isVisible })}>
                <Input
                    placeholder='Создать упражнение'
                    height='50px'
                    value={exerciseName}
                    onChange={handleOnChange}
                />
            </div>
            {
                isVisible ?
                    <AddIcon onClick={createExerciseOnClick} />

                    :
                    <MoreIcon onClick={openFormClick} />

            }
        </section>
    );
};
