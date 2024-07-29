import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { getTraining } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Footer } from "widgets/footer";
import { ExercisesCard } from "widgets/exercises-card/exercises-card";
import { Layout } from "pages/layout";
import { useParams } from "react-router-dom";
import { useAuth } from "features/auth/hooks/useAuth";
import { Navigate } from 'react-router-dom';
import { getLogin } from 'app/providers/router';
import React from "react";


const AddExercisePage = () => {
    const { isAuth } = useAuth()
    return isAuth ?
        (
            <Layout>
                <ExerciseSearchForm />
                <ExercisesCard />
                <Footer link={getTraining()} text="Добавить в тренировку" />
            </Layout>
        )
        :
        (<Navigate to={getLogin()} />
        )
};

export default AddExercisePage


