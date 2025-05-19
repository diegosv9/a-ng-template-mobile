import { Component, inject } from '@angular/core';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { TasksState } from '../../states/tasks-state.service';

@Component({
  selector: 'app-tasks-page',
  imports: [TasksListComponent, TranslocoPipe, ProgressSpinnerModule],
  templateUrl: './tasks-page.component.html',
  styleUrl: './tasks-page.component.css',
  host: {
    class: 'mx-auto max-w-md flex w-full flex-col items-center justify-center',
  },
})
export class TasksPageComponent {
  tasksState = inject(TasksState);

  isLoading = this.tasksState.isLoading;
}
