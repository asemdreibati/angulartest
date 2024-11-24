import { Component, OnDestroy } from '@angular/core';
import { Observable, Subject, shareReplay, take, takeUntil } from 'rxjs';
import * as reducer from '../../reducers/user.reducer';
import { User, UsersInfo } from '../../models/user';
import { Store } from '@ngrx/store';
import { LOADING_STATUS, UserState } from '../../reducers/app.states';

import * as actions from '../../actions/user.actions';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatMenuModule } from '@angular/material/menu';
import { UserCardComponent } from '../user-card/user-card.component';
import {
  cardAnimation,
  headerAnimation,
} from '../../animations/dashboard.animations';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    MatPaginatorModule,
    UserCardComponent,
  ],
  animations: [cardAnimation, headerAnimation],
})
export class UserListComponent implements OnDestroy {
  usersInfo$: Observable<UsersInfo>;
  searchedUser$: Observable<User | null>;
  loading$: Observable<LOADING_STATUS>;
  pageIndex: number = 0;
  animationState = 'hide';
  destroy$: Subject<void> = new Subject();

  constructor(private readonly store: Store<UserState>) {
    this.usersInfo$ = this.store.select(reducer.getUsersInfo);
    this.searchedUser$ = this.store
      .select(reducer.getSearchedUser)
      .pipe(shareReplay());
    this.loading$ = this.store
      .select(reducer.getLoadingState)
      .pipe(shareReplay());
    this.store
      .select(reducer.getPageIndex)
      .pipe(takeUntil(this.destroy$))
      .subscribe((pageIndex) => (this.pageIndex = pageIndex - 1));

    this.usersInfo$.pipe(take(1)).subscribe((users_info) => {
      if (!users_info.data.length) {
        return this.loadUsers(1);
      }
    });
  }

  loadUsers(page: number) {
    this.store.dispatch(actions.LoadUsers({ page }));
    this.changeAnimation('hide');
  }

  paginatorChanged({ pageIndex }: PageEvent) {
    this.loadUsers(pageIndex + 1);
  }

  ngAfterContentChecked(): void {
    this.changeAnimation('show');
  }

  changeAnimation(state: 'show' | 'hide') {
    setTimeout(() => {
      this.animationState = state;
    }, 10);
  }

  ngOnDestroy(): void {
    this.store.dispatch(actions.ClearSearchAction());
    this.destroy$.next();
    this.destroy$.complete();
  }
}

//TODO use global loader
