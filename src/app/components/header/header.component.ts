import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { Store } from '@ngrx/store';
import { LOADING_STATUS, UserState } from '../../reducers/app.states';
import * as fromActions from '../../actions/user.actions';
import { Subject, debounceTime, distinctUntilChanged, of, switchMap, take, takeUntil, throttleTime } from 'rxjs';
import { HttpRequestHandler } from '../../handlers/http-request-handler';
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';
import { StoreHandler } from '../../handlers/store-handler';
import { LocalStorageHandler } from '../../handlers/local-storage-handler';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatInputModule
  ],
  templateUrl:'./header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  searchSubject=new Subject<number>();
  storeHandler=inject(StoreHandler);
  localStorageHandler=inject(LocalStorageHandler);
  httpRequestHandler=inject(HttpRequestHandler);
  private store= inject(Store<UserState>);
  router=inject(Router)
  showSearch: boolean = false;
  destroy$=new Subject<void>();


  constructor(private userService:UserService){
    this.searchSubject.pipe(
      debounceTime(700),
      switchMap(userId=>{
        this.store.dispatch(fromActions.ClearSearchAction());
        if(!userId)return of(null)
        this.store.dispatch(fromActions.LoadingStatusChange({loading_status:LOADING_STATUS.LOADING}))
        return this.userService.findUser(userId,[this.storeHandler,this.localStorageHandler,this.httpRequestHandler]).pipe(take(1))
      })
    ).subscribe({
      next:(user:User|null|"{}")=>{
        if(!user) return
        if(user && user !==JSON.stringify({})) return this.store.dispatch(fromActions.LoadUserSuccess(user as User));
        this.store.dispatch(fromActions.LoadUserFailureAction({error:new Error(JSON.stringify({}))}));
        this.store.dispatch(fromActions.LoadingStatusChange({loading_status:LOADING_STATUS.NOT_LOADED}));
      }
    });
  }

  ngOnInit() {
    // Subscribe to router events to check the current route
    this.router.events.pipe(takeUntil(this.destroy$)).subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.checkRoute();
      }
    });
  }

  /**
   * Check if the current URL ends with the '/users' route to display the input search
   */
  checkRoute() {
    this.showSearch = this.router.url.endsWith('/users');
  }

  searchUser(event:Event){
    //TODO Directive
    const val=+(event.target as HTMLInputElement).value
    this.searchSubject.next(val)
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.destroy$.next();
    this.destroy$.complete();
  }
}
