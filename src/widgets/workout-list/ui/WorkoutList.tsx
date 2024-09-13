import { useAppDispatch } from "shared/lib/hooks/useAppDispatch/useAppDispatch";
import { useEffect, FC } from "react";
import { useAppSelector } from "shared/lib/hooks/useAppSelector/useAppSelector";
import { Loader } from "shared/ui/loader";
import { fetchWorkout } from "features/workout";
import { useParams } from "react-router-dom";
import { WorkoutCard } from "features/workout/ui/workout-card";
import cl from "./WorkoutList.module.scss"

export const WorkoutList: FC = () => {
	const { date } = useParams<{ date: string }>();

	const { loading, workout__current } = useAppSelector(state => state.workout);
	const exercises = workout__current?.exercises || [];

	return (
		<>
			{loading ?
				<Loader />
				: exercises.length > 0 ? (
					<WorkoutCard exercises={exercises} date={date} />
				) :
					<h1 className={cl.content}>Упражнения не добавлены в тренировку, добавь их!</h1>
			}
		</>
	);
};
