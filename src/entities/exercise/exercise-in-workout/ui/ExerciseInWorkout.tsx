import { FC, useState } from 'react';
import cl from "./ExerciseInWorkout.module.scss"
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { IExercise } from 'features/exercises';
import { addSetAndWeightInWorkout, IExerciseWorkout } from 'features/workout';
import { ExerciseInWorkoutInfo } from 'entities/exercise/exercise-in-workout-info';
import { useAppDispatch } from 'shared/lib/hooks';

interface IExerciseInWorkout {
  exercises: IExerciseWorkout[],
}

export const ExerciseInWorkout: FC<IExerciseInWorkout> = ({ exercises }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);
  const dispatch = useAppDispatch()

  const toggleWorkoutMenu = () => {
    setCollapsed(prevState => !prevState);
    dispatch(addSetAndWeightInWorkout({ date: "2024-09-06", exerciseID: "m088aeya", info: { id: 1, reps: 12, weight: 20 } }))
  };

  return (
    <>
      {
        exercises?.map(item => (
          <div className={cl.exercise}>
            <div className={cl.exersise_item} onClick={toggleWorkoutMenu} key={item?.exercise.id}>
              <p className={cl.info}>
                <DarkThemeIcon />
                <h2 className={cl.title}>{item?.exercise.name}</h2>
              </p>
              {collapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
            </div>
            <ExerciseInWorkoutInfo />
          </div>
        ))
      }
    </>
  );
};
