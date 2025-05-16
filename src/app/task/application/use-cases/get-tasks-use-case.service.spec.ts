import { TestBed } from '@angular/core/testing';
import { GetTasksUseCase } from './get-tasks-use-case.service';
import { TASKS_CLIENT } from '../ports/tasks-client.port';

describe('GetTasks', () => {
  let service: GetTasksUseCase;
  const mockTasksClient = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: TASKS_CLIENT, useValue: mockTasksClient }],
    });
    service = TestBed.inject(GetTasksUseCase);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
