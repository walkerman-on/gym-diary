import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import cl from "./Categories.module.scss"
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/theme-provider';
import { Theme } from "app/providers/theme-provider/lib/ThemeContext"
import { Category } from 'entities/category';
import { fetchCategoryCurrent } from 'features/categories/api/fetchCategoryCurrent';
import { fetchCategories } from 'features/categories/api/fetchCategories';
import { getCategory } from 'app/providers/router';
import { useNavigate, useParams } from 'react-router-dom';
import { Skeleton } from 'shared/ui/skeleton';

interface IExercisesCategory { }

export const Categories: FC<IExercisesCategory> = React.memo(() => {
    const dispatch = useAppDispatch();
    const { categories, loading } = useAppSelector(state => state?.categories);
    const { categoryId } = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        dispatch(fetchCategories());
    }, []);


    useEffect(() => {
        if (categoryId) {
            dispatch(fetchCategoryCurrent({ categoryID: categoryId }));
        }
    }, [categoryId]);

    const handleClick = useCallback((categoryId: string) => {
        navigate(getCategory(categoryId));
    }, [categoryId]);

    return (

        <ul className={cl.category__list} >
            {
                loading ?
                    <Skeleton height={58} count={4} width={100} />
                    :
                    <Category categories={categories} handleClick={handleClick} selectedCategoryId={categoryId} />
            }
        </ul >


    );
});
