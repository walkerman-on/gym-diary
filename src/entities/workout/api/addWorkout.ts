import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, collection, addDoc, doc, setDoc } from "shared/services/firebase/firebase";
import { Workout } from "../model/types/workout";
import uniqid from 'uniqid';

export const addWorkout = createAsyncThunk<Workout, { userId: string, workout: Workout }, { rejectValue: string }>(
    "addWorkout",
    async ({ userId, workout }, { rejectWithValue }) => {
        try {
            const workoutId = uniqid(); // Генерируем уникальный workoutId
            // Добавление тренировки в коллекцию пользователя
            await addDoc(collection(db, `users/${userId}/workouts`), { ...workout, workoutId });
            return workout; // Возвращаем добавленную тренировку
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);
