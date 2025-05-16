import { TestBed } from '@angular/core/testing';

import { ReactiveLocalStorage } from './reactive-local-storage.service';

describe('ReactiveLocalStorage', () => {
  let service: ReactiveLocalStorage;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReactiveLocalStorage);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
