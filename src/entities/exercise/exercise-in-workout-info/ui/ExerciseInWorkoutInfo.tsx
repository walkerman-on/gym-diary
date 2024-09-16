import React, { FC, useState } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { addSetInWorkout, IExerciseInfo } from 'features/workout';
import { useAppDispatch } from 'shared/lib/hooks';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
	set: IExerciseInfo[];
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID, set }) => {
	const dispatch = useAppDispatch();
	const [sets, setSets] = useState<IExerciseInfo[]>([...set]);

	// Универсальный обработчик для обновления поля weight или reps
	const handleChange = (index: number, key: 'weight' | 'reps') => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		const newSets = [...sets];  // Используем текущее состояние sets
		newSets[index] = { ...newSets[index], [key]: value };
		setSets(newSets);
	};

	// Отправка данных на сервер при потере фокуса
	const handleBlur = (index: number) => () => {
		const currentSet = sets[index];
		if (currentSet.weight !== null && currentSet.reps !== null) {
			dispatch(addSetInWorkout({ date: "2024-09-16", exerciseID: exersiceID, info: currentSet }));
		}
	};

	// Функция для добавления нового подхода
	const addNewSet = () => {
		const nextSetID = sets.length > 0 ? sets[sets.length - 1].setID + 1 : 1;
		setSets([...sets, { weight: null, reps: null, setID: nextSetID }]);  // Используем sets
	};

	return (
		<div className={cl.workout_block}>
			<ul className={cl.exercise_info}>
				{sets?.map((exercise, index) => (
					<li className={cl.set_info} key={exercise.setID}>  {/* Добавлен ключ */}
						<span className={cl.set_title}>{exercise.setID}</span>
						<Input
							placeholder="Повторения"
							type="number"
							height='50px'
							value={exercise.reps ?? ''}
							onChange={handleChange(index, 'reps')}  // Используем индекс
							onBlur={handleBlur(index)}  // Используем индекс
						/>
						<Input
							placeholder="Вес"
							height='50px'
							type="number"
							value={exercise.weight ?? ''}
							onChange={handleChange(index, 'weight')}  // Используем индекс
							onBlur={handleBlur(index)}  // Используем индекс
						/>
					</li>
				))}
			</ul>
			<span className={cl.addSet} onClick={addNewSet}>добавить подход</span>
		</div>
	);
};
