import React, { Suspense, useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import cl from "./CategoryExercisePage.module.scss"
import ArrowLeftIcon from 'shared/assets/icons/ArrowLeftIcon';
import { useNavigate } from 'react-router-dom';
import { getAddExercise, getTraining } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Layout } from 'pages/layout';
import { ExercisesCard } from 'widgets/exercises-card/exercises-card';
import { Footer } from 'widgets/footer';

const CategoryExercisePage = () => {

    const { theme } = useTheme();
    const navigate = useNavigate();

    const handleOnClick = () => {
        // navigate(getAddExercise());
    };

    return (
        <Layout>
            {/* <ExerciseSearchForm />
            <ExercisesCard />
            <div className={cl.footer}>
                <ArrowLeftIcon onClick={handleOnClick} />
            </div> */}
            <ExerciseSearchForm />
            <ExercisesCard />
            <Footer link={getTraining()} text="Добавить в тренировку" />
        </Layout>)
};

export default CategoryExercisePage
