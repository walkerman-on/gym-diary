import React, { FC, useState } from 'react';
import cl from "./ExerciseCreateForm.module.scss";
import { Input } from 'shared/ui/input';
import classNames from 'classnames';
import MoreIcon from 'shared/assets/icons/MoreIcon';
import AddIcon from 'shared/assets/icons/AddIcon';
import { useParams } from 'react-router-dom';
import { createExerciseByCategoryId } from 'features/exercises';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import CloseIcon from 'shared/assets/icons/CloseIcon';

interface IExerciseCreateForm {
    onValueChange: (value: boolean) => void;
}

export const ExerciseCreateForm: FC<IExerciseCreateForm> = ({ onValueChange }) => {
    const [exerciseName, setExerciseName] = useState<string>("");
    const [isVisible, setIsVisible] = useState(false);

    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setExerciseName(e.target.value);
    };

    const { categoryId } = useParams();
    const dispatch = useAppDispatch();

    const createExerciseOnClick = () => {
        dispatch(createExerciseByCategoryId({ categoryID: categoryId, exerciseName: exerciseName }));
        setExerciseName('');
        setIsVisible(false);
        onValueChange(false);
    };

    const openFormClick = () => {
        setIsVisible(!isVisible);
        onValueChange(!isVisible);
    };

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
                    exerciseName === "" ? <CloseIcon onClick={openFormClick} /> : < AddIcon onClick={createExerciseOnClick} />
                    :
                    <MoreIcon onClick={openFormClick} />
            }
        </section>
    );
};
