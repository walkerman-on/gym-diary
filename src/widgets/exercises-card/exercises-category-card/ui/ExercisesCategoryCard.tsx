import React from 'react';
import cl from "./ExercisesCategoryCard.module.scss";
import { ExercisesFromCategory } from 'features/exercises/ui/exercises-from-category';
import { useParams } from 'react-router-dom';

interface ExercisesCategoryCardProps {
}

export const ExercisesCategoryCard: React.FC<ExercisesCategoryCardProps> = () => {
    const { categoryId } = useParams();

    return (
        categoryId ?
            <section className={cl.categories} >
                <ExercisesFromCategory categoryId={categoryId} />
            </section >
            :
            <h1 className={cl.info}>Выбери категорию или введи упражнение в поле поиска</h1>
    )
}

