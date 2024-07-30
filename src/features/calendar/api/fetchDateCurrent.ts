import { createAsyncThunk } from "@reduxjs/toolkit";
import { db, query, where, collection, getDocs } from "shared/services/firebase";

export const fetchDateCurrent = createAsyncThunk<any, { userId: string, date__current: string }, { rejectValue: string }>(
    "fetchDateCurrent",
    async ({ userId, date__current }, { rejectWithValue }) => {
        try {
            const workoutsCollectionRef = collection(db, `users/${userId}/workouts`);
            const workoutQuery = query(workoutsCollectionRef, where('date', '==', date__current));
            const workoutSnapshot = await getDocs(workoutQuery);
            const data = workoutSnapshot?.docs.map(item => item?.data())
            console.log("date__current - ", date__current)
            return date__current;
        } catch (error: any) {
            console.error('Ошибка при получении выбранной даты: ', error);
            return rejectWithValue(error.message);
        }
    }
);
