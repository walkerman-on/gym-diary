import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "shared/services/firebase/firebase";
import { IExerciseCategory } from "../types/types";
import { IExercise } from "features/exercises";
import { RootState } from "app/providers/StoreProvider"; // Проверьте корректность пути

interface CategoryCurrentArgs {
	categoryID: string;
}

export const fetchCategoryCurrent = createAsyncThunk<
	IExerciseCategory, // Тип возвращаемых данных
	CategoryCurrentArgs, // Тип аргументов функции
	{ rejectValue: string } // Тип для rejectWithValue
>(
	"fetchCategoryCurrent",
	async ({ categoryID }, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.user?.id; // Adjust according to your state shape

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			// Получаем данные категории
			const categoriesCollectionRef = collection(db, 'exercises-category');
			const categoryQuery = query(categoriesCollectionRef, where('id', '==', categoryID));
			const categorySnapshot = await getDocs(categoryQuery);

			if (categorySnapshot.empty) {
				return rejectWithValue('Category not found');
			}

			const categoryData = categorySnapshot.docs[0].data() as IExerciseCategory;

			// Получаем упражнения, относящиеся к данной категории
			const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);
			const exercisesQuery = query(exercisesCollectionRef, where('categoryId', '==', categoryID));
			const exercisesSnapshot = await getDocs(exercisesQuery);

			const exercises: IExercise[] = exercisesSnapshot.docs.map(doc => ({
				id: doc.id,
				name: doc.data().name,
				categoryId: doc.data().categoryId,
				selected: doc.data().selected
			}));

			// Собираем данные категории с упражнениями
			const exerciseCategory: IExerciseCategory = {
				...categoryData,
				exercises
			};

			return exerciseCategory;
		} catch (error: any) {
			return rejectWithValue(error.message || 'Error fetching category');
		}
	}
);
