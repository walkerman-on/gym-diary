import React, { FC, useEffect } from 'react';
import cl from "./ExercisesCategory.module.scss"
import ArrowRightIcon from 'shared/assets/icons/ArrowRightIcon';
import { useAppDispatch } from 'shared/lib/hooks/useAppDispatch/useAppDispatch';
import { fetchExercisesCategory, fetchExercisesCategoryById } from 'entities/exercisesCategory';
import { useAppSelector } from 'shared/lib/hooks/useAppSelector/useAppSelector';
import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from "app/providers/ThemeProvider/lib/ThemeContext"
import { useNavigate, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { getAddExercise, getAddExerciseofCategory, getCreateExerciseofCategory } from 'app/providers/router';

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
        const link = createExercise ? getCreateExerciseofCategory(categoryId) : getAddExerciseofCategory(categoryId)
        navigate(link)
    }

    useEffect(() => {
        dispatch(fetchExercisesCategory())
    }, [])

    return (
        <>
            {
                loading ? <h1 className={cl.loading}>Загрузка...</h1>
                    :
                    <ul className={cl.exercises}>
                        {
                            categories?.map(item => (
                                <li className={cl.exerciseItem} key={item?.id} onClick={() => handleClick(item?.id)}>
                                    <div className={cl.exercise}>
                                        <div className={cl.scheme} style={{ backgroundImage: `url("https://via.placeholder.com/500")` }}>dd</div>
                                        <span className={cl.categoryName}>{item?.title}</span>
                                    </div>
                                    <div className={cl.exerciseMore}>
                                        <span className={cl.exerciseCount}>5</span>
                                        <ArrowRightIcon />
                                    </div>
                                </li>
                            ))

                        }
                    </ul>
            }
        </>

    );
};
