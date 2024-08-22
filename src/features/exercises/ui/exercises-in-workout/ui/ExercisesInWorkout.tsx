import cl from "./ExercisesInWorkout.module.scss"
import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, Suspense } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { Loader } from "shared/ui/loader";
import { fetchWorkout } from "features/workout";
import { useParams } from "react-router-dom";

export const ExercisesInWorkout = () => {
  const dispatch = useAppDispatch()

  const { loading, workout__current } = useAppSelector(state => state.workout)
  const exercises = workout__current?.exercises

  const { date } = useParams()

  useEffect(() => {
    dispatch(fetchWorkout({ date: date }))
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

