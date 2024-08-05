import { RouteProps } from 'react-router-dom';

export type AppRoutesProps = RouteProps & {
  path: string,
  element: JSX.Element;
  authOnly?: boolean;
  children?: AppRoutesProps[]; // Ensure children is an array or undefined
};