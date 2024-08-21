import cl from "./ExercisesInWorkout.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, Suspense } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { useAuth } from "features/auth/hooks/useAuth";
import { fetchSelectedExercises } from "features/exercises/api/fetchSelectedExercises";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { Loader } from "shared/ui/loader";
import { fetchWorkout } from "features/workout";

export const ExercisesInWorkout = () => {
  const dispatch = useAppDispatch()

  const { loading, workout__current } = useAppSelector(state => state.workout)
  const exercises = workout__current?.exercises
  useEffect(() => {
    dispatch(fetchWorkout({ date: "2024-08-22" }))
  }, [])

  return (
    <>
      {
        loading ? <Loader />
          :
          exercises.length > 0 ?
            <ul className={cl.exersises__list}>
              <ExerciseInWorkout exercises={exercises} />
            </ul>
            :
            <h1>Упржанения не добавлены в тренировку, добавьте!</h1>
      }
    </>
  );
};

