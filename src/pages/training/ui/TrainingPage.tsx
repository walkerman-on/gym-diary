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
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import { ExercisesBlock } from 'widgets/exercises';

const exersises: [{id: string, name: string}] = [{
  id: "qwqw",
  name: "Тяга верхнего блока параллельным хватом"
}]

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
            <ThemeSwitcher/>
          </div>
          <div className={cl.calendarMore}>
            <Calendar />
          </div>
          <DropDownMenu collapsed={collapsed.calendarMenu} maxHeight={150}>
            {!collapsed.calendarMenu && 
              <div style={{display:"flex", flexDirection:"column"}}>
                <span>Тут полный календарь</span>
              </div>
            }
          </DropDownMenu>
          <div className={cl.calendarMoreBtn} onClick={toggleCalendarMenu}></div>
        </section>
        <section className={cl.trainingBlock}>
          <ExercisesBlock/>
        </section>
        <section className={cl.settingBlock}>
          <Button height='60px' radius='15px'>Добавить еще</Button>
        </section>
      </div>
    </main>
  ) : (
    <Navigate to={getLogin()}/>
  );
};
