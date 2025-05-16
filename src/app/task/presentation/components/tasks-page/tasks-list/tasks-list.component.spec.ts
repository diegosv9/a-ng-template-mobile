import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListComponent } from './tasks-list.component';
import { TasksState } from '../../../states/tasks-state.service';
import { GetTasksUseCase } from 'src/app/task/application/use-cases/get-tasks-use-case.service';
import { TASKS_CLIENT } from 'src/app/task/application/ports/tasks-client.port';

describe('TasksListComponent', () => {
  let component: TasksListComponent;
  let fixture: ComponentFixture<TasksListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListComponent],
      providers: [
        TasksState,
        GetTasksUseCase,
        { provide: TASKS_CLIENT, useValue: { getTasks: () => [] } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
