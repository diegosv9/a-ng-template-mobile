import { TestBed } from '@angular/core/testing';
import { CreateTaskUseCase } from './create-task.service';
import { TASKS_CLIENT } from '../ports/tasks-client.port';

describe('CreateTaskUseCase', () => {
  let service: CreateTaskUseCase;
  const mockTasksClient = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TASKS_CLIENT, useValue: mockTasksClient }],
    });
    service = TestBed.inject(CreateTaskUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
