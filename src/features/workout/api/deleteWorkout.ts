import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, deleteDoc, doc, getDoc, updateDoc } from 'shared/services/firebase';
import { RootState } from 'app/providers/store-provider';

interface DeleteWorkoutArgs {
	exerciseID: string;
	date: string;
}

export const deleteWorkout = createAsyncThunk<
	string, // Тип возвращаемого значения при успешном выполнении
	DeleteWorkoutArgs, // Тип аргументов
	{ rejectValue: string } // Тип значения, возвращаемого в случае ошибки
>(
	'workout/deleteWorkout',
	async ({ exerciseID, date }: DeleteWorkoutArgs, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.user?.id;

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const workoutDocRef = doc(db, `users/${userId}/workouts/${date}`);
			const workoutDocSnap = await getDoc(workoutDocRef);

			if (!workoutDocSnap.exists()) {
				return rejectWithValue(`Workout document for date ${date} not found`);
			}

			const workoutData = workoutDocSnap.data();
			if (!workoutData?.exercises) {
				return rejectWithValue('Exercises not found in workout document');
			}

			const exercises = workoutData.exercises as Array<{ exercise: { id: string } }>;

			// Найдите индекс упражнения, которое нужно удалить
			const exerciseIndex = exercises.findIndex(
				(item) => item.exercise.id === exerciseID
			);

			if (exerciseIndex === -1) {
				return rejectWithValue(`Exercise with ID ${exerciseID} not found`);
			}

			// Удалите упражнение из массива
			exercises.splice(exerciseIndex, 1);

			// Обновите документ с новым массивом упражнений
			await updateDoc(workoutDocRef, { exercises });

			console.log(`Exercise with ID ${exerciseID} successfully deleted`);

			return exerciseID;
		} catch (error) {
			// Приведение ошибки к строке для лучшей совместимости с rejectWithValue
			const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
			console.error('Error deleting exercise: ', errorMessage);
			return rejectWithValue(errorMessage);
		}
	}
);
