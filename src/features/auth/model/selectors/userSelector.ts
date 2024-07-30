import { IUserState } from 'app/providers/store-provider';

export const getUserSelector = (state: IUserState) => state.user;
