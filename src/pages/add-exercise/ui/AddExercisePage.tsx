import { getTraining } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Footer } from "widgets/footer";
import { ExercisesCard } from "widgets/exercises-card/exercises-card";
import { Layout } from "pages/layout";
import { useAuth } from "features/auth/hooks/useAuth";
import { Navigate } from 'react-router-dom';
import { getLogin } from 'app/providers/router';

export const AddExercisePage = () => {
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


