import { inject, Injectable } from '@angular/core';
import { TASKS_CLIENT } from '../ports/tasks-client.port';
import { Task } from '../../domain/task.model';

@Injectable({
  providedIn: 'root',
})
export class EditTaskUseCase {
  #taskClient = inject(TASKS_CLIENT);

  execute(task: Task): Promise<Task> {
    return this.#taskClient.updateTask(task.id!, task);
  }
}
