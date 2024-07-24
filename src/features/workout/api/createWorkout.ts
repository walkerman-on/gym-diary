import uniqid from 'uniqid';
import { db, setDoc, doc, collection, query, where, getDocs } from 'shared/services/firebase/firebase';
import { IExerciseWorkout, IWorkout } from 'features/workout';

export async function createWorkout(userId: string, workoutData: { data: string, exercises: IExerciseWorkout[] }) {
    const workoutID = uniqid(); // Генерируем уникальный идентификатор для упражнения

    try {
        // Создаем ссылку на коллекцию упражнений для указанного пользователя
        const workoutsCollectionRef = collection(db, `users/${userId}/workouts`);

        // Формируем запрос для проверки наличия упражнения с заданным именем
        const workoutQuery = query(workoutsCollectionRef, where('date', '==', workoutData.data));
        const querySnapshot = await getDocs(workoutQuery);

        // Проверяем, есть ли упражнение с заданным именем
        if (!querySnapshot.empty) {
            console.log(`Тренировка на эту дату - '${workoutData.data}' - уже существует`);
            return; // Завершаем функцию, не создавая новое упражнение
        }

        // Создаем новый документ упражнения с уникальным идентификатором
        const workoutDocRef = doc(workoutsCollectionRef, workoutID);
        await setDoc(workoutDocRef, {
            data: workoutData.data,
            exercises: workoutData.exercises
        } as IWorkout);

        console.log('Тренировка успешно добавлена');
    } catch (error) {
        console.error('Ошибка при добавлении тренировки: ', error);
    }
}
