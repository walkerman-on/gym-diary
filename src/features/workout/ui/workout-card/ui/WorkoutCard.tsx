import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, Suspense } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { ExerciseInWorkout } from "entities/exercise/exercise-in-workout";
import { Loader } from "shared/ui/loader";
import { fetchWorkout } from "features/workout";
import { useParams } from "react-router-dom";
import { ExerciseInWorkoutInfo } from "entities/exercise/exercise-in-workout-info";
import cl from "./WorkoutCard.module.scss"

export const WorkoutCard = () => {
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
            <>
              <li className={cl.workout_card}>
                <ExerciseInWorkout exercises={exercises} />
              </li>
            </>
            :
            <h1>Упржанения не добавлены в тренировку, добавьте!</h1>
      }
    </>
  );
};

