import React, { useState } from 'react';
import cl from "./Exercise.module.scss"
import { DropDownMenu } from 'widgets/dropDownMenu';
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { WorkoutDropDownMenu } from 'widgets/workoutDropDownMenu';

export const Exercise = () => {
      const [collapsed, setCollapsed] = useState<boolean>(true);

  const toggleWorkoutMenu = () => {
    setCollapsed(prevState => !prevState);
  };
    return (
           <>
            <li className={cl.exersise_item} onClick={toggleWorkoutMenu}>
              <div className={cl.exersise}>
                <DarkThemeIcon/>
                <span>Тяга верхнего блока параллельным хватом</span>
              </div>
              {collapsed ?  <ArrowDownIcon />:  <ArrowUpIcon />} 
            </li>
            <DropDownMenu collapsed={collapsed} maxHeight={150}>
              {!collapsed && 
                <WorkoutDropDownMenu />
              }
            </DropDownMenu>
            </>
    );
};
