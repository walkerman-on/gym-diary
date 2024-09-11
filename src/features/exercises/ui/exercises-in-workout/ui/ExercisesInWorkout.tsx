import cl from "./ExercisesInWorkout.module.scss";
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, FC } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { Loader } from "shared/ui/loader";
import { fetchWorkout } from "features/workout";
import { useParams } from "react-router-dom";
import { IExerciseWorkout } from "features/workout"; // Убедитесь, что у вас есть этот импорт

export const ExercisesInWorkout: FC = () => {
  const dispatch = useAppDispatch();
  const { loading, workout__current } = useAppSelector(state => state.workout);
  const exercises = workout__current?.exercises || [];
  const { date } = useParams<{ date: string }>();

  useEffect(() => {
    if (date) {
      dispatch(fetchWorkout({ date }));
    }
  }, [date, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (exercises.length === 0) {
    return <h1>Упражнения не найдены.</h1>;
  }

  // Предполагается, что ExerciseInWorkout ожидает один IExercise, выбираем первое упражнение
  const firstExercise = exercises[0]?.exercise;

  return (
    <div className={cl.exercisesInWorkout}>
      {firstExercise ? (
        <ExerciseInWorkout exercise={firstExercise} />
      ) : (
        <h1>Упражнение не найдено.</h1>
      )}
    </div>
  );
};
