import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InjectionToken } from '@angular/core';
import { AddTaskComponent } from './add-task.component';
import { TasksState } from '../../../states/tasks-state.service';
import { GetTasksUseCase } from 'src/app/task/application/use-cases/get-tasks-use-case.service';
import {
  DefaultTranspiler,
  TRANSLOCO_FALLBACK_STRATEGY,
  TRANSLOCO_INTERCEPTOR,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_TRANSPILER,
} from '@jsverse/transloco';

describe('AddTaskComponent', () => {
  let component: AddTaskComponent;
  let fixture: ComponentFixture<AddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddTaskComponent],
      providers: [
        {
          provide: new InjectionToken('TasksClient'),
          useValue: {},
        },
        {
          provide: TasksState,
          useValue: {},
        },
        {
          provide: GetTasksUseCase,
          useValue: {},
        },
        { provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler },
        { provide: TRANSLOCO_MISSING_HANDLER, useValue: (key: string) => key },
        { provide: TRANSLOCO_INTERCEPTOR, useValue: [] },
        { provide: TRANSLOCO_FALLBACK_STRATEGY, useValue: 'all' },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
