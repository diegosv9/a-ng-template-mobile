import { Routes } from '@angular/router';
import { TasksPageComponent } from './task/presentation/components/tasks-page/tasks-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks',
    component: TasksPageComponent,
  },
];
