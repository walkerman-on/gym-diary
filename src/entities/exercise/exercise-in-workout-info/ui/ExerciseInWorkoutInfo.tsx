import React, { FC, useState } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { addSetAndWeightInWorkout, IExerciseInfo } from 'features/workout';
import { useAppDispatch } from 'shared/lib/hooks';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID }) => {
	// Инициализация массива подходов с одним подходом, который имеет setID = 1

	const dispatch = useAppDispatch()
	const [sets, setSets] = useState<IExerciseInfo[]>([{ weight: null, reps: null, setID: 1 }]);


	// Универсальная функция для обновления значения подхода
	const updateSet = (index: number, key: 'weight' | 'reps', value: number | null) => {
		const newSets = [...sets];
		newSets[index] = { ...newSets[index], [key]: value };
		setSets(newSets);
		dispatch(addSetAndWeightInWorkout({ date: "2024-09-13", exerciseID: exersiceID, info: newSets[index] }))
		console.log("newSets", newSets[index])

	};

	// console.log({ sets })
	// Обработчик изменения значения (повторений или веса)
	const handleChange = (index: number, key: 'weight' | 'reps') => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		updateSet(index, key, value);
	};

	// Функция для добавления нового подхода
	const addNewSet = () => {
		const nextSetID = sets.length > 0 ? sets[sets.length - 1].setID + 1 : 1;
		setSets([...sets, { weight: null, reps: null, setID: nextSetID }]);
	};

	return (
		<div className={cl.workout_block}>
			<ul className={cl.exercise_info}>
				{
					sets.map((set, index) => (
						<li className={cl.set_info} key={set.setID}>
							<span className={cl.set_title}>{set.setID}</span>
							<Input
								placeholder="Повторения"
								type="number"
								height='50px'
								value={set.reps ?? ''}
								onChange={handleChange(index, 'reps')}
							/>
							<Input
								placeholder="Вес"
								height='50px'
								type="number"
								value={set.weight ?? ''}
								onChange={handleChange(index, 'weight')}
							/>
						</li>
					))
				}
			</ul>
			<span className={cl.addSet} onClick={addNewSet}>добавить подход</span>
		</div>
	);
};
