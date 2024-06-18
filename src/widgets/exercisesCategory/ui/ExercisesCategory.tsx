import React, { useEffect } from 'react';
import cl from "./ExercisesCategory.module.scss"
import ArrowRightIcon from 'shared/assets/icons/ArrowRightIcon';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesCategory } from 'entities/exercisesCategory';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"

export const ExercisesCategory = () => {
    const { theme } = useTheme()

    const dispatch = useAppDispatch()
    const { categories } = useAppSelector(state => state?.exercisesCategory)
    const categoryURL: string[] = theme === Theme.LIGHT ? categories?.map(item => item?.imageDarkURL) : categories?.map(item => item?.imageLightURL);

    console.log("categoryURL", categoryURL)
    useEffect(() => {
        dispatch(fetchExercisesCategory())
    }, [])

    return (
        <ul className={cl.exercises}>
            {
                categories?.map(item => (
                    <li className={cl.exerciseItem} key={item?.id}>
                        <div className={cl.exercise}>
                            <div className={cl.scheme} style={{ backgroundImage: `url("https://via.placeholder.com/500")` }}>dd</div>

                            <span>{item?.title}</span>
                        </div>
                        <div className={cl.exerciseMore}>
                            <span className={cl.exerciseCount}>5</span>
                            <ArrowRightIcon />
                        </div>
                    </li>
                ))

            }
        </ul>
    );
};
