import { Component } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-tasks-page',
  imports: [TasksListComponent, TranslocoPipe],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  host: {
    class: 'mx-auto flex w-full flex-col items-center justify-center',
  },
})
export class TasksPageComponent {}
