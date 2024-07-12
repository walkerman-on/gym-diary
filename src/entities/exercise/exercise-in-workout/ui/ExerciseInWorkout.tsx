import { FC, useState } from 'react';
import cl from "./ExerciseInWorkout.module.scss"
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { IExercise } from 'features/exercises';

interface IExerciseInWorkout {
  exercises: IExercise[],
}

export const ExerciseInWorkout: FC<IExerciseInWorkout> = ({ exercises }) => {
  const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleWorkoutMenu = () => {
    setCollapsed(prevState => !prevState);
  };

  return (
    <>
      {
        exercises?.map(item => (
          <li className={cl.exersise_item} onClick={toggleWorkoutMenu} key={item?.id}>
            <p className={cl.info}>
              <DarkThemeIcon />
              <h2 className={cl.title}>{item?.name}</h2>
            </p>
            {collapsed ? <ArrowDownIcon /> : <ArrowUpIcon />}
          </li>
        ))
      }
    </>
  );
};
