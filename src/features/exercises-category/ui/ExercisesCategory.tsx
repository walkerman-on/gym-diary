import React, { FC, useEffect, useState } from 'react';
import cl from "./ExercisesCategory.module.scss"
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesByCategoryId, fetchExercisesCategory } from 'entities/exercisesCategory';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"
import { useSwipeable } from 'react-swipeable';
import { useAuth } from 'entities/Auth/hooks/useAuth';

interface IExercisesCategory { }

export const ExercisesCategory: FC<IExercisesCategory> = () => {
    const { theme } = useTheme()
    const { user } = useAuth()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchExercisesCategory())
    }, [dispatch])

    const { loading } = useAppSelector(state => state.exercisesCategory)
    const { categories } = useAppSelector(state => state?.exercisesCategory)
    const categoryURL: string[] = theme === Theme.LIGHT ? categories?.map(item => item?.imageDarkURL) : categories?.map(item => item?.imageLightURL);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

    const handleClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        dispatch(fetchExercisesByCategoryId({ categoryId, userId: user?.id }));
    };

    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => console.log("Swiped left"),
        onSwipedRight: () => console.log("Swiped right"),
    });

    return (
        <>

            <ul {...swipeHandlers} className={cl.category__list}>
                {categories?.map(item => (
                    <li
                        className={`${cl.category__item} ${item.id === selectedCategoryId ? cl.category__current : ''}`}
                        key={item?.id}
                        onClick={() => handleClick(item?.id)}
                    >
                        <span className={cl.title}>{item?.title}</span>
                    </li>
                ))}
            </ul>
        </>
    );
};

