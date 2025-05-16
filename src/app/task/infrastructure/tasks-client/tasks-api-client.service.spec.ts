import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TasksAPIClient } from './tasks-api-client.service';

describe('TasksAPIClientService', () => {
  let service: TasksAPIClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TasksAPIClient],
    });
    service = TestBed.inject(TasksAPIClient);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
