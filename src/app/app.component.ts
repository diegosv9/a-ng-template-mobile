import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeToggleComponent } from './shared/components/theme-toggle/theme-toggle.component';
import { TranslocoPipe } from '@jsverse/transloco';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMenu } from '@ng-icons/lucide';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ThemeToggleComponent, TranslocoPipe, NgIcon],
  providers: [provideIcons({ lucideMenu })],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
