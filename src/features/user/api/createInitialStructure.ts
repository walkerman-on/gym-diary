import { db, setDoc, doc } from "shared/services/firebase";
import { RootState, store } from "app/providers/store-provider";

export async function createInitialStructure() {
    try {
        const state = store.getState() as RootState;
        const userId = state.user.user?.id;

        await setDoc(doc(db, 'users', userId, 'exercises', 'initialExercise'), {
            name: 'Initial Exercise',
            description: 'This is the initial exercise'
        });

        await setDoc(doc(db, 'users', userId, 'workouts', 'initialWorkout'), {
            name: 'Initial Workout',
            description: 'This is the initial workout'
        });

        console.log('Structure created successfully');
    } catch (error) {
        console.error('Error creating structure: ', error);
    }
}