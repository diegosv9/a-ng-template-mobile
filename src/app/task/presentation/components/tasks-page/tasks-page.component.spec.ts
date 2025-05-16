import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksPageComponent } from './tasks-page.component';
import {
  DefaultTranspiler,
  TRANSLOCO_TRANSPILER,
  TRANSLOCO_MISSING_HANDLER,
  TRANSLOCO_INTERCEPTOR,
  TRANSLOCO_FALLBACK_STRATEGY,
} from '@jsverse/transloco';
import { TASKS_CLIENT } from 'src/app/task/application/ports/tasks-client.port';

describe('TasksPageComponent', () => {
  let component: TasksPageComponent;
  let fixture: ComponentFixture<TasksPageComponent>;
  const mockTasksClient = {};

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksPageComponent],
      providers: [
        { provide: TRANSLOCO_TRANSPILER, useClass: DefaultTranspiler },
        { provide: TRANSLOCO_MISSING_HANDLER, useValue: (key: string) => key },
        { provide: TRANSLOCO_INTERCEPTOR, useValue: [] },
        { provide: TRANSLOCO_FALLBACK_STRATEGY, useValue: 'all' },
        { provide: TASKS_CLIENT, useValue: mockTasksClient },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
