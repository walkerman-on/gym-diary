import React, { FC, useEffect, useState } from 'react';
import cl from "./Categories.module.scss"
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"
import { useSwipeable } from 'react-swipeable';
import { Category } from 'entities/category';
import { useAuth } from 'features/auth/hooks/useAuth';
import { fetchCategoryCurrent } from 'features/categories/api/fetchCategoryCurrent';
import { fetchCategories } from 'features/categories/api/fetchCategories';
import { getCategory } from 'app/providers/router';
import { useNavigate, useParams } from 'react-router-dom';

interface IExercisesCategory { }

export const Categories: FC<IExercisesCategory> = () => {
    const { user } = useAuth()

    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    const { categories, loading } = useAppSelector(state => state?.categories)
    // const categoryURL: string[] = theme === Theme.LIGHT ? categories?.map(item => item?.imageDarkURL) : categories?.map(item => item?.imageLightURL);

    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
    const navigate = useNavigate()

    const { categoryId } = useParams()

    useEffect(() => {
        dispatch(fetchCategoryCurrent({ categoryId, userId: user?.id }));
    }, [categoryId])

    const handleClick = (categoryId: string) => {
        setSelectedCategoryId(categoryId);
        navigate(getCategory(categoryId))
    };


    const swipeHandlers = useSwipeable({
        onSwipedLeft: () => console.log("Swiped left"),
        onSwipedRight: () => console.log("Swiped right"),
    });

    return (
        <>
            {

                <ul {...swipeHandlers} className={cl.category__list}>
                    <Category categories={categories} handleClick={handleClick} selectedCategoryId={categoryId} />
                </ul>
            }
        </>
    );
};

