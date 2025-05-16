import { Component, inject, linkedSignal } from '@angular/core';
import { SelectButton, SelectButtonChangeEvent } from 'primeng/selectbutton';
import { FormsModule } from '@angular/forms';
import { ReactiveLocalStorage } from '../../services/reactive-local-storage.service';

@Component({
  selector: 'app-theme-selector',
  imports: [SelectButton, FormsModule],
  templateUrl: './theme-selector.component.html',
  styleUrl: './theme-selector.component.css',
})
export class ThemeSelectorComponent {
  #webStorage = inject(ReactiveLocalStorage);

  stateOptions: { label: string; value: string }[] = [
    { label: 'Claro', value: 'light' },
    { label: 'Oscuro', value: 'dark' },
    { label: 'Sistema', value: 'system' },
  ];
  selectedOption = linkedSignal<'light' | 'dark' | 'system'>(() => {
    let theme = this.#webStorage.getItem('theme');
    if (theme === undefined) {
      this.#webStorage.setItem('theme', 'system');
      theme = this.#webStorage.getItem('theme');
      return 'system';
    }
    return theme() as 'light' | 'dark' | 'system';
  });

  onSelectChange(event: SelectButtonChangeEvent) {
    switch (event.value) {
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
  }

  #setDarkTheme() {
    document.body.classList.add('dark');
    this.#webStorage.setItem('theme', 'dark');
  }

  #setLightTheme() {
    document.body.classList.remove('dark');
    this.#webStorage.setItem('theme', 'light');
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
  }
}
