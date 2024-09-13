import { createAsyncThunk } from '@reduxjs/toolkit';
import { db, doc, getDoc, collection, getDocs } from 'shared/services/firebase';
import { IExerciseWorkout } from '../types/types';
import { RootState } from 'app/providers/store-provider';
import { IExerciseCategory } from 'features/categories';

interface FetchWorkoutArgs {
	date: string;
}

export const fetchWorkout = createAsyncThunk<
	{ date: string; exercises: IExerciseWorkout[] },
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

			// Fetch workout data
			const workoutCollectionRef = collection(db, `users/${userId}/workouts`);
			const workoutDocRef = doc(workoutCollectionRef, date);
			const workoutDoc = await getDoc(workoutDocRef);
			const workoutData = workoutDoc.data();

			// Fetch categories data
			const categoriesSnapshot = await getDocs(collection(db, 'exercises-category'));
			const categories: IExerciseCategory[] = categoriesSnapshot.docs.map(doc => ({
				id: doc.id,
				...(doc.data() as IExerciseCategory),
			}));

			// Map exercises with category images
			const exercises: IExerciseWorkout[] = workoutData?.exercises || [];
			const exercisesWithImages = exercises.map(exerciseWorkout => {
				const exercise = exerciseWorkout.exercise;
				if (exercise) {
					const category = categories.find(cat => cat.id === exercise.categoryId);
					return {
						...exerciseWorkout,
						exercise: {
							...exercise,
							imageDarkURL: category?.imageDarkURL || exercise.imageDarkURL,
							imageLightURL: category?.imageLightURL || exercise.imageLightURL,
						}
					};
				}
				return exerciseWorkout;
			});

			return { date, exercises: exercisesWithImages };
		} catch (error: any) {
			console.error('Error fetching workout:', error.message);
			return rejectWithValue(error.message);
		}
	}
);
