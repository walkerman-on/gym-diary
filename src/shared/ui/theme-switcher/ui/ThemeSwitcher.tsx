import { useTheme } from 'app/providers/theme-provider';
import { Switch } from 'shared/ui/switch/ui/Switch';
import cl from "./ThemeSwitcher.module.scss"

export const ThemeSwitcher = (props: any) => {
    // const { changeTheme } = useTheme()

    return (
        <div {...props} className={cl.ThemeSwitcher}>
            <Switch />
        </div>
    );
};
