import cl from "./ExercisesBlock.module.scss"
import { Exercise } from "widgets/exerciseTraining"

export const ExercisesBlock = () => {
  return (
    <ul className={cl.exersisesBlock}>
      <Exercise />
    </ul>
  );
};

