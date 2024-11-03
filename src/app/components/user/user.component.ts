import { Store } from '@ngrx/store';
import { Component, OnInit, inject } from '@angular/core';    
import { Observable } from 'rxjs';
import * as fromActions from '../../actions/user.actions';
import { UserState } from '../../reducers/app.states';
import { User } from '../../models/user';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import { HttpRequestHandler } from '../../handlers/http-request-handler';
import { UserService } from '../../services/user.service';
import { StoreHandler } from '../../handlers/store-handler';
import { LocalStorageHandler } from '../../handlers/local-storage-handler';
import { UserCardComponent } from '../user-card/user-card.component';

@Component({
	selector: 'app-user',
	templateUrl: 'user.component.html',
	styleUrls:['./user.component.scss'],
	standalone: true,
	imports:[CommonModule,RouterModule,MatProgressSpinnerModule,MatCardModule,UserCardComponent]
})
export class UserComponent implements OnInit {
	user$: Observable<User|null>;
	activatedRoute=inject(ActivatedRoute);
	storeHandler=inject(StoreHandler);
    localStorageHandler=inject(LocalStorageHandler);
	httpRequestHandler=inject(HttpRequestHandler)
	constructor(private store: Store<UserState>,private userService:UserService,) {}
	
	ngOnInit(): void {
		const userId=+this.activatedRoute.snapshot.params?.['id'];
		this.store.dispatch(fromActions.SelectedUser({userId}))
		this.user$ = this.userService.findUser(userId,[this.storeHandler,this.localStorageHandler,this.httpRequestHandler])
	}

}	

