import { createAsyncThunk } from "@reduxjs/toolkit";
import { collection, getDocs } from "firebase/firestore";
import { db, query, where } from "shared/services/firebase/firebase";
import { IExercise } from "../types/types";

export const fetchSelectedExercises = createAsyncThunk<any, { userId: string }, { rejectValue: string }>(
	"fetchSelectedExercises",
	async ({ userId }, { rejectWithValue }) => {
		try {
			// // Создаем ссылку на коллекцию упражнений для указанного пользователя
			// const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);

			// // Получаем все документы в коллекции
			// const exercisesSnapshot = await getDocs(exercisesCollectionRef);

			// // Преобразуем данные из документов в массив объектов IExercise
			// const exercises: IExercise[] = exercisesSnapshot.docs.map(doc => ({
			// 	id: doc.id,
			// 	name: doc.data().name,
			// 	categoryId: doc.data().categoryId,
			// 	selected: doc.data().selected || false,
			// }));

			// return exercises

			// Получаем упражнения, относящиеся к данной категории
			const exercisesCollectionRef = collection(db, `users/${userId}/exercises`);
			const exercisesQuery = query(exercisesCollectionRef, where('selected', '==', true));
			const exercisesSnapshot = await getDocs(exercisesQuery);

			const data = exercisesSnapshot?.docs.map(item => item?.data())
			console.log(data)

			// const exercises: IExercise[] = exercisesSnapshot.docs.map(doc => ({
			// 	id: doc.id,
			// 	name: doc.data().name,
			// 	categoryId: doc.data().categoryId,
			// 	selected: doc.data().selected
			// }));




			return data;
		} catch (error: any) {
			console.error('Ошибка при получении упражнений: ', error);
			return rejectWithValue(error.message);
		}
	}
);
