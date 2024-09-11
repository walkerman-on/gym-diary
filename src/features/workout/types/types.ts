import { IExercise } from "features/exercises"

export interface IExerciseInfo {
    setID: number,
    reps: number,
    weight: number
}
export interface IExerciseWorkout {
    exercise: IExercise | null,
    sets: IExerciseInfo[]
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



