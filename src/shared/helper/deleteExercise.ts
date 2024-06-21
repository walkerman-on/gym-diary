import { db, doc, deleteDoc, collection, query, where, getDocs } from '../services/firebase/firebase';

export async function deleteExercise(exerciseData: { id: string, userId: string }) {
    try {
        // Создаем ссылку на коллекцию упражнений для указанного пользователя
        const exercisesCollectionRef = collection(db, `users/${exerciseData.userId}/exercises`);

        // Формируем запрос для проверки наличия упражнения с заданным идентификатором
        const exerciseQuery = query(exercisesCollectionRef, where('id', '==', exerciseData.id));

        const querySnapshot = await getDocs(exerciseQuery);

        if (!querySnapshot.empty) {
            // Получаем документ упражнения
            const exerciseDocRef = querySnapshot.docs[0].ref;

            // Удаляем документ упражнения
            await deleteDoc(exerciseDocRef);

            console.log('Упражнение успешно удалено');
        } else {
            console.log('Упражнение не найдено');
        }
    } catch (error) {
        console.error('Ошибка при удалении упражнения: ', error);
    }
}
