export interface IExercise {
    id: string,
    name: string,
    categoryId: string,
    selected: boolean | false,
    imageDarkURL?: string,
    imageLightURL?: string,
}

export interface IExercisesCategoryState {
    error: string | null,
    loading: boolean,
    exercise__search: IExercise[] | null,
    exercises__selected: IExercise[] | null
}


