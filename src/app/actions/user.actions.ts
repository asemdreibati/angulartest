import { createAction, props } from '@ngrx/store';
import { User, UsersInfo } from '../models/user';
import { LOADING_STATUS } from '../reducers/app.states';

export const LoadUsers = createAction('[USER] Get All', props<{ page: number }>());
export const LoadUsersSuccess = createAction('[USER] Get Success', props<UsersInfo>());
export const LoadUsersFailure = createAction('[USER] Get Failure', props<{ error: any}>());

export const SelectedUser = createAction('[USER] Specific Success', props<{ userId: number}>());
export const LoadingStatusChange = createAction('[USER] Loading Status Change', props<{ loading_status: LOADING_STATUS}>());

export const LoadUserSuccess = createAction('[USER] Get by Id Success', props<User>());
export const LoadUserFailureAction = createAction('[USER] Get by Id Failed',props<{ error: any}>());
export const ClearSearchAction = createAction('[USER] Clear search results');
