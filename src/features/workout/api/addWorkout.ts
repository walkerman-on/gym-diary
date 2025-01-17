import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, collection, getDoc, setDoc, updateDoc } from 'shared/services/firebase';
import { IExerciseWorkout } from '../types/types';
import { RootState } from 'app/providers/store-provider';
import { IExercise } from 'features/exercises';

interface CreateWorkoutArgs {
	date: string;
	exerciseID: string;
}

export const addWorkout = createAsyncThunk<
	{ date: string; exercises: IExerciseWorkout[] },
	CreateWorkoutArgs,
	{ rejectValue: string; state: RootState }
>(
	'workout/addWorkout',
	async ({ date, exerciseID }: CreateWorkoutArgs, { rejectWithValue, getState }) => {
		try {
			const state = getState();
			const userId = state.user.user?.id;

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const workoutCollectionRef = collection(db, `users/${userId}/workouts`);
			const workoutDocRef = doc(workoutCollectionRef, date);

			// Получаем текущее состояние тренировки
			const workoutDoc = await getDoc(workoutDocRef);

			const exerciseDocRef = doc(db, `users/${userId}/exercises/${exerciseID}`);
			const exerciseDocSnapshot = await getDoc(exerciseDocRef);
			const selectedExercise = exerciseDocSnapshot.data() as IExercise;

			let currentExercises: IExerciseWorkout[] = [];
			if (workoutDoc.exists()) {
				const workoutData = workoutDoc.data();
				currentExercises = workoutData?.exercises || [];
			} else {
				// Если документа нет, создаем новый документ с пустым массивом упражнений
				await setDoc(workoutDocRef, { exercises: [] });
			}

			// Создаем новое упражнение
			const newExercise: IExerciseWorkout = {
				exercise: selectedExercise,
				sets: [] // Пустой массив, так как sets отсутствует
			};

			// Обновляем документ в Firestore
			const updatedExercises = [...currentExercises, newExercise];
			await updateDoc(workoutDocRef, { exercises: updatedExercises });

			return { date, exercises: updatedExercises };
		} catch (error: any) {
			console.error('Error adding workout:', error.message);
			return rejectWithValue(error.message);
		}
	}
);
