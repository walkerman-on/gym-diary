import { useTheme } from 'app/providers/ThemeProvider';
import { Theme } from 'app/providers/ThemeProvider';
import {Switch} from 'shared/ui/switch/ui/Switch';

export const ThemeSwitcher = (props:any) => {
    const {changeTheme} = useTheme()

    return (
        <div onClick={changeTheme} {...props}>
            <Switch/>
        </div>
    );
};
