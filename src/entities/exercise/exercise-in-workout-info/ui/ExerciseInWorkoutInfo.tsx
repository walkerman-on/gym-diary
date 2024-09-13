import React, { FC, useState, useEffect } from 'react';
import cl from "./ExerciseInWorkoutInfo.module.scss";
import { Input } from 'shared/ui/input';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import { addSetAndWeightInWorkout, IExerciseWorkout } from 'features/workout';

interface IExerciseInWorkoutInfo {
	exersiceID?: string;
}

export const ExerciseInWorkoutInfo: FC<IExerciseInWorkoutInfo> = ({ exersiceID }) => {


	return (
		<div className={cl.workout_block}>
			<ul className={cl.exercise_info}>
				<li className={cl.set_info}>
					<span className={cl.set_title}>1</span>
					<Input
						placeholder="Повторения"
						type="number"
						height='50px'
					// value={info.reps ?? ''}
					// onChange={(e) => handleRepsChange(index, e as React.ChangeEvent<HTMLInputElement>)}
					// onBlur={updateWorkoutData}
					/>
					<Input
						placeholder="Вес"
						height='50px'
						type="number"
					// value={info.weight ?? ''}
					// onChange={(e) => handleWeightChange(index, e as React.ChangeEvent<HTMLInputElement>)}
					// onBlur={updateWorkoutData}
					/>
				</li>
			</ul>
			{/* <span className={cl.addSet} onClick={addNewSet}>добавить подход</span> */}
		</div>
	);
};
