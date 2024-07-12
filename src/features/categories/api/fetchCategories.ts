import { createAsyncThunk } from "@reduxjs/toolkit"
import { collection, getDocs } from "firebase/firestore";
import { db } from "shared/services/firebase/firebase";
import { IExerciseCategory } from "../types/types";

export const fetchCategories = createAsyncThunk<IExerciseCategory[], void, { rejectValue: string }>(
	"fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const querySnapshot = await getDocs(collection(db, "exercises-category"));
			const exercisesCategory = querySnapshot.docs.map(doc => {
				const { id, imageDarkURL, imageLightURL, title } = doc.data();
				return { id, imageDarkURL, imageLightURL, title } as IExerciseCategory;
			});

			if (querySnapshot.empty) {
				throw new Error("Server Error! Can not GET category")
			}
			return exercisesCategory
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
)
