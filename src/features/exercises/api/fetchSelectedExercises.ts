import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db, query, where } from "shared/services/firebase/firebase";

export const fetchSelectedExercises = createAsyncThunk<any, { userId: string }, { rejectValue: string }>(
	"fetchSelectedExercises",
	async ({ userId }, { rejectWithValue }) => {
		try {
			const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);
			const exercisesQuery = query(exercisesCollectionRef, where('selected', '==', true));
			const exercisesSnapshot = await getDocs(exercisesQuery);

			const data = exercisesSnapshot?.docs.map(item => item?.data())

			return data;
		} catch (error: any) {
			console.error('Ошибка при получении упражнений: ', error);
			return rejectWithValue(error.message);
		}
	}
);
