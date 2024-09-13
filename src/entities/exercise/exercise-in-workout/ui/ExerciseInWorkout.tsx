import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import cl from "./ExerciseInWorkout.module.scss";
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { IExercise } from 'features/exercises';
import TrashIcon from 'shared/assets/icons/TrashIcon';

interface IExerciseInWorkout {
  exercise: IExercise,
}

export const ExerciseInWorkout: FC<IExerciseInWorkout> = ({ exercise }) => {
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
    <div
      className={`${cl.exersise_item} ${swipeable ? cl.swiped : ''}`}
      onClick={toggleInfo}
      {...handlers}
    >
      <div className={cl.info}>
        <img src={exercise?.imageLightURL} alt="Description" className={cl.scheme} />
        <h2 className={cl.title}>{exercise?.name}</h2>
      </div>
      {infoVisible ? <ArrowUpIcon /> : <ArrowDownIcon />}
      {/* <div className={cl.delete_icon}>
        <TrashIcon color='var(--color-bg)' />
      </div> */}
    </div>
  );
};
