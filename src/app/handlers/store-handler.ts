import { Store } from '@ngrx/store';
import { User } from '../models/user';
import { getUsersInfo } from '../reducers/user.reducer';
import { Observable, map } from 'rxjs';
import { Injectable } from '@angular/core';
import { BaseHandler } from './base-handler';
import { HandlerUtility } from './handler-utility.service';
import { Handlers_Types } from './handlers-types';

@Injectable({
  providedIn: 'root',
})
/**
 * A handler which can be connected in a chain,
 * Checks the existince of a user in the store if it found return it otherwise pass the input to the next handler [nextHandler]
 */
export class StoreHandler extends BaseHandler {
  constructor(private readonly store: Store) {
    super();
    HandlerUtility.registerHandler(Handlers_Types.StoreHandler, this);
  }

  check(userId: number | null): Observable<User | undefined> {
    return this.store
      .select(getUsersInfo)
      .pipe(
        map(({ data: users }) => users.find((user) => user.id == userId)) ||
          undefined
      );
  }
}
