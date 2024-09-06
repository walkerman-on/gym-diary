import React from 'react';
import cl from "./WorkoutsCard.module.scss"
import { WorkoutCard } from 'features/workout/ui/workout-card';

export const WorkoutsCard = () => {
	return (
		<ul className={cl.workouts_card}>
			<WorkoutCard />
		</ul>
	);
};
