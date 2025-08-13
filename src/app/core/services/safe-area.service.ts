import { Injectable } from '@angular/core';
import { SafeArea, initialize } from '@capacitor-community/safe-area';
import { Capacitor } from '@capacitor/core';

@Injectable({
  providedIn: 'root',
})
export class SafeAreaService {
  async initializeSafeArea(): Promise<void> {
    // Initialize CSS variables for all platforms
    initialize();

    // Enable safe area plugin for native platforms with edge-to-edge mode
    if (Capacitor.isNativePlatform()) {
      try {
        await SafeArea.enable({
          config: {
            customColorsForSystemBars: true,
            statusBarColor: '#98F7DC', // Match the theme color from capacitor config
            statusBarContent: 'dark',
            navigationBarColor: '#98F7DC',
            navigationBarContent: 'dark',
          },
        });
      } catch (error) {
        console.warn('Could not enable safe area plugin:', error);
      }
    }
  }
}