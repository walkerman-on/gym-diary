import { useTheme } from 'app/providers/ThemeProvider';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher';
import cl from "./TrainingPage.module.scss"
import DarkThemeIcon from 'shared/assets/icons/DarkThemeIcon';
import {Button} from 'shared/ui/button/index';
import SettingsIcon from 'shared/assets/icons/SettingsIcon';
import { WorkoutDropDownMenu } from 'widgets/workoutDropDownMenu';
import { useState } from 'react';
import ArrowDownIcon from 'shared/assets/icons/ArrowDownIcon';
import ArrowUpIcon from 'shared/assets/icons/ArrowUpIcon';
import { useAuth } from 'entities/Auth/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { getLogin } from 'app/providers/router';
import { useLogout } from 'entities/Auth/hooks/useLogout';

export const TrainingPage = () => {
  const { theme } = useTheme();
  const { isAuth, user } = useAuth();
  const { logout } = useLogout();

    const [collapsed, setCollapsed] = useState<boolean>(false);
  const onToggle = () => {
    setCollapsed(!collapsed)
  }
    return isAuth ? (
        <main className={classNames("app", {}, [theme])}>
            <div className={cl.TrainingPage}>
                <section className={cl.calendarBlock}>
                    Календарь тут
                    {/* <SettingsIcon/> */}
                    <ThemeSwitcher/>
                    <span onClick={logout}>Выйти</span>
                </section>
                <section className={cl.trainingBlock}>
                    <ul className={cl.exersisesBlock}>
                        <li className={cl.exersise_item} onClick={onToggle}>
                            <div className={cl.exersise}>
                                <DarkThemeIcon/>
                                <span>Тяга верхнего блока параллельным хватом</span>
                            </div>
                                {collapsed ?  <ArrowDownIcon />:  <ArrowUpIcon />} 
                        </li>
                        <WorkoutDropDownMenu collapsed={collapsed} />
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

