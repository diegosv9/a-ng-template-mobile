import { NgClass } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Task } from 'src/app/task/domain/task.model';
import { lucideCheck, lucideTrash } from '@ng-icons/lucide';
import { TasksState } from '../../../states/tasks-state.service';

@Component({
  selector: 'app-tasks-list-item',
  imports: [NgClass, NgIcon],
  providers: [provideIcons({ lucideCheck, lucideTrash })],
  templateUrl: './tasks-list-item.component.html',
  styleUrl: './tasks-list-item.component.css',
  host: {
    class:
      'border-zinc-00 flex w-full cursor-pointer flex-row gap-2 rounded-xl border border-zinc-200 bg-zinc-100 p-2 select-none dark:border-zinc-800 dark:bg-zinc-900 items-center justify-between hover:bg-zinc-200 dark:hover:bg-zinc-800',
    '[class.line-through]': 'task()?.completed',
    '[class.text-zinc-500]': 'task()?.completed',
  },
})
export class TasksListItemComponent {
  task = model<Task>();

  #tasksState = inject(TasksState);

  async toggleTasksCompletion(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
    this.task()!.completed = !this.task()?.completed;
    this.#tasksState.editTask(this.task()!);
  }

  async deleteTask(event: Event) {
    event.stopPropagation();
    event.preventDefault();
    event.stopImmediatePropagation();
    const taskId = this.task()!.id;
    this.#tasksState.removeTask(taskId!);
  }
}
