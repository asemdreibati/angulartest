import { Observable } from "rxjs";
import { User } from "../models/user";


/**
 * Interface for Search handlers, Implementing as a chain of commands so that the caller
 * specify the resolving strategy 
 * Ex: [check store => check localStorage => Fallback to API]
 */
export interface UserSearchHandler {
    setNext(handler: UserSearchHandler): UserSearchHandler;
    handle(userId: number): Observable<User | null>;
}