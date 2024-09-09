import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import cl from "./ExerciseInWorkout.module.scss";
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import TrashIcon from 'shared/assets/icons/TrashIcon';
import { IExerciseWorkout } from 'features/workout';
import { useAppDispatch } from 'shared/lib/hooks';
import { deleteWorkout } from 'features/workout';
import { ExerciseInWorkoutInfo } from 'entities/exercise/exercise-in-workout-info';

interface IExerciseInWorkout {
  exercises: IExerciseWorkout[],
}

export const ExerciseInWorkout: FC<IExerciseInWorkout> = ({ exercises }) => {
  const dispatch = useAppDispatch();

  const deleteExercise = (exerciseID: string) => {
    dispatch(deleteWorkout({ date: "2024-09-09", exerciseID: exerciseID }));
  };

  return (
    <>
      {
        exercises?.map(item => {
          const [swipeable, setSwipeable] = useState(false);
          const [infoVisible, setInfoVisible] = useState(false); // Add state for visibility

          const handlers = useSwipeable({
            onSwipedLeft: () => setSwipeable(true),
            onSwipedRight: () => setSwipeable(false),
            trackMouse: true,
          });

          const toggleInfo = () => {
            setInfoVisible(!infoVisible);
          };

          return (
            <section className={cl.exercise} key={item?.exercise.id} >
              <div
                className={`${cl.exersise_item} ${swipeable ? cl.swiped : ''}`}
                onClick={toggleInfo}
                {...handlers}
              >
                <div className={cl.info}>
                  <DarkThemeIcon />
                  <h2 className={cl.title}>{item?.exercise.name}</h2>
                </div>
                {swipeable ? (
                  <div className={cl.delete_icon} onClick={() => deleteExercise(item?.exercise.id)}>
                    <TrashIcon color='var(--color-bg)' />
                  </div>
                ) : (
                  <>
                    {infoVisible ? <ArrowUpIcon /> : <ArrowDownIcon />}
                  </>
                )}
              </div>
              {infoVisible && <ExerciseInWorkoutInfo exersiceID={item?.exercise.id} />}
            </section>
          );
        })
      }
    </>
  );
};
