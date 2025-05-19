import { inject, Injectable } from '@angular/core';
import { TasksClientPort } from '../../application/ports/tasks-client.port';
import { Task } from '../../domain/task.model';
import { TaskClientMapper } from './mappers/task-client-mapper.service';
import { TaskAPIService } from 'src/generated/api/tasks/service/tasks.service';
import { map, firstValueFrom } from 'rxjs';
import { TaskDTO } from 'src/generated/api/tasks/model';

@Injectable({
  providedIn: 'root',
})
export class TasksAPIClient implements TasksClientPort {
  taskClient = inject(TaskAPIService);
  taskClientMapper = inject(TaskClientMapper);

  getTasks(): Promise<Task[]> {
    return firstValueFrom(
      this.taskClient
        .getTasks()
        .pipe(
          map((tasks: TaskDTO[]) =>
            tasks.map((task) => this.taskClientMapper.toDomain(task)),
          ),
        ),
    );
  }

  getTask(id: string): Promise<Task> {
    return firstValueFrom(
      this.taskClient
        .getTasksTaskId(id)
        .pipe(map((task: TaskDTO) => this.taskClientMapper.toDomain(task))),
    );
  }

  createTask(title: string, description: string): Promise<Task> {
    const task: Task = {
      id: '',
      title,
      description,
      completed: false,
      createdAt: undefined,
      updatedAt: undefined,
    };
    const taskDTO = this.taskClientMapper.toDto(task);
    return firstValueFrom(
      this.taskClient
        .postTasks(taskDTO)
        .pipe(map((task: TaskDTO) => this.taskClientMapper.toDomain(task))),
    );
  }

  async updateTask(id: string, task: Task): Promise<Task> {
    const taskDTO = this.taskClientMapper.toDto(task);
    return await firstValueFrom(
      this.taskClient
        .putTasksTaskId(id, taskDTO)
        .pipe(map((task: TaskDTO) => this.taskClientMapper.toDomain(task))),
    );
  }

  deleteTask(id: string): Promise<void> {
    return firstValueFrom(this.taskClient.deleteTasksTaskId(id));
  }
}
