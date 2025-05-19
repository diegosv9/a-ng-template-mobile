import { inject, Injectable } from '@angular/core';
import { TASKS_CLIENT } from '../ports/tasks-client.port';
import { Task } from '../../domain/task.model';

@Injectable({
  providedIn: 'root',
})
export class GetTaskByIdUseCase {
  #taskClient = inject(TASKS_CLIENT);

  execute(id: string): Promise<Task> {
    return this.#taskClient.getTask(id);
  }
}
