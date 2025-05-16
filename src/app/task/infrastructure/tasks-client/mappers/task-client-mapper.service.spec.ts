import { TestBed } from '@angular/core/testing';

import { TaskClientMapper } from './task-client-mapper.service';

describe('TaskClientMapperService', () => {
  let service: TaskClientMapper;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaskClientMapper],
    });
    service = TestBed.inject(TaskClientMapper);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
