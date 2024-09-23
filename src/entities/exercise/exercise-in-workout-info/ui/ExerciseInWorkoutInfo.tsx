import React, { FC, useState, useEffect } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { IExerciseInfo } from 'features/workout';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
	set: IExerciseInfo[];
	addInfoToServer: (exerciseID: string | undefined, info: IExerciseInfo) => void;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID, set, addInfoToServer }) => {
	// Состояние для хранения текущих и начальных значений подходов
	const [sets, setSets] = useState<IExerciseInfo[]>([...set]);
	const [initialSets, setInitialSets] = useState<IExerciseInfo[]>([...set]);

	// Обновляем начальные данные при изменении пропсов
	useEffect(() => {
		setSets([...set]);
		setInitialSets([...set]);
	}, [set]);

	// Функция для проверки валидности сета (не пустые значения)
	const isSetValid = (index: number) => {
		const currentSet = sets[index];
		return currentSet?.weight !== null && currentSet?.reps !== null;
	};

	// Функция для изменения значений веса или повторений
	const handleChange = (index: number, key: 'weight' | 'reps') => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		const newSets = [...sets];
		newSets[index] = { ...newSets[index], [key]: value };
		setSets(newSets);
	};

	// Проверяем, изменились ли данные в текущем подходе
	const hasSetChanged = (index: number) => {
		const currentSet = sets[index];
		const initialSet = initialSets[index];
		return currentSet?.weight !== initialSet?.weight || currentSet?.reps !== initialSet?.reps;
	};

	// Обрабатываем событие "blur" (потеря фокуса)
	const handleBlur = (index: number) => () => {
		const currentSet = sets[index];
		if (isSetValid(index) && hasSetChanged(index)) {
			addInfoToServer(exersiceID, currentSet);
			// Обновляем начальные данные после отправки на сервер
			const updatedInitialSets = [...initialSets];
			updatedInitialSets[index] = { ...currentSet };
			setInitialSets(updatedInitialSets);
		}
	};

	// Добавление нового сета при нажатии на кнопку
	const addNewSet = () => {
		if (canAddNewSet) {
			const nextSetID = sets.length > 0 ? sets[sets.length - 1].setID + 1 : 1;
			setSets([...sets, { weight: null, reps: null, setID: nextSetID }]);
		}
	};

	// Проверяем, можно ли добавить новый сет
	const canAddNewSet = sets.length === 0 || isSetValid(sets.length - 1);

	return (
		<div className={cl.workout_block}>
			<ul className={cl.exercise_info}>
				{sets.map((exercise, index) => (
					<li className={cl.set_info} key={exercise.setID}>
						<span className={cl.set_title}>{exercise.setID}</span>
						<Input
							placeholder="Повторения"
							type="number"
							height='50px'
							value={exercise.reps ?? ''}
							onChange={handleChange(index, 'reps')}
							onBlur={handleBlur(index)}
						/>
						<Input
							placeholder="Вес"
							height='50px'
							type="number"
							value={exercise.weight ?? ''}
							onChange={handleChange(index, 'weight')}
							onBlur={handleBlur(index)}
						/>
					</li>
				))}
			</ul>
			<span
				className={`${cl.addSet} ${!canAddNewSet ? cl.disabled : ''}`}
				onClick={canAddNewSet ? addNewSet : undefined}
			>
				добавить подход
			</span>
		</div>
	);
};
