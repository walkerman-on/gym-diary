import React, { useState } from 'react';
import cl from "./ExercisesBlock.module.scss"
import { DropDownMenu } from 'widgets/dropDownMenu';
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { WorkoutDropDownMenu } from 'widgets/workoutDropDownMenu';
import { Exercise } from 'widgets/exercise/ui/Exercise';

export const ExercisesBlock = () => {
    return (
      <ul className={cl.exersisesBlock}>
          <Exercise />
        </ul>
    );
};
