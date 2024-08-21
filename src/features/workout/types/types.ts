import { IExercise } from "features/exercises"

export interface IExerciseWorkout {
    exercise: IExercise | null,
    sets: {
        id: number,
        reps: number,
        weight: number
    }[]
}

export interface IWorkout {
    date: string | null,
    exercises: IExerciseWorkout[] | []
}

export interface IWorkoutState {
    workout__current: IWorkout,
    loading: boolean,
    error: string | null,
}



