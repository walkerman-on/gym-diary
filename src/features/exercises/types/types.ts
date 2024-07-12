export interface IExercisesCategoryState {
    error: string | null,
    loading: boolean,
    exercises: IExercise[] | null,
    selectedExercises: IExercise[] | null
}

export interface IExercise {
    id: string,
    name: string,
    categoryId: string,
    selected: boolean | false
}


