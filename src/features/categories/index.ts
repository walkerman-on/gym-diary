export * from "./types/types"
export { default as categoriesReducer } from "./model/slice/categoriesSlice"

export { fetchCategories } from "./api/fetchCategories"
export { fetchCategoryCurrent } from "./api/fetchCategoryCurrent"