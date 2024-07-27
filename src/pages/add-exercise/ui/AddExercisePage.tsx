import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { getTraining } from 'app/providers/router';
import { ExerciseSearchForm } from 'widgets/exercise-form/exercise-search-form';
import { Footer } from "widgets/footer";
import { ExercisesCard } from "widgets/exercises-card/exercises-card";
import { Layout } from "pages/layout";

const AddExercisePage = () => {
    const { theme } = useTheme();

    return (
        <Layout>
            <ExerciseSearchForm />
            <ExercisesCard />
            <Footer link={getTraining()} text="Добавить в тренировку" />
        </Layout>
    );
};

export default AddExercisePage


