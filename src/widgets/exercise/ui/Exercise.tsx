import { useState } from 'react';
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
      <li className={cl.exersise_item} >
        <div className={cl.exersise} onClick={toggleWorkoutMenu}>
          <DarkThemeIcon/>
          <span>Тяга верхнего блока параллельным хватом</span>
          {collapsed ? <ArrowDownIcon /> : <ArrowUpIcon />} 
        </div>
        {!collapsed &&  <WorkoutDropDownMenu />} 
        <DropDownMenu collapsed={collapsed} maxHeight={150} />
      </li>
    );
};
