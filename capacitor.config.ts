import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.example.angtemplate',
  appName: 'Another Angular Template',
  webDir: 'dist/a-ng-template/browser',
  server: {
    androidScheme: 'https',
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 0,
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
      autoHide: true,
      backgroundColor: '#98F7DC',
      androidStatusBarColor: '#98F7DC',
      iosStatusBarStyle: 'UIStatusBarStyleDarkContent',
      statusBarColor: '#98F7DC',
      spinnerColor: '#999999',
    },
  },
  ios: {
    contentInset: 'always',
  },
};

export default config;
