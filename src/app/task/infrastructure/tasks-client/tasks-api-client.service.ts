import { inject, Injectable } from '@angular/core';
import { TasksClientPort } from '../../application/ports/tasks-client.port';
import { Task } from '../../domain/task.model';
import { TaskClientMapper } from './mappers/task-client-mapper.service';
import { TaskDTO } from './dtos/task-dto';

@Injectable({
  providedIn: 'root',
})
export class TasksAPIClient implements TasksClientPort {
  taskClientMapper = inject(TaskClientMapper);

  getTasks(): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(tasks.map((task) => this.taskClientMapper.mapToDomain(task)));
      }, 1000);
    });
  }

  // getTask(id: string): Promise<Task> {
  //   throw new Error('Method not implemented.');
  // }
  // createTask(task: Task): Promise<Task> {
  //   throw new Error('Method not implemented.');
  // }
  // updateTask(id: string, task: Task): Promise<Task> {
  //   throw new Error('Method not implemented.');
  // }
  // deleteTask(id: string): Promise<void> {
  //   throw new Error('Method not implemented.');
  // }
}

const tasks: TaskDTO[] = [
  {
    id: '1',
    title: 'Rename the project',
    description: 'Rename the project to something more meaningful',
    completed: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'Start coding',
    description: 'Start coding the project',
    completed: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];
