import React, { FC, useEffect } from 'react';
import cl from "./ExercisesCategory.module.scss"
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesCategory } from 'entities/exercisesCategory';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"
import { useNavigate } from 'react-router-dom';
import { getAddExerciseofCategory, getCreateExerciseofCategory } from 'app/providers/router';
import { useSwipeable } from 'react-swipeable';

interface IExercisesCategory {
    createExercise?: boolean,
}

export const ExercisesCategory: FC<IExercisesCategory> = ({ createExercise }) => {
    const { theme } = useTheme()

    const dispatch = useAppDispatch()
    const { loading } = useAppSelector(state => state.exercisesCategory)
    const { categories } = useAppSelector(state => state?.exercisesCategory)
    const categoryURL: string[] = theme === Theme.LIGHT ? categories?.map(item => item?.imageDarkURL) : categories?.map(item => item?.imageLightURL);

    const navigate = useNavigate()
    const handleClick = (categoryId: string) => {
        // const link = createExercise ? getCreateExerciseofCategory(categoryId) : getAddExerciseofCategory(categoryId)
        // navigate(link)
    }

    useEffect(() => {
        dispatch(fetchExercisesCategory())
    }, [])

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => console.log("Swiped left"),
        onSwipedRight: () => console.log("Swiped right"),
    });

    return (
        <>
            {
                loading ? <h1 className={cl.loading}>Загрузка...</h1>
                    :
                    <ul  {...swipeHandlers} className={cl.swipeContainer}>
                        {
                            categories?.map(item => (
                                <li className={cl.category} key={item?.id} onClick={() => handleClick(item?.id)}>
                                    <span className={cl.title}>{item?.title}</span>
                                </li>
                            ))
                        }
                    </ul>
            }
        </>
    );
};
