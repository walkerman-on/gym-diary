import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeSwitcher = () => {
    const {theme, changeTheme} = useTheme()

    return (
        <div onClick={changeTheme}>
            {theme === Theme.DARK ? <p>Темная тема</p> : <p>Светлая тема</p>}
        </div>
    );
};
