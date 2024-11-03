import { Routes } from '@angular/router';
import { HomeContainerComponent } from './components/home-container/home-container.component';

export const routes: Routes = [{
    path: '',
    component: HomeContainerComponent
  },
  {
    path: 'users',
    loadComponent: () => import('./components/user-list/user-list.component').then(c => c.UserListComponent)
  },
  {
    path: 'users/:id',
    loadComponent: () => import('./components/user/user.component').then(c => c.UserComponent)
  }
];
