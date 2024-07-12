import uniqid from 'uniqid';
import { db, setDoc, doc, collection, query, where, getDocs } from '../services/firebase/firebase';
import { IExercise } from 'features/exercises';

export async function createExercise(exercisesCategoryID: string, exerciseData: { name: string, userId: string }) {
    const exerciseID = uniqid(); // Генерируем уникальный идентификатор для упражнения

    try {
        // Создаем ссылку на коллекцию упражнений для указанного пользователя
        const exercisesCollectionRef = collection(db, `users/${exerciseData.userId}/exercises`);

        // Формируем запрос для проверки наличия упражнения с заданным именем
        const exerciseQuery = query(exercisesCollectionRef, where('name', '==', exerciseData.name));
        const querySnapshot = await getDocs(exerciseQuery);

        // Проверяем, есть ли упражнение с заданным именем
        if (!querySnapshot.empty) {
            console.log(`Упражнение с именем '${exerciseData.name}' уже существует`);
            return; // Завершаем функцию, не создавая новое упражнение
        }

        // Создаем новый документ упражнения с уникальным идентификатором
        const exerciseDocRef = doc(exercisesCollectionRef, exerciseID);
        await setDoc(exerciseDocRef, {
            name: exerciseData.name,
            id: exerciseID,
            categoryId: exercisesCategoryID,
            selected: false
        } as IExercise);

        console.log('Упражнение успешно добавлено');
    } catch (error) {
        console.error('Ошибка при добавлении упражнения: ', error);
    }
}
