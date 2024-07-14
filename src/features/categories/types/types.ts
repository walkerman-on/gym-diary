import { IExercise } from "features/exercises";

export interface IExerciseCategory {
    id: string,
    imageDarkURL: string,
    imageLightURL: string,
    title: string,
    exercises: IExercise[]
}

export interface IExercisesCategoryState {
    categories: IExerciseCategory[],
    error: string | null,
    loading: boolean,
    category__current: IExerciseCategory | null,
}



