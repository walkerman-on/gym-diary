import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, updateDoc, getDoc } from 'shared/services/firebase';
import { RootState } from "app/providers/store-provider";
import { IExercise } from 'features/exercises';
import { IExerciseInfo } from '../types/types';

interface addSetAndWeightInWorkoutArgs {
	date: string;
	exerciseID: string;
	info: IExerciseInfo; // The information to be added to the sets array
}

export const addSetAndWeightInWorkout = createAsyncThunk<
	IExerciseInfo, // Return type
	addSetAndWeightInWorkoutArgs, // Input type
	{ rejectValue: string }
>(
	'workout/addSetAndWeightInWorkout',
	async ({ date, exerciseID, info }, { rejectWithValue, getState }) => {
		try {
			const state = getState() as RootState;
			const userId = state.user.user?.id;

			if (!userId) {
				return rejectWithValue('User not authenticated');
			}

			const workoutDocRef = doc(db, `users/${userId}/workouts/${date}`);
			const workoutDocSnapshot = await getDoc(workoutDocRef);

			if (!workoutDocSnapshot.exists()) {
				throw new Error(`Workout for date ${date} not found`);
			}

			const workoutData = workoutDocSnapshot.data();
			const exercises = workoutData?.exercises || [];

			const exerciseIndex = exercises.findIndex((e: { exercise: { id: string } }) => e.exercise.id === exerciseID);

			if (exerciseIndex === -1) {
				throw new Error(`Exercise with ID ${exerciseID} not found in workout`);
			}

			const selectedExercise = exercises[exerciseIndex];
			const updatedSets = [
				...(selectedExercise.sets || []),
				info
			];

			// Update the exercise with the new sets
			exercises[exerciseIndex] = {
				...selectedExercise,
				sets: updatedSets
			};

			await updateDoc(workoutDocRef, {
				exercises
			});

			return info;

		} catch (error: any) {
			console.error('Error updating exercise sets: ', error);
			return rejectWithValue(error.message);
		}
	}
);
