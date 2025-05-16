import { NgClass } from '@angular/common';
import { Component, model } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { Task } from 'src/app/task/domain/task.model';
import { lucideCheck } from '@ng-icons/lucide';

@Component({
  selector: 'app-tasks-list-item',
  imports: [NgClass, NgIcon],
  providers: [provideIcons({ lucideCheck })],
  templateUrl: './tasks-list-item.component.html',
  styleUrl: './tasks-list-item.component.css',
  host: {
    class:
      'border-zinc-00 flex w-full cursor-pointer flex-row gap-2 rounded-xl border border-zinc-200 bg-zinc-100 p-2 select-none dark:border-zinc-800 dark:bg-zinc-900',
  },
})
export class TasksListItemComponent {
  task = model<Task>();
}
