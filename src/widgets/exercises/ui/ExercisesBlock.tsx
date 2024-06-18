import cl from "./ExercisesBlock.module.scss"
import { Exercise } from 'widgets/exercise/ui/Exercise';

export const ExercisesBlock = () => {
    return (
      <ul className={cl.exersisesBlock}>
          <Exercise />
      </ul>
    );
};

