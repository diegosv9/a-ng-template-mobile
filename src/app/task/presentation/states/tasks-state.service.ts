import { inject, Injectable, resource } from '@angular/core';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks-use-case.service';

@Injectable({
  providedIn: 'root',
})
export class TasksState {
  getTasksUseCase = inject(GetTasksUseCase);

  tasks = resource({
    defaultValue: [],
    loader: () => {
      return this.getTasksUseCase.execute();
    },
  });

  getTasks() {
    return this.tasks.reload();
  }
}
