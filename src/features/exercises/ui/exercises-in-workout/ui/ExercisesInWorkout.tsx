import cl from "./ExercisesInWorkout.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { useAuth } from "features/auth/hooks/useAuth";
import { fetchSelectedExercises } from "features/exercises/api/fetchSelectedExercises";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";

export const ExercisesInWorkout = () => {
  const { user } = useAuth()

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(fetchSelectedExercises({ userId: user?.id }))
  }, [])

  const { selectedExercises } = useAppSelector(state => state?.exercises)
  return (
    <ul className={cl.exersises__list}>
      <ExerciseInWorkout exercises={selectedExercises} />
    </ul>
  );
};

