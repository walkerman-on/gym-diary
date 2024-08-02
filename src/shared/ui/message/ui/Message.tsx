import classNames from 'classnames';
import cl from "./Message.module.scss"
import { useTheme } from 'app/providers/theme-provider';

export const Message = () => {
	const { theme } = useTheme();

	return (
		<div className={classNames("app", cl.Layout, {}, [theme])}>
			Please install our app!
		</div>
	);
};
