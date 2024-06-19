import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "shared/services/firebase/firebase";
import { IExerciseCategory } from "../types/types";

export const fetchExercisesCategoryById = createAsyncThunk<IExerciseCategory, string, { rejectValue: string }>(
	"fetchExercisesCategoryById",
	async (categoryId, { rejectWithValue }) => {
		try {
			const categoriesCollectionRef = collection(db, 'exercises-category');
			const categoryQuery = query(categoriesCollectionRef, where('id', '==', categoryId));
			const querySnapshot = await getDocs(categoryQuery);

			if (!querySnapshot.empty) {
				const categoryData = querySnapshot.docs[0].data() as IExerciseCategory
				return categoryData;
			} else {
				throw new Error("Server Error! Can not GET facility")
			}

		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)
