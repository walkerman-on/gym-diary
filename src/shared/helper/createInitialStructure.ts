import { db, setDoc, doc } from "../services/firebase/firebase";

// Функция для создания структуры
export async function createInitialStructure(userId: string) {
    try {
        // Создаем коллекцию workouts для пользователя с указанным userId
        await setDoc(doc(db, 'users', userId, 'workouts', 'initialWorkout'), {
            name: 'Initial Workout',
            description: 'This is the initial workout'
        });

        // Создаем коллекцию exercises для пользователя с указанным userId
        await setDoc(doc(db, 'users', userId, 'exercises', 'initialExercise'), {
            name: 'Initial Exercise',
            description: 'This is the initial exercise'
        });

        console.log('Structure created successfully');
    } catch (error) {
        console.error('Error creating structure: ', error);
    }
}