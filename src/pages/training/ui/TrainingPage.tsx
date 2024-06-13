import React, { useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cl from "./TrainingPage.module.scss";
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import { Button } from 'shared/ui/button/index';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getLogin } from 'app/providers/router';
import { useLogout } from 'entities/Auth/hooks/useLogout';
import { Calendar } from 'shared/ui/calendar';
import { DropDownMenu } from 'widgets/dropDownMenu';
import { WorkoutDropDownMenu } from 'widgets/workoutDropDownMenu';
import { useTheme } from 'app/providers/ThemeProvider';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth, user } = useAuth();
  const { logout } = useLogout();

  const [collapsed, setCollapsed] = useState<{ workoutMenu: boolean; calendarMenu: boolean; }>({ workoutMenu: true, calendarMenu: true });

  const toggleWorkoutMenu = () => {
    setCollapsed(prevState => ({
      ...prevState,
      workoutMenu: !prevState.workoutMenu
    }));
  };

  const toggleCalendarMenu = () => {
    setCollapsed(prevState => ({
      ...prevState,
      calendarMenu: !prevState.calendarMenu
    }));
  };

  return isAuth ? (
    <main className={classNames("app container", {}, [theme])}>
      <div className={cl.TrainingPage}>
        <section className={cl.calendarBlock}>
          <div className={cl.theme}>
            {/* <ThemeSwitcher/> */}
          </div>
          <div className={cl.calendarMore}>
            <Calendar />
          </div>
          <DropDownMenu collapsed={collapsed.calendarMenu} maxHeight={150}>
            {!collapsed.calendarMenu && 
              <div style={{display:"flex", flexDirection:"column"}}>
                <span>Календарь</span>
                <span>Календарь</span>
                <span>Календарь</span>
                <span>Календарь</span>
                <span>Календарь</span>
              </div>
            }
          </DropDownMenu>
          <div className={cl.calendarMoreBtn} onClick={toggleCalendarMenu}></div>
          {/* <span onClick={logout}>Выйти</span> */}
        </section>
        <section className={cl.trainingBlock}>
          <ul className={cl.exersisesBlock}>
            <li className={cl.exersise_item} onClick={toggleWorkoutMenu}>
              <div className={cl.exersise}>
                <DarkThemeIcon/>
                <span>Тяга верхнего блока параллельным хватом</span>
              </div>
              {collapsed.workoutMenu ?  <ArrowDownIcon />:  <ArrowUpIcon />} 
            </li>
            <DropDownMenu collapsed={collapsed.workoutMenu} maxHeight={150}>
              {!collapsed.workoutMenu && 
                <WorkoutDropDownMenu />
              }
            </DropDownMenu>
          </ul>
        </section>
        <section className={cl.settingBlock}>
          <ul className={cl.moreInfo}>
            <li className={cl.moreInfoCircle}></li>  
            <li className={cl.moreInfoCircle}></li>  
            <li className={cl.moreInfoCircle}></li>  
          </ul>
          <Button height='60px' radius='15px'>Добавить еще</Button>
        </section>
      </div>
    </main>
  ) : (
    <Navigate to={getLogin()}/>
  );
};
