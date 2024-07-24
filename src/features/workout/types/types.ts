import { IExercise } from "features/exercises"

export interface IExerciseWorkout {
    exercise: IExercise[] | null,
    sets: {
        reps: number | null,
        weight: number | null
    } | null
}

export interface IWorkout {
    data: string | null,
    exercises: IExerciseWorkout[]
}

export interface IWorkoutState {
    workout__current: IWorkout | null,
    loading: boolean,
    error: string | null,
}



