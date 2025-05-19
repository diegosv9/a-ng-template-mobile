import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TasksListItemComponent } from './tasks-list-item.component';
import { TasksState } from '../../../states/tasks-state.service';

describe('TasksListItemComponent', () => {
  let component: TasksListItemComponent;
  let fixture: ComponentFixture<TasksListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TasksListItemComponent],
      providers: [{ provide: TasksState, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TasksListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
