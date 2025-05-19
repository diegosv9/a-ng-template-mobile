import { Injectable } from '@angular/core';
import { Task } from 'src/app/task/domain/task.model';
import { TaskDTO } from 'src/generated/api/tasks/model';

@Injectable({
  providedIn: 'root',
})
export class TaskClientMapper {
  toDomain(taskDTO: TaskDTO): Task {
    return {
      id: taskDTO.id,
      title: taskDTO.title,
      description: taskDTO.description,
      completed: taskDTO.completed,
      createdAt: taskDTO.createdAt ? new Date(taskDTO.createdAt) : undefined,
      updatedAt: taskDTO.updatedAt ? new Date(taskDTO.updatedAt) : undefined,
    };
  }

  toDto(task: Task): TaskDTO {
    return {
      id: task.id,
      title: task.title,
      description: task.description,
      completed: task.completed,
    };
  }
}
