import { Injectable } from '@angular/core';
import { Handlers_Types } from './handlers-types';
import { BaseHandler } from './base-handler';
import { UserSearchHandler } from './search-handler.model';

@Injectable({
  providedIn: 'root',
})
export class HandlerUtility {
  public static readonly handlers: Map<Handlers_Types, UserSearchHandler> =
    new Map<Handlers_Types, BaseHandler>();

  static link(handlers: Handlers_Types[]) {
    handlers.forEach((dep: Handlers_Types, i) => {
      if (i != handlers.length - 1)
        this.handlers.get(dep)!.setNext(this.handlers.get(handlers[i + 1])!);
      else this.handlers.get(dep)!.setNext(null);
    });

    return this.handlers.get(handlers[0]);
  }

  public static registerHandler(
    handler_type: Handlers_Types,
    handler: UserSearchHandler
  ) {
    HandlerUtility.handlers.set(handler_type, handler);
  }
}
