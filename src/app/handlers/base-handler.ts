import { UserSearchHandler } from "./search-handler.model";
import { User } from "../models/user";
import { Observable, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn:'root'
})
/**
 * A Base handler which can be connected in a chain [Has common functionality],
 * Checks the existince of a user in the DB if it found return it otherwise pass the input to the next handler [nextHandler]
 * Basically this handler as a last resort
 */
export abstract class BaseHandler  implements UserSearchHandler {
    private nextHandler: UserSearchHandler;
    constructor() {}

    setNext(handler: UserSearchHandler): UserSearchHandler {
        this.nextHandler = handler;
        return handler;
    }

    handle(userId: number): Observable<User | null> {
        
        return this.check(userId).pipe(
            switchMap(user=>{
                if (user) {
                    return of(user);
                }
                return this.nextHandler ? this.nextHandler.handle(userId) : of(null);
            })
        )

    }

    abstract check(userId: number): Observable<User | undefined> ;
}