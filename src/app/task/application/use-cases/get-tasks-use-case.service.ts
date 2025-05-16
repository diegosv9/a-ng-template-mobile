import { inject, Injectable } from '@angular/core';
import { Task } from '../../domain/task.model';
import { TASKS_CLIENT } from '../ports/tasks-client.port';

@Injectable({
  providedIn: 'root',
})
export class GetTasksUseCase {
  taskClient = inject(TASKS_CLIENT);

  execute(): Promise<Task[]> {
    return this.taskClient.getTasks();
  }
}
