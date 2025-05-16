import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * A service that provides a reactive wrapper around the browser's localStorage API using Angular signals.
 * This service maintains perfect synchronization between the browser's localStorage and an internal
 * signal-based storage system.
 *
 * @class
 * @description
 * The ReactiveLocalStorage enhances the native localStorage functionality by:
 * - Providing reactive storage using Angular signals
 * - Ensuring data consistency between browser storage and application state
 * - Offering type-safe access to stored values
 * - Automatically synchronizing changes between localStorage and internal signals
 * - Providing a clean API for storage operations
 *
 * @example
 * ```typescript
 * // Inject the service
 * constructor(private storage: ReactiveLocalStorage) {}
 *
 * // Store a value
 * this.storage.setItem('theme', 'dark');
 *
 * // Get a reactive value
 * const theme = this.storage.getItem('theme');
 * // Use the value in a template
 * {{ theme() }}
 *
 * // Remove a specific value
 * this.storage.removeItem('theme');
 *
 * // Clear all storage
 * this.storage.clear();
 * ```
 */
export class ReactiveLocalStorage {
  #webStorage: ReactiveStorage = [];

  constructor() {
    this.#initStorage();
  }

  /**
   * Clears all items from web storage and resets the internal storage array.
   * This operation removes all stored key-value pairs from both the localStorage
   * and the service's internal signal-based storage system.
   *
   * @example
   * ```typescript
   * this.storage.clear();
   * ```
   */
  clear() {
    localStorage.clear();
    this.#webStorage = [];
  }

  /**
   * Retrieves a reactive value from web storage using the specified key.
   * Returns a readonly signal that will automatically update when the value changes.
   *
   * @param key - The key to search for in web storage
   * @returns A readonly signal containing the value associated with the key if found, undefined otherwise
   *
   * @example
   * ```typescript
   * const theme = this.storage.getItem('theme');
   * console.log(theme()); // Get current value
   * // In template: {{ theme() }}
   * ```
   */
  getItem(key: string) {
    return (
      this.#webStorage.find((item) => item.key === key)?.value.asReadonly() ||
      undefined
    );
  }

  /**
   * Sets a value in both the localStorage and the signal-based storage system.
   * If the key exists, it updates the value and notifies all subscribers.
   * If the key doesn't exist, it creates a new entry.
   *
   * @param key - The unique identifier for the storage item
   * @param value - The string value to be stored
   *
   * @example
   * ```typescript
   * this.storage.setItem('user-preferences', 'dark-mode');
   * ```
   */
  setItem(key: string, value: string) {
    const item = this.#webStorage.find((item) => item.key === key);
    if (item) {
      item.value.set(value);
    } else {
      this.#webStorage.push({ key, value: signal(value) });
    }
    localStorage.setItem(key, value);
  }

  /**
   * Removes an item from storage by its key.
   * This operation removes the item from both the internal signal storage
   * and the browser's localStorage, ensuring consistency across both systems.
   *
   * @param key - The key of the item to remove
   *
   * @example
   * ```typescript
   * this.storage.removeItem('user-preferences');
   * ```
   */
  removeItem(key: string) {
    const index = this.#webStorage.findIndex((item) => item.key === key);
    if (index !== -1) {
      this.#webStorage[index].value.set(undefined);
      this.#webStorage.splice(index, 1);
      localStorage.removeItem(key);
    }
  }

  /**
   * Initializes the internal storage by loading all existing items
   * from the browser's localStorage and creating corresponding signals.
   * This ensures that the service starts with a consistent state.
   *
   * @private
   */
  #initStorage() {
    const keys = Object.keys(localStorage);
    const storageList: ReactiveStorage = [];

    keys.forEach((key) => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        storageList.push({ key, value: signal(value) });
      }
    });
    this.#webStorage = storageList;
  }
}

/**
 * Represents a single item in the reactive storage system.
 * Combines a key with a writable signal that can hold a string value or undefined.
 */
interface ReactiveStorageItem {
  key: string;
  value: WritableSignal<string | undefined>;
}

/**
 * Represents the internal storage structure as an array of ReactiveStorageItems.
 * Each item combines a key with its corresponding signal-wrapped value.
 */
type ReactiveStorage = ReactiveStorageItem[];
