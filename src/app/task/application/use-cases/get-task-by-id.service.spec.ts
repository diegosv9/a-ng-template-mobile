import { TestBed } from '@angular/core/testing';
import { GetTaskByIdUseCase } from './get-task-by-id.service';
import { TASKS_CLIENT } from '../ports/tasks-client.port';
import { Task } from '../../domain/task.model';

describe('GetTaskByIdUseCase', () => {
  let service: GetTaskByIdUseCase;
  const mockTask: Task = {
    id: '123',
    title: 'Test Task',
    description: 'Test Description',
    completed: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockTasksClient = {
    getTask: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        GetTaskByIdUseCase,
        { provide: TASKS_CLIENT, useValue: mockTasksClient },
      ],
    });
    service = TestBed.inject(GetTaskByIdUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getTask on the client with correct id', async () => {
    // Arrange
    const taskId = '123';
    mockTasksClient.getTask.mockResolvedValue(mockTask);

    // Act
    const result = await service.execute(taskId);

    // Assert
    expect(mockTasksClient.getTask).toHaveBeenCalledWith(taskId);
    expect(result).toEqual(mockTask);
  });

  it('should propagate errors from the client', async () => {
    // Arrange
    const taskId = '123';
    const error = new Error('Task not found');
    mockTasksClient.getTask.mockRejectedValue(error);

    // Act & Assert
    await expect(service.execute(taskId)).rejects.toThrow(error);
  });
});
