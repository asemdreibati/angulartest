import { Store } from "@ngrx/store";
import { UserSearchHandler } from "./search-handler.model";
import { User } from "../models/user";
import { getUsersInfo } from "../reducers/user.reducer";
import { Observable, map, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseHandler } from "./base-handler";

@Injectable({
    providedIn:'root'
})
/**
 * A handler which can be connected in a chain,
 * Checks the existince of a user in the store if it found return it otherwise pass the input to the next handler [nextHandler]
 */
export class StoreHandler extends BaseHandler {

    constructor(private store: Store) {
        super()
    }

    check(userId: number): Observable<User | undefined> {
        return  this.store.select(getUsersInfo).pipe(
            map(({data:users})=>users.find(user=>user.id==userId)) || undefined)
    }
}