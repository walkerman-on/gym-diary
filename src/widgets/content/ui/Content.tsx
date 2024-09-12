import { FC, ReactNode } from 'react';
import { useTheme } from 'app/providers/theme-provider';
import classNames from 'classnames';
import cl from "./Content.module.scss"

interface IContent {
	children: ReactNode
}

export const Content: FC<IContent> = ({ children }) => {
	const { theme } = useTheme();

	return (
		<main className={classNames("page", cl.content, {}, [theme])}>
			{children}
		</main>
	);
};
