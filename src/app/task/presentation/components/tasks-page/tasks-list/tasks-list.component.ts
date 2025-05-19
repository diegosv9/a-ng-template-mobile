import { Component, inject } from '@angular/core';
import { TasksState } from '../../../states/tasks-state.service';
import { TasksListItemComponent } from '../tasks-list-item/tasks-list-item.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'app-tasks-list',
  imports: [TasksListItemComponent, AddTaskComponent],
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  host: {
    class: 'flex w-full flex-col items-center justify-center gap-2',
  },
})
export class TasksListComponent {
  tasksState = inject(TasksState);

  tasks = this.tasksState.value;
}
