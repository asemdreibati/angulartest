import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { User, UsersInfo } from '../models/user';
import { HandlerUtility } from '../handlers/handler-utility.service';
import { Handlers_Types } from '../handlers/handlers-types';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}
  url = 'https://reqres.in/api/users';
  getAllUsers(page: number): Observable<UsersInfo | null> {
    if (localStorage.getItem(`users_${page}`))
      return of(JSON.parse(localStorage.getItem(`users_${page}`)!));
    return this.http.get<UsersInfo>(this.url + `?page=${page}`).pipe(
      tap((usersInfo) =>
        localStorage.setItem(`users_${page}`, JSON.stringify(usersInfo))
      ),
      catchError((err) => {
        return of(null);
      })
    );
  }
  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url, user);
  }
  getUserById(id: number): Observable<User | undefined> {
    console.log('getUserById', id);
    return this.http.get<{ data: User }>(this.url + `/${id}`).pipe(
      map((data) => {
        return data.data;
      }),
      catchError((err: HttpErrorResponse) => {
        return of(JSON.stringify(err.error) as any);
      })
    );
  }

  /**
   *
   * @param userId
   * @param deps
   * @returns
   */
  findUser(
    userId: number,
    deps: Handlers_Types[] = [
      Handlers_Types.StoreHandler,
      Handlers_Types.LocalStorageHandler,
      Handlers_Types.HttpRequestHandler,
    ]
  ) {
    return HandlerUtility.link(deps)!.handle(userId);
  }
}
