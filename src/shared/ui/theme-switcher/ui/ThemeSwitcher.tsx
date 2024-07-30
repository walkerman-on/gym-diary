import { useTheme } from 'app/providers/theme-provider';
import { Switch } from 'shared/ui/switch/ui/Switch';

export const ThemeSwitcher = (props: any) => {
    const { changeTheme } = useTheme()

    return (
        <div onClick={changeTheme} {...props}>
            <Switch />
        </div>
    );
};
