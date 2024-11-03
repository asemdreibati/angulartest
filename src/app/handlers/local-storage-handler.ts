import { User } from "../models/user";
import { Observable, of, switchMap } from "rxjs";
import { Injectable } from "@angular/core";
import { BaseHandler } from "./base-handler";

@Injectable({
    providedIn:'root'
})
/**
 * A handler which can be connected in a chain,
 * Checks the existince of a user in the local storage if it found return it otherwise pass the input to the next handler [nextHandler]
 */
export  class LocalStorageHandler extends BaseHandler{

    check(userId: number): Observable<User | undefined> {
        let page=1;
        let users;
        users=localStorage.getItem(`users_${page}`)
        while(users){
            users=JSON.parse(users)
            users=users.data
            for(let i =0 ; i< users.length ; i++){
                if(users[i].id==userId)return of(users[i])
            }
            page++
            users=localStorage.getItem(`users_${page}`)
        }
        return of(undefined)  
    }

}