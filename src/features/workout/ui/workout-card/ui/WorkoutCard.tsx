import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FC } from "react";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { deleteWorkout, IExerciseWorkout } from "features/workout";
import { ExerciseInWorkoutInfo } from "entities/exercise/exercise-in-workout-info";
import cl from "./WorkoutCard.module.scss";

interface IWorkoutCard {
  exercises: IExerciseWorkout[],
  date: string
}

export const WorkoutCard: FC<IWorkoutCard> = ({ exercises, date }) => {
  const dispatch = useAppDispatch();

  const deleteExercise = (exerciseID: string) => {
    dispatch(deleteWorkout({ exerciseID: exerciseID, date: date }));
  };

  return (
    <ul className={cl.workout_card}>
      {exercises.map(exercise => (
        <li key={exercise.exercise.id} className={cl.exercise}>
          <ExerciseInWorkout exercise={exercise.exercise} />
          <ExerciseInWorkoutInfo exersiceID={exercise.exercise.id} />
        </li>
      ))}
    </ul>
  );
};
