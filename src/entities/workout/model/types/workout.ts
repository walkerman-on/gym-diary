export interface Workout {
  workoutId: string,
  date: string,
  exersises: [
    {
      exerciseId: {
        name: string,
        sets: number,
        reps: number,
        weight: number
      }
    }
  ]
}

export interface WorkoutState {
  workout: Workout | null;
  userID: string
}
