import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db, query, where } from "shared/services/firebase/firebase";
import { RootState } from "app/providers/StoreProvider"; // Adjust the import according to your setup
import { IExercise } from "../types/types";


export const fetchSelectedExercises = createAsyncThunk<IExercise[], void, { rejectValue: string }>(
	"fetchSelectedExercises",
	async (_, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.user?.id; // Adjust according to your state shape

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);
			const exercisesQuery = query(exercisesCollectionRef, where('selected', '==', true));
			const exercisesSnapshot = await getDocs(exercisesQuery);

			const data = exercisesSnapshot?.docs.map(item => item?.data()) as IExercise[]

			return data;
		} catch (error: any) {
			console.error('Ошибка при получении упражнений: ', error);
			return rejectWithValue(error.message);
		}
	}
);
