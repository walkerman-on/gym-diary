import React, { FC, useState } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';

interface IExerciseInWorkoutInfo {
	//  id: string;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ }) => {
	const [exerciseInfo, setExerciseInfo] = useState<{ weight: number, reps: number }>({
		weight: null,
		reps: null
	});

	const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const weight = parseFloat(e.target.value) || 0; // Преобразуем строку в число
		setExerciseInfo(prevState => ({
			...prevState,
			weight
		}));
		console.log({ weight })
	};

	const handleRepsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const reps = parseFloat(e.target.value) || 0; // Преобразуем строку в число
		setExerciseInfo(prevState => ({
			...prevState,
			reps
		}));
		console.log({ reps })

	};

	return (
		<div className={cl.exercise_info}>
			<span className={cl.set_title}>1</span>
			<div className={cl.info_input}>
				<Input
					placeholder="Количество"
					type="number"
					value={exerciseInfo.reps}
					onChange={handleRepsChange}
				/>
				<Input
					placeholder="Вес"
					height='50px'
					type="number"
					value={exerciseInfo.weight}
					onChange={handleWeightChange}
				/>
			</div>
		</div>
	);
};
