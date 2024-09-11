import React, { FC, useState } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { addSetAndWeightInWorkout } from 'features/workout';
import AddSetIcon from 'shared/assets/icons/AddSetIcon';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID }) => {
	const [exerciseInfo, setExerciseInfo] = useState<{ weight?: number, reps?: number }>({
		weight: null,
		reps: null
	});

	const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const weight = parseFloat(e.target.value) || null;
		setExerciseInfo(prevState => ({
			...prevState,
			weight
		}));
	};

	const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reps = parseFloat(e.target.value) || null;
		setExerciseInfo(prevState => ({
			...prevState,
			reps
		}));
	};

	const dispatch = useAppDispatch();

	const { date } = useAppSelector(state => state.workout.workout__current);

	const toggleWorkoutMenu = () => {
		const { weight, reps } = exerciseInfo;

		if (weight !== null && reps !== null && weight > 0 && reps > 0) {
			console.log("if выполнился");
			dispatch(addSetAndWeightInWorkout({
				date: date,
				exerciseID: exersiceID,
				info: {
					setID: 5, // Замените на реальный id, если он должен быть динамическим
					reps,
					weight
				}
			}));
		} else {
			console.error('Invalid input values', exerciseInfo);
		}
	};

	return (
		<div className={cl.workout_block} >
			<div className={cl.exercise_info}>
				<span className={cl.set_title}>1</span>
				<Input
					placeholder="Повторения"
					type="number"
					height='50px'
					value={exerciseInfo.reps ?? ''}
					onChange={handleRepsChange}
					onBlur={toggleWorkoutMenu}
				/>
				<Input
					placeholder="Вес"
					height='50px'
					type="number"
					value={exerciseInfo.weight ?? ''}
					onChange={handleWeightChange}
					onBlur={toggleWorkoutMenu}
				/>
				<span className={cl.addSet}>
					<AddSetIcon />
				</span>
			</div>
		</div>
	);
};
