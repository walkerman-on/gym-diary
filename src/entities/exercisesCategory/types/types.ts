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
    currentCategory: IExerciseCategory | null,
}

export interface IExercise {
    id: string,
    name: string,
    categoryId: string
}


