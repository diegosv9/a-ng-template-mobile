import { Component, inject, signal } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideArrowUp, lucideLoaderCircle } from '@ng-icons/lucide';
import { IconFieldModule } from 'primeng/iconfield';
import { InputTextModule } from 'primeng/inputtext';
import { InputIconModule } from 'primeng/inputicon';
import { TasksState } from '../../../states/tasks-state.service';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-add-task',
  imports: [
    NgIcon,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    TranslocoPipe,
    ReactiveFormsModule,
  ],
  providers: [provideIcons({ lucideLoaderCircle, lucideArrowUp })],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css',
  host: {
    class: 'w-full',
  },
})
export class AddTaskComponent {
  #tasksState = inject(TasksState);

  icon = signal('lucideArrowUp');
  title = new FormControl('');

  addTask() {
    this.title.disable();
    this.icon.set('lucideLoaderCircle');
    if (this.title.value !== null && this.title.value !== '') {
      this.#tasksState.addTask(this.title.value).finally(() => {
        this.icon.set('lucideArrowUp');
        this.title.setValue('');
        this.title.enable();
      });
    } else {
      this.icon.set('lucideArrowUp');
      this.title.enable();
    }
  }

  onKeypressEnter(event: KeyboardEvent): void {
    if (event.key === 'Enter') {
      this.addTask();
    }
  }
}
