import { Injectable } from '@angular/core';
import { TaskDTO } from '../dtos/task-dto';
import { Task } from 'src/app/task/domain/task.model';

@Injectable({
  providedIn: 'root',
})
export class TaskClientMapper {
  mapToDomain(taskDTO: TaskDTO): Task {
    return {
      id: taskDTO.id,
      title: taskDTO.title,
      description: taskDTO.description,
      completed: taskDTO.completed,
      createdAt: new Date(taskDTO.createdAt),
      updatedAt: new Date(taskDTO.updatedAt),
    };
  }

  mapToDto(task: Task): TaskDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
      createdAt: task.createdAt.toISOString(),
      updatedAt: task.updatedAt.toISOString(),
    };
  }
}
