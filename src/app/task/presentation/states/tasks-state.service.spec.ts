import { TestBed } from '@angular/core/testing';
import { TasksState } from './tasks-state.service';
import { GetTasksUseCase } from '../../application/use-cases/get-tasks-use-case.service';
import { TASKS_CLIENT } from '../../application/ports/tasks-client.port';

describe('TasksStateService', () => {
  let service: TasksState;
  const mockTasksClient = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TasksState,
        GetTasksUseCase,
        { provide: TASKS_CLIENT, useValue: mockTasksClient },
      ],
    });
    service = TestBed.inject(TasksState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
