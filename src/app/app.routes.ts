import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { Users } from './components/users/users';

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
    path: 'users',
    component: Users,
  },
];
