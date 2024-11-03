import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatMenuModule} from '@angular/material/menu';
import { User } from '../../models/user';
import { AppHighlightDirective } from '../../directives/app-highlight.directive';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports:[CommonModule,RouterModule,MatProgressSpinnerModule,MatMenuModule,MatPaginatorModule,AppHighlightDirective,MatTooltip]
,
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.scss',
})
export class UserCardComponent { 
  user=input<User>();
  withAction=input<boolean>(true);
}
