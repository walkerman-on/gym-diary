import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "shared/services/firebase/firebase";
import { IExerciseCategory } from "../types/types";
import { IExercise } from "features/exercises";

export const fetchCategoryCurrent = createAsyncThunk<IExerciseCategory, { categoryId: string, userId: string }, { rejectValue: string }>(
	"fetchCategoryCurrent",
	async ({ categoryId, userId }, { rejectWithValue }) => {
		try {

			const categoriesCollectionRef = collection(db, 'exercises-category');
			const categoryQuery = query(categoriesCollectionRef, where('id', '==', categoryId));
			const categorySnapshot = await getDocs(categoryQuery);
			const categoryData = categorySnapshot.docs[0].data() as IExerciseCategory;

			// Получаем упражнения, относящиеся к данной категории
			const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);
			const exercisesQuery = query(exercisesCollectionRef, where('categoryId', '==', categoryId));
			const exercisesSnapshot = await getDocs(exercisesQuery);

			const exercises: IExercise[] = exercisesSnapshot.docs.map(doc => ({
				id: doc.id,
				name: doc.data().name,
				categoryId: doc.data().categoryId,
				selected: doc.data().selected
			}));
			const exerciseCategory: IExerciseCategory = {
				...categoryData,
				exercises
			};

			return exerciseCategory;
		} catch (error) {
			return rejectWithValue(error.message)
		}
	}
);
