import { TestBed } from '@angular/core/testing';
import { EditTaskUseCase } from './edit-task.service';
import { TASKS_CLIENT } from '../ports/tasks-client.port';
import { Task } from '../../domain/task.model';

describe('EditTaskUseCase', () => {
  let service: EditTaskUseCase;
  const mockTasksClient = {
    updateTask: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EditTaskUseCase,
        { provide: TASKS_CLIENT, useValue: mockTasksClient },
      ],
    });
    service = TestBed.inject(EditTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call updateTask on the client with correct parameters', async () => {
    // Arrange
    const taskId = '123';
    const task: Task = {
      id: taskId,
      title: 'Test Task',
      description: 'Test Description',
      completed: false,
    };
    mockTasksClient.updateTask.mockResolvedValue(task);

    // Act
    const result = await service.execute(task);

    // Assert
    expect(mockTasksClient.updateTask).toHaveBeenCalledWith(taskId, task);
    expect(result).toEqual(task);
  });
});
