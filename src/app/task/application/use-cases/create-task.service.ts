import { inject, Injectable } from '@angular/core';
import { TASKS_CLIENT } from '../ports/tasks-client.port';
import { Task } from '../../domain/task.model';

@Injectable({
  providedIn: 'root',
})
export class CreateTaskUseCase {
  #taskClient = inject(TASKS_CLIENT);

  execute(title: string, description?: string): Promise<Task> {
    return this.#taskClient.createTask(title, description);
  }
}
