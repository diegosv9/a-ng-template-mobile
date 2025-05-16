import {
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ReactiveLocalStorage } from '../../services/reactive-local-storage.service';

@Component({
  selector: 'app-theme-toggle',
  imports: [ButtonModule],
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.css',
})
export class ThemeToggleComponent {
  #webStorage = inject(ReactiveLocalStorage);

  #theme = linkedSignal<'light' | 'dark' | 'system'>(() => {
    let theme = this.#webStorage.getItem('theme');
    if (theme === undefined) {
      this.#webStorage.setItem('theme', 'system');
      theme = this.#webStorage.getItem('theme');
      return 'system';
    }
    return theme() as 'light' | 'dark' | 'system';
  });

  toggleIcon = computed(() => {
    switch (this.#theme()) {
      case 'dark':
        return 'pi pi-moon';
      case 'light':
        return 'pi pi-sun';
      case 'system':
        return 'pi pi-desktop';
      default:
        return 'pi pi-desktop';
    }
  });

  constructor() {
    effect(() => {
      const theme = this.#theme();
      switch (theme) {
        case 'dark':
          this.#setDarkTheme();
          break;
        case 'light':
          this.#setLightTheme();
          break;
        case 'system':
          this.#setSystemTheme();
          break;
        default:
          this.#setLightTheme();
      }
    });
  }

  switchTheme() {
    switch (this.#theme()) {
      case 'dark':
        this.#setLightTheme();
        break;
      case 'light':
        this.#setSystemTheme();
        break;
      case 'system':
        this.#setDarkTheme();
        break;
      default:
        this.#setLightTheme();
    }
  }

  #setDarkTheme() {
    document.body.classList.add('dark');
    this.#webStorage.setItem('theme', 'dark');
    this.#theme.set('dark');
  }

  #setLightTheme() {
    document.body.classList.remove('dark');
    this.#webStorage.setItem('theme', 'light');
    this.#theme.set('light');
  }

  #setSystemTheme() {
    const isDarkMode = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    if (isDarkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    this.#webStorage.setItem('theme', 'system');
    this.#theme.set('system');
  }
}
