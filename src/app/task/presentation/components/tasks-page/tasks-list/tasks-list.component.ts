import { Component, inject } from '@angular/core';
import { TasksState } from '../../../states/tasks-state.service';
import { TasksListItemComponent } from '../tasks-list-item/tasks-list-item.component';

@Component({
  selector: 'app-tasks-list',
  imports: [TasksListItemComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
})
export class TasksListComponent {
  tasksState = inject(TasksState);

  tasks = this.tasksState.tasks.value;
  isLoading = this.tasksState.tasks.isLoading;
}
