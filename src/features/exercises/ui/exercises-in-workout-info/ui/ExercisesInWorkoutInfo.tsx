import React, { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import cl from "./ExercisesInWorkoutInfo.module.scss"
import { Input } from 'shared/ui/input';


export const ExercisesInWorkoutInfo: FC = () => {

    return (
        <div className={cl.workoutDropDownMenu}>
            <div className={cl.dropDownMenu}>
                <div className={cl.menuBlock}>
                    <ul className={cl.menuCells}>
                        <li className={cl.cellsText}>1</li>
                        <li><Input height="50px" placeholder="вес" /></li>
                        <li><Input height="50px" placeholder="повторения" /></li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

