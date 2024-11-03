import { Component, OnDestroy } from '@angular/core';
import { Observable, shareReplay, take } from 'rxjs';
import * as fromReducer from '../../reducers/user.reducer';
import { User, UsersInfo } from '../../models/user';
import { Store } from '@ngrx/store';
import { LOADING_STATUS, UserState } from '../../reducers/app.states';

import * as fromActions from '../../actions/user.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { UserCardComponent } from '../user-card/user-card.component';
import { cardAnimation, headerAnimation } from '../../animations/dashboard.animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone:true,
  imports:[CommonModule,RouterModule,MatProgressSpinnerModule,MatMenuModule,MatPaginatorModule,UserCardComponent],
  animations:[cardAnimation,headerAnimation]
})
export class UserListComponent implements OnDestroy{

	usersInfo$: Observable<UsersInfo>;
  searchedUser$: Observable<User|null>;
	loading$: Observable<LOADING_STATUS>;
  pageIndex:number=0;
  isSearchedUser=false
  searchedUser:User
  animationState="hide";

  constructor(private store: Store<UserState>) {
    this.usersInfo$ = this.store.select(fromReducer.getUsersInfo);
    this.usersInfo$.pipe(take(1)).subscribe(users_info=>{
      if(!users_info.data.length){
          return this.loadUsers(1)
      }
    });

    this.loading$ = this.store.select(fromReducer.getLoadingState).pipe(shareReplay())
    this.store.select(fromReducer.getPageIndex).pipe(take(1)).subscribe(pageIndex=>this.pageIndex=pageIndex-1)
    this.store.select(fromReducer.getSearchedUser).subscribe(user=>{
      if(user)
        this.searchedUser=user
      this.isSearchedUser=!!user

    })
		this.searchedUser$ = this.store.select(fromReducer.getSearchedUser).pipe(shareReplay());
  }

  loadUsers(page:number){
		this.store.dispatch(fromActions.LoadUsers({page}));
    this.changeAnimation('hide')

	}


  paginatorChanged({pageIndex}:PageEvent){
    this.pageIndex=pageIndex;
    this.loadUsers(pageIndex+1);
  }

  ngAfterContentChecked(): void {
    this.changeAnimation('show')
  }

  changeAnimation(state:'show'|'hide'){
    setTimeout(()=>{
      this.animationState=state
    },10)
  }

  ngOnDestroy(): void {
    this.store.dispatch(fromActions.ClearSearchAction());
  }

}
