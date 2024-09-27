import { getDate } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Footer } from "widgets/footer";
import { Layout } from "pages/layout";
import { Outlet } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from 'shared/lib/hooks';


export const AddExercisePage = React.memo(() => {
    const { date, exercises } = useAppSelector(state => state.workout.workout__current)

    return (
        <>
            <ExerciseSearchForm />
            <Outlet />
            <Footer link={getDate(date)} text='Добавить упражнения' />
        </>
    );
});



