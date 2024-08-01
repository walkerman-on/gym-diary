import cl from "./ExercisesInWorkout.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, Suspense } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { useAuth } from "features/auth/hooks/useAuth";
import { fetchSelectedExercises } from "features/exercises/api/fetchSelectedExercises";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { Loader } from "shared/ui/loader";

export const ExercisesInWorkout = () => {
  const { user } = useAuth()

  const dispatch = useAppDispatch()

  const { exercises__selected, loading } = useAppSelector(state => state?.exercises)
  useEffect(() => {
    dispatch(fetchSelectedExercises())
  }, [])

  return (
    <>
      {
        loading ? <Loader />
          :
          exercises__selected ?
            <ul className={cl.exersises__list}>
              <ExerciseInWorkout exercises={exercises__selected} />
            </ul>
            :
            <h1>Упржанения не добавлены в тренировку, добавьте!</h1>
      }
    </>
  );
};

