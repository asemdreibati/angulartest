import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../../models/user';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../services/user.service';
import { UserCardComponent } from '../user-card/user-card.component';
import { Handlers_Types } from '../../handlers/handlers-types';

@Component({
  selector: 'user-details',
  templateUrl: 'user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatCardModule,
    UserCardComponent,
  ],
})
export class UserDetailsComponent implements OnInit {
  user$: Observable<User | null>;
  activatedRoute = inject(ActivatedRoute);

  constructor(private readonly userService: UserService) {}

  ngOnInit(): void {
    const userId = +this.activatedRoute.snapshot.params?.['id'];
    this.user$ = this.userService.findUser(userId);
  }
}
