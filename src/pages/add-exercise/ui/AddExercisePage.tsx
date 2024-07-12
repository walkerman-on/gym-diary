import cl from "./AddExercisePage.module.scss"
import classNames from 'classnames';
import { useTheme } from 'app/providers/ThemeProvider';
import { getTraining } from 'app/providers/router';
import { ExerciseForm } from 'widgets/exercise-form';
import { Footer } from "widgets/footer";
import { ExercisesCard } from "widgets/exercises-card/exercises-card";

export const AddExercisePage = () => {
    const { theme } = useTheme();

    return (
        <main className={classNames("app", cl.AddExercisePage, {}, [theme])}>
            <ExerciseForm />
            <ExercisesCard />
            <Footer link={getTraining()} text="Добавить в тренировку" />
        </main>);
};

