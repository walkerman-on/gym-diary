import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { FC } from "react";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { addSetInWorkout, deleteWorkout, IExerciseInfo, IExerciseWorkout } from "features/workout";
import { ExerciseInWorkoutInfo } from "entities/exercise/exercise-in-workout-info";
import cl from "./WorkoutCard.module.scss";
import { DropDownMenu } from "shared/ui/drop-down-menu";

interface IWorkoutCard {
  exercises: IExerciseWorkout[];
  date: string;
}

export const WorkoutCard: FC<IWorkoutCard> = ({ exercises, date }) => {
  const dispatch = useAppDispatch();

  const deleteExercise = (exerciseID: string) => {
    dispatch(deleteWorkout({ exerciseID: exerciseID, date: date }));
  };

  const addInfoToServer = (exersiceID: string, info: IExerciseInfo) => {
    dispatch(addSetInWorkout({ date: date, exerciseID: exersiceID, info: info }));
  }

  return (
    <ul className={cl.workout_card}>
      {exercises.map(exercise => (
        <li key={exercise.exercise.id}>
          <DropDownMenu
            title={<ExerciseInWorkout exercise={exercise.exercise} />}
            content={
              <ExerciseInWorkoutInfo
                exersiceID={exercise.exercise.id}
                set={exercise.sets}
                addInfoToServer={addInfoToServer}
              />
            }
          />
        </li>
      ))}
    </ul>
  );
};
