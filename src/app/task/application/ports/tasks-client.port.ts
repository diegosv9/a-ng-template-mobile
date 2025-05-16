import { InjectionToken } from '@angular/core';
import { Task } from '../../domain/task.model';

export interface TasksClientPort {
  getTasks(): Promise<Task[]>;
  //   getTask(id: string): Promise<Task>;
  //   createTask(task: Task): Promise<Task>;
  //   updateTask(id: string, task: Task): Promise<Task>;
  //   deleteTask(id: string): Promise<void>;
}

export const TASKS_CLIENT = new InjectionToken<TasksClientPort>('TasksClient');
