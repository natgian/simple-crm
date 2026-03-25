import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { User } from './user/user';

export const routes: Routes = [
  {
    path: '',
    component: Dashboard,
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
  {
    path: 'user',
    component: User,
  },
];
