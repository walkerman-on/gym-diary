import { Switch as MUISwitch } from '@mui/material';
import { ISwitchProps } from './IProps';
import { FC, memo } from 'react';
import { Theme, useTheme } from 'app/providers/theme-provider';
import ThemeIcon from 'shared/assets/icons/ThemeIcon';

export const Switch: FC<ISwitchProps> = (props: any) => {
  const { theme } = useTheme();
  const themeText = theme === Theme.DARK ? "тёмная" : "светлая"
  return (
    <>
      <ThemeIcon />
      Тема: {themeText}
    </>
  )
}

