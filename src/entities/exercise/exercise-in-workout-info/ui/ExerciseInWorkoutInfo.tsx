import React, { FC, useState } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { IExerciseInfo } from 'features/workout';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
	set: IExerciseInfo[];
	addInfoToServer: (exerciseID: string | undefined, info: IExerciseInfo) => void;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID, set, addInfoToServer }) => {
	const [sets, setSets] = useState<IExerciseInfo[]>([...set]);

	const isSetValid = (index: number) => {
		const currentSet = sets[index];
		return currentSet.weight !== null && currentSet.reps !== null;
	};

	const handleChange = (index: number, key: 'weight' | 'reps') => (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value ? parseFloat(e.target.value) : null;
		const newSets = [...sets];
		newSets[index] = { ...newSets[index], [key]: value };
		setSets(newSets);
	};

	const handleBlur = (index: number) => () => {
		const currentSet = sets[index];
		if (currentSet.weight !== null && currentSet.reps !== null) {
			addInfoToServer(exersiceID, currentSet);
		}
	};

	const addNewSet = () => {
		const nextSetID = sets.length > 0 ? sets[sets.length - 1].setID + 1 : 1;
		setSets([...sets, { weight: null, reps: null, setID: nextSetID }]);
	};

	// Determine if the last set is valid
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
			<span className={`${cl.addSet} ${!canAddNewSet ? cl.disabled : ''}`} onClick={canAddNewSet ? addNewSet : undefined}>
				добавить подход
			</span>
		</div>
	);
};
