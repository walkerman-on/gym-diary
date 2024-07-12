import React, { FC, useEffect, useState } from 'react';
import cl from "./Categories.module.scss"
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"
import { useSwipeable } from 'react-swipeable';
import { useNavigate } from 'react-router-dom';
import { getAddExerciseofCategory } from 'app/providers/router';
import { Category } from 'entities/category';
import { useAuth } from 'features/auth/hooks/useAuth';
import { fetchExercisesCategory } from 'features/categories/api/fetchExercisesCategory';
import { fetchExercisesByCategoryId } from 'features/categories/api/fetchExercisesByCategoryId';

interface IExercisesCategory { }

export const Categories: FC<IExercisesCategory> = () => {
    const { user } = useAuth()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchExercisesCategory())
    }, [dispatch])

    const { categories } = useAppSelector(state => state?.exercisesCategory)
    // const categoryURL: string[] = theme === Theme.LIGHT ? categories?.map(item => item?.imageDarkURL) : categories?.map(item => item?.imageLightURL);

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
        <ul {...swipeHandlers} className={cl.category__list}>
            <Category categories={categories} handleClick={handleClick} selectedCategoryId={selectedCategoryId} />
        </ul>
    );
};

