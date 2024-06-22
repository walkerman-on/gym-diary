import { db, deleteDoc, collection, query, where, getDocs } from '../services/firebase/firebase';

export async function deleteExercises(exerciseData: { ids: string[], userId: string }) {
    try {
        // Создаем ссылку на коллекцию упражнений для указанного пользователя
        const exercisesCollectionRef = collection(db, `users/${exerciseData.userId}/exercises`);

        // Формируем запрос для проверки наличия упражнений с заданными идентификаторами
        const exerciseQuery = query(exercisesCollectionRef, where('id', 'in', exerciseData.ids));

        const querySnapshot = await getDocs(exerciseQuery);

        if (!querySnapshot.empty) {
            // Удаляем все найденные документы упражнений
            const deletePromises = querySnapshot.docs.map(doc => deleteDoc(doc.ref));
            await Promise.all(deletePromises);

            console.log('Упражнения успешно удалены');
        } else {
            console.log('Упражнения не найдены');
        }
    } catch (error) {
        console.error('Ошибка при удалении упражнений: ', error);
    }
}
