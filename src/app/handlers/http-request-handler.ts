import { User } from '../models/user';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { BaseHandler } from './base-handler';
import { HandlerUtility } from './handler-utility.service';
import { Handlers_Types } from './handlers-types';

@Injectable({
  providedIn: 'root',
})
/**
 * A handler which can be connected in a chain,
 * Checks the existince of a user in the DB if it found return it otherwise pass the input to the next handler [nextHandler]
 * Basically this handler as a last resort
 */
export class HttpRequestHandler extends BaseHandler {
  constructor(private userService: UserService) {
    super();
    HandlerUtility.registerHandler(Handlers_Types.HttpRequestHandler, this);
  }

  check(userId: number): Observable<User | undefined> {
    return this.userService.getUserById(userId);
  }
}
