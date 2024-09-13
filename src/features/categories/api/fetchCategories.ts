import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, getDocs } from "shared/services/firebase";
import { IExerciseCategory } from "../types/types";

export const fetchCategories = createAsyncThunk<IExerciseCategory[], void, { rejectValue: string }>(
	"categories/fetchCategories",
	async (_, { rejectWithValue }) => {
		try {
			const querySnapshot = await getDocs(collection(db, "exercises-category"));
			const exercisesCategory = querySnapshot.docs.map(doc => {
				const { id, imageDarkURL, imageLightURL, title } = doc.data();
				return { id, imageDarkURL, imageLightURL, title } as IExerciseCategory;
			});

			if (querySnapshot.empty) {
				throw new Error("Server Error! Cannot GET categories");
			}
			return exercisesCategory;
		} catch (error: any) {
			return rejectWithValue(error.message);
		}
	}
);
