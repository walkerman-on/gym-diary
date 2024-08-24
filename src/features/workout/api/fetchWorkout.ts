import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, getDoc, collection } from 'shared/services/firebase';
import { IExerciseWorkout } from '../types/types';
import { RootState } from 'app/providers/store-provider';

interface FetchWorkoutArgs {
	date: string;
}

export const fetchWorkout = createAsyncThunk<
	{ date: string, exercises: IExerciseWorkout[] },
	FetchWorkoutArgs,
	{ rejectValue: string; state: RootState }
>(
	'workout/fetchWorkout',
	async ({ date }: FetchWorkoutArgs, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const userId = state.user.user?.id;

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const workoutCollectionRef = collection(db, `users/${userId}/workouts`);
			const workoutDocRef = doc(workoutCollectionRef, date);

			// Получаем данные тренировки
			const workoutDoc = await getDoc(workoutDocRef);

			const workoutData = workoutDoc.data();
			const exercises: IExerciseWorkout[] = workoutData?.exercises || [];

			return { date, exercises };
		} catch (error: any) {
			console.error('Error fetching workout:', error.message);
			return rejectWithValue(error.message);
		}
	}
);
