import { FC, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import cl from "./ExerciseInWorkout.module.scss";
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import TrashIcon from 'shared/assets/icons/TrashIcon';
import { IExercise } from 'features/exercises';

interface IExerciseInWorkout {
  exercise: IExercise;
  onDelete?: () => void; // Добавляем пропс для удаления
}

export const ExerciseInWorkout: FC<IExerciseInWorkout> = ({ exercise, onDelete }) => {
  const [swipeable, setSwipeable] = useState(false);
  const [infoVisible, setInfoVisible] = useState(false);

  const handlers = useSwipeable({
    onSwipedLeft: () => setSwipeable(true),
    onSwipedRight: () => setSwipeable(false),
    trackMouse: true,
  });

  const toggleInfo = () => {
    setInfoVisible(!infoVisible);
  };

  return (
    <div className={cl.exersise_item_wrapper}>
      {/* Контейнер для основной части с упражнением */}
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
      </div>

      {/* Иконка удаления, которая появляется при свайпе */}
      {swipeable && (
        <div className={cl.delete_icon} onClick={onDelete}>
          <TrashIcon color="var(--color-error)" />
        </div>
      )}
    </div>
  );
};
