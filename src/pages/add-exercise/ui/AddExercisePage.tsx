import { getDate, getTraining } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Footer } from "widgets/footer";
import { ExercisesCard } from "widgets/exercises-card/exercises-card";
import { Layout } from "pages/layout";
import { useAuth } from "features/auth/hooks/useAuth";
import { Navigate, Outlet } from 'react-router-dom';
import { getLogin } from 'app/providers/router';
import { CategoriesCard } from 'widgets/categories-card';
import React from 'react';


export const AddExercisePage = React.memo(() => {
    return (
        <Layout>
            <ExerciseSearchForm />
            <Outlet />
            <Footer link={getDate()} text="Добавить в тренировку" />
        </Layout>
    );
});



