import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, collection, getDoc, setDoc, updateDoc } from 'shared/services/firebase';
import { IExerciseWorkout } from '../types/types';
import { RootState } from 'app/providers/store-provider';

interface CreateWorkoutArgs {
	date: string;
}

export const createWorkout = createAsyncThunk<
	{ date: string; exercise: null },
	CreateWorkoutArgs,
	{ rejectValue: string; state: RootState }
>(
	'workout/createWorkout',
	async ({ date }: CreateWorkoutArgs, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const userId = state.user.user?.id;

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const workoutCollectionRef = collection(db, `users/${userId}/workouts`);
			const workoutDocRef = doc(workoutCollectionRef, date);

			// Получаем текущие данные тренировки
			const workoutDoc = await getDoc(workoutDocRef);

			let currentExercises: IExerciseWorkout[] = [];
			if (workoutDoc.exists()) {
				const workoutData = workoutDoc.data();
				currentExercises = workoutData?.exercises || [];
			} else {
				// Если документа нет, создаем новый документ с пустым массивом упражнений
				await setDoc(workoutDocRef, { exercises: [] });
			}
			return { date, exercise: null };
		} catch (error: any) {
			console.error('Error adding workout:', error.message);
			return rejectWithValue(error.message);
		}
	}
);
