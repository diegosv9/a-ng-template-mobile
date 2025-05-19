import { inject, Injectable } from '@angular/core';
import { TASKS_CLIENT } from '../ports/tasks-client.port';

@Injectable({
  providedIn: 'root',
})
export class DeleteTaskUseCase {
  #taskClient = inject(TASKS_CLIENT);

  execute(id: string): Promise<void> {
    return this.#taskClient.deleteTask(id);
  }
}
