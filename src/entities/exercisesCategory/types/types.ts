export interface IExerciseCategory {
    id: string,
    imageDarkURL: string,
    imageLightURL: string,
    title: string
}

export interface IExercisesCategoryState {
    categories: IExerciseCategory[],
    error: string | null,
    loading: boolean,
    currentCategory: IExerciseCategory,
}


