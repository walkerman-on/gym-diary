import { UserState } from 'features/auth';
import { store } from './store';

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export interface IUserState {
  user: UserState;
}
