import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {  of } from 'rxjs';
import { map, catchError, debounceTime, tap, take, shareReplay, exhaustMap } from 'rxjs/operators';
import * as fromActions from '../actions/user.actions';
import { UserService } from '../services/user.service';
import { Store } from '@ngrx/store';
import { LOADING_STATUS, UserState } from '../reducers/app.states';
import {  UsersInfo } from '../models/user';

@Injectable()
export class UserEffects {
  private actions$ = inject(Actions);
  private userService = inject(UserService);
  private store = inject( Store<UserState>);
  constructor() {}

  loadAllUsers$ = createEffect(() => this.actions$.pipe(
    ofType(fromActions.LoadUsers),
    exhaustMap(({page}:{page:number}) =>{
        this.store.dispatch(fromActions.LoadingStatusChange({loading_status:LOADING_STATUS.LOADING}))
        return this.userService.getAllUsers(page).pipe(
          map((usersInfo:UsersInfo|null) => {
            if(!usersInfo) throw new Error()
            this.store.dispatch(fromActions.LoadingStatusChange({loading_status:LOADING_STATUS.LOADED}))
            return fromActions.LoadUsersSuccess(usersInfo);
          }),
          catchError(error => {
            this.store.dispatch(fromActions.LoadingStatusChange({loading_status:LOADING_STATUS.NOT_LOADED}))
            return of(fromActions.LoadUsersFailure(error))}),
        )
      })
  ));


}
