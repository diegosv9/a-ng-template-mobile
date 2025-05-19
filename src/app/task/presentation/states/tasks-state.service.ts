import { computed, inject, Injectable, resource } from '@angular/core';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks-use-case.service';
import { EditTaskUseCase } from '../../application/use-cases/edit-task.service';
import { DeleteTaskUseCase } from '../../application/use-cases/delete-task.service';
import { Task } from '../../domain/task.model';
import { CreateTaskUseCase } from '../../application/use-cases/create-task.service';

@Injectable({
  providedIn: 'root',
})
export class TasksState {
  #getTasksUseCase = inject(GetTasksUseCase);
  #createTaskUseCase = inject(CreateTaskUseCase);
  #editTaskUseCase = inject(EditTaskUseCase);
  #deleteTaskUseCase = inject(DeleteTaskUseCase);

  #tasksResource = resource({
    defaultValue: [],
    loader: () => {
      return this.#getTasksUseCase.execute();
    },
  });

  value = computed(() => {
    return this.#tasksResource
      .value()
      .sort((a, b) => {
        return a.createdAt! > b.createdAt! ? -1 : 1;
      })
      .sort((a, b) => {
        return a.completed === b.completed ? 0 : a.completed ? 1 : -1;
      });
  });
  isLoading = this.#tasksResource.isLoading;
  error = this.#tasksResource.error;
  isEmpty = this.#tasksResource.status;

  addTask(title: string, description?: string) {
    return this.#createTaskUseCase
      .execute(title, description)
      .catch((error) => {
        console.error('Error creating task:', error);
      })
      .finally(() => {
        // Reload the tasks after adding a new task
        this.#tasksResource.reload();
      });
  }

  editTask(task: Task) {
    // Optimistically update the task in the state
    this.#tasksResource.update((tasks) => {
      return tasks.map((t) => (t.id === task.id ? { ...t, ...task } : t));
    });
    return this.#editTaskUseCase.execute(task).catch((error) => {
      console.error('Error updating task:', error);
      // Revert to previous state on error
      this.#tasksResource.reload();
    });
  }

  removeTask(taskId: string) {
    // Optimistically remove the task from the state
    this.#tasksResource.update((tasks) => {
      return tasks.filter((task) => task.id !== taskId);
    });
    return this.#deleteTaskUseCase.execute(taskId).catch((error) => {
      console.error('Error deleting task:', error);
      // Revert to previous state on error
      this.#tasksResource.reload();
    });
  }
}
