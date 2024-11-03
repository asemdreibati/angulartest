import { User, UsersInfo } from '../models/user';

export interface AppState {
	userState: UserState;
}
export enum LOADING_STATUS{
	NOT_LOADED='NOT_LOADED',
	NOT_LOADING='NOT_LOADING',
	LOADING='LOADING',
	LOADED='LOADED'
}
export interface UserState {
	page: number;
	usersInfo: UsersInfo;
	selectedUser: User|null;
	loading_status: LOADING_STATUS;
	error: any;
	searchedUser: User|null;
}
