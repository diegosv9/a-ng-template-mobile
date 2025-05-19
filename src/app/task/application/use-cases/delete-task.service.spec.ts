import { TestBed } from '@angular/core/testing';
import { DeleteTaskUseCase } from './delete-task.service';
import { TASKS_CLIENT } from '../ports/tasks-client.port';

describe('DeleteTaskUseCase', () => {
  let service: DeleteTaskUseCase;
  const mockTasksClient = {
    deleteTask: jest.fn(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeleteTaskUseCase,
        { provide: TASKS_CLIENT, useValue: mockTasksClient },
      ],
    });
    service = TestBed.inject(DeleteTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call deleteTask on the client with correct id', async () => {
    // Arrange
    const taskId = '123';
    mockTasksClient.deleteTask.mockResolvedValue(undefined);

    // Act
    await service.execute(taskId);

    // Assert
    expect(mockTasksClient.deleteTask).toHaveBeenCalledWith(taskId);
  });

  it('should propagate errors from the client', async () => {
    // Arrange
    const taskId = '123';
    const error = new Error('Delete failed');
    mockTasksClient.deleteTask.mockRejectedValue(error);

    // Act & Assert
    await expect(service.execute(taskId)).rejects.toThrow(error);
  });
});
