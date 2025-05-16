# 🎨 Another Angular Template (Mobile)

## 📖 Overview

Another Angular Template is an Angular-based web and mobile application built with Angular 19.2. The application supports both web browsers and native mobile platforms through Capacitor integration.

## 🛠️ Tech Stack

- 🅰️ **Framework**: Angular ^19.2.10
- 📱 **Mobile**: Capacitor ^5.2.2
- 🎨 **UI Components**: PrimeNG ^19.1.2 with custom theming
- 💅 **Styling**: TailwindCSS ^4.1.5 with PrimeNG integration
- 🌐 **Internationalization**: Transloco ^7.6.1
- 🧪 **Unit Testing**: Jest ^29.7.0
- 🎭 **E2E Testing**: Playwright ^1.52.0

## 🚀 Getting Started

### ⚙️ Prerequisites

- 📦 Node.js management:
  - We recommend using [fnm](https://github.com/Schniz/fnm) for Node.js version management
  - A `.nvmrc` file is included specifying the compatible Node.js version
  - Note: Some tools like Husky or IDE extensions might require a globally accessible Node.js installation
- ⚡ Angular CLI 19.2.10
- 🤖 Android Studio (for Android development)
- 🍎 Xcode (for iOS development)

### 💻 Installation

1. 📥 Clone the repository
2. 📦 Install dependencies:

```bash
npm install
```

### 🛠️ Development

#### 🌐 Web Development

Start the development server:

```bash
npm start
```

Navigate to `http://localhost:4200/`. The app will automatically reload if you change any source files.

#### 📱 Mobile Development

1. Build the web application:

```bash
npm run build
```

2. Sync with mobile platforms:

For Android:

```bash
npm run capacitor:sync:android
```

For iOS:

```bash
npm run capacitor:sync:ios
```

### 📜 Available Scripts

#### 🛠️ Development

- ⚡ `ng` - Run Angular CLI commands
- 🏃 `npm start` - Start development server (runs ng serve)
- 🏗️ `npm run build` - Build the application
- 👀 `npm run watch` - Build in watch mode for development
- 🔄 `npm run e2e` - Run end-to-end tests with Angular CLI

#### 📱 Mobile Development

- 🔄 `npm run capacitor:sync` - Build and sync with both mobile platforms
- 🤖 `npm run capacitor:sync:android` - Build and sync with Android platform
- 🍎 `npm run capacitor:sync:ios` - Build and sync with iOS platform
- 🖼️ `npm run capacitor:assets:generate` - Generate assets for both platforms
- 📱 `npm run capacitor:assets:generate:android` - Generate assets for Android
- 🍏 `npm run capacitor:assets:generate:ios` - Generate assets for iOS

#### 🧪 Testing

- 🧪 `npm test` - Run Jest-based unit tests
- 🎭 `npm run test:e2e` - Run end-to-end tests with Playwright
- 📊 `npm run test:e2e:report` - Show Playwright test reports

#### 🎨 Code Quality

- 🔍 `npm run prettier:check` - Check files formatting with Prettier
- ✨ `npm run prettier:write` - Format files using Prettier
- 🚨 `npm run lint` - Lint the codebase using Angular ESLint

#### 🌐 Internationalization

- 🔤 `npm run i18n:extract` - Extract translation keys
- 🔎 `npm run i18n:find` - Find translation keys in the codebase

#### 🔄 API Generation

- 📦 `npm run generate:api` - Generate API clients from OpenAPI schemas

#### 📋 Git Hooks

- 🐶 `npm run husky:prepare` - Prepare Husky git hooks
- 📦 `npm run husky:release` - Create a new release using standard-version
- ⚠️ `npm run husky:pre-commit` - Run pre-commit hooks (lint and prettier check)
- 🚀 `npm run husky:pre-push` - Run pre-push hooks (run tests)

> 💡 **Tip**: During development, use `npm start` for the dev server with hot reload, and run `prettier:write` before committing changes to maintain code style consistency.

## 📁 Project Structure

```
├── src/                          # Source files
│   ├── app/                      # Application source code
│   │   ├── core/                 # Core module
│   │   ├── shared/               # Shared module
│   │   │   ├── components/       # Reusable components
│   │   │   └── services/         # Shared services
│   │   ├── task/                 # Task feature module
│   │   │   ├── application/      # Application layer
│   │   │   ├── domain/           # Domain layer
│   │   │   ├── infrastructure/   # Infrastructure layer
│   │   │   └── presentation/     # Presentation layer
│   │   ├── app.component.ts      # Root component
│   │   ├── app.config.ts         # App configuration
│   │   ├── app.routes.ts         # Route definitions
│   │   └── di-provider.ts        # Dependency injection providers
│   ├── environments/             # Environment configurations
│   ├── themes/                   # Theme customization
│   │   └── noir.ts               # Custom noir theme
│   ├── index.html                # Main HTML file
│   ├── main.ts                   # Application entry point
│   └── styles.css                # Global styles
├── android/                      # Android platform specific code
├── ios/                          # iOS platform specific code
├── public/                       # Public assets
│   └── i18n/                     # Internationalization files
├── coverage/                     # Test coverage reports
├── angular.json                  # Angular configuration
├── capacitor.config.ts           # Capacitor configuration
├── config.jest.ts                # Jest test configuration
├── eslint.config.js              # ESLint configuration
├── jest.config.js                # Jest main configuration
├── transloco.config.ts           # Transloco i18n configuration
└── tsconfig.json                 # TypeScript configuration
```

## 🎨 Styling and Theming

The project uses a combination of:

- 🎯 TailwindCSS 4.1.5 for utility-first CSS
- 🎪 PrimeNG 19.1.2 components with custom theming
- ⚛️ Custom noir theme configuration in `themes/noir.ts`
- 💅 TailwindCSS PrimeNG integration via tailwindcss-primeui

### 🎭 Theme Customization

You can create and customize themes in the `themes/` directory. Each theme should be a TypeScript file that exports the theme configuration.

1. Create a new theme (e.g., `themes/custom-theme.ts`):

```typescript
import { Theme } from 'primeng/api';

export const customTheme: Theme = {
  name: 'custom-theme',
  colors: {
    primary: '#FF5733',
    // ... other color definitions
  },
  // ... other theme properties
};
```

2. Import and register your theme in `app.config.ts`:

```typescript
import { ApplicationConfig } from '@angular/core';
import { customTheme } from './themes/custom-theme';

export const appConfig: ApplicationConfig = {
  providers: [
    {
      provide: PRIMENG_THEME,
      useValue: customTheme, // or 'noir' for the default noir theme
    },
    // ... other providers
  ],
};
```

3. Apply theme styles in `styles.css`:

```css
@import 'primeng/resources/themes/custom-theme/theme.css';
```

> 💡 **Tip**: You can switch themes dynamically by updating the PRIMENG_THEME provider value at runtime using the ThemeService.

## 📱 Mobile Development

### 🤖 Android

1. Ensure Android Studio is properly configured
2. Run `npm run capacitor:sync:android` to sync the latest web build
3. Open `android/` directory in Android Studio
4. Build and run on your device or emulator

> 💡 **Tip**: Check `android/app/build.gradle` for Android-specific configurations

### 🍎 iOS

1. Ensure Xcode is installed and updated
2. Run `npm run capacitor:sync:ios` to sync the latest web build
3. Open `ios/App/App.xcworkspace` in Xcode
4. Build and run on your device or simulator

> 💡 **Tip**: Review `ios/App/Podfile` for iOS dependencies management

### 🎨 Icon Generation for Capacitor

The project includes a set of icons for mobile platforms in the `icons/` directory. These icons are used by Capacitor to generate platform-specific icons for Android and iOS.

#### 📱 Icon Requirements

- Source icon should be at least 512x512 pixels
- PNG format recommended
- For Android:
  - Adaptive icons using `icon-background.png` and `icon-foreground.png`
  - Located in `assets/` directory
- For iOS:
  - Single icon image
  - Located in `assets/icon-only.png`

#### 🛠️ Icon Generation

1. Place your source icons in the `assets/` directory:

   ```
   assets/
   ├── icon-background.png    # Android adaptive icon background
   ├── icon-foreground.png    # Android adaptive icon foreground
   ├── icon-only.png          # iOS icon
   ├── splash-dark.png        # Dark mode splash screen
   └── splash.png             # Light mode splash screen
   ```

2. Capacitor will automatically generate the required icon sizes during the build process:

   ```
   icons/
   ├── icon-48.webp
   ├── icon-72.webp
   ├── icon-96.webp
   ├── icon-128.webp
   ├── icon-192.webp
   ├── icon-256.webp
   └── icon-512.webp
   ```

3. The icons are configured in `capacitor.config.ts`:

   ```typescript
   import { CapacitorConfig } from '@capacitor/cli';

   const config: CapacitorConfig = {
     appId: 'com.example.app',
     appName: 'Another Angular Template',
     webDir: 'dist/ang-template-mobile',
     server: {
       androidScheme: 'https',
     },
     plugins: {
       SplashScreen: {
         launchShowDuration: 0,
       },
     },
     ios: {
       contentInset: 'always',
     },
   };

   export default config;
   ```

4. To regenerate icons after changes:
   ```bash
   npm run capacitor:sync        # Updates both platforms
   # or platform specific:
   npm run capacitor:sync:ios    # Updates iOS icons
   npm run capacitor:sync:android # Updates Android icons
   ```

> 💡 **Tip**: For the best results, provide high-resolution source icons (1024x1024 recommended) and let Capacitor handle the resizing for different platforms.

## 🔄 API Integration with Orval

### 📚 Overview

The project uses Orval to automatically generate TypeScript API clients from OpenAPI/Swagger specifications. This integration provides:

- 🔄 Automatic type generation from API schemas
- 🌐 Environment-specific API URL configuration
- 🎯 Type-safe API calls with Angular HttpClient
- 🧪 Mock data generation for testing

### 🛠️ Configuration

#### OpenAPI Schemas

Place your OpenAPI/Swagger YAML files in the `schemas/openapi/` directory. The `orval.config.ts` file automatically:

1. Scans for `.yaml` or `.yml` files
2. Generates normalized names for the API clients
3. Creates TypeScript services and models in `src/generated/api/`

Example schema structure:

```
schemas/
  openapi/
    petstore.yaml
    user-service.yaml
```

#### orval.config.ts

The configuration file handles:

- 🎯 Schema file discovery and processing
- 📁 Output path configuration for generated code
- 🔧 Client generation settings
- 🌐 Environment URL management

Key configuration features:

```typescript
export default defineConfig({
  'schemas/openapi/petstore.yaml': {
    input: {
      target: 'schemas/openapi/petstore.yaml',
    },
    output: {
      mode: 'split',
      target: './src/generated/api/petstore/service/petstore.ts',
      schemas: './src/generated/api/petstore/model',
      client: 'angular',
      mock: true,
      baseUrl: '$petstore-client$',
    },
    hooks: {
      afterAllFilesWrite: 'prettier --write',
    },
  },
  // ... other schemas
});
```

### 🌍 Environment Configuration

The configuration automatically manages API URLs in environment files:

1. Scans `src/environments/` directory
2. Updates `clientUrls` property for each API client
3. Maintains URLs across different environments

Example environment configuration:

```typescript
// environment.development.ts
export const environment = {
  production: false,
  clientUrls: {
    petstore: 'https://dev-api.example.com/petstore',
    userService: 'https://dev-api.example.com/users',
  },
};
```

### 🔀 URL Interceptor

The `clientUrlInterceptor` automatically handles API URL substitution:

1. Reads URLs from the current environment
2. Replaces placeholder URLs in API requests
3. Manages fallbacks for undefined URLs

Implementation:

```typescript
export const clientUrlInterceptor: HttpInterceptorFn = (req, next) => {
  const urls = 'clientUrls' in environment ? environment.clientUrls : undefined;

  if (urls) {
    Object.entries(urls).forEach(([key, value]) => {
      if (req.url.includes(key)) {
        req = req.clone({
          url: req.url.replace(key, value || `undefined url for ${key}`),
        });
      }
    });
  }
  return next(req);
};
```

### 🚀 Usage

1. Add your OpenAPI schema to `schemas/openapi/`
2. Run the generation command:
   ```bash
   npm run generate:api
   ```
3. Update environment files with appropriate URLs
4. Use the generated services in your components:

```typescript
import { PetService } from '@generated/api/petstore/service/pet.service';

@Component({
  // ...
})
export class PetComponent {
  constructor(private petService: PetService) {}

  getPets() {
    this.petService.getPets().subscribe((pets) => {
      // Handle the response
    });
  }
}
```

> 💡 **Tip**: The generated services are automatically injected with the correct URLs based on the current environment.

## 🧪 Testing

The project uses two testing frameworks:

### 🔬 Unit Testing with Jest

- ✅ **Unit Tests**: `npm test` - Runs Jest-based unit tests
  - Uses `jest-preset-angular` for Angular compatibility
  - Configuration in `jest.config.js`
  - Test setup in `config.jest.ts`
  - Tests are located next to their implementation files with `.spec.ts` extension

### 🎭 E2E Testing with Playwright

- 🔄 **E2E Tests**: `npm run test:e2e` - Runs end-to-end tests with Playwright
  - Modern, reliable automation testing
  - Cross-browser testing support (Chromium, Firefox, WebKit)
  - Configuration in `playwright.config.ts`
  - Tests located in `e2e/` directory with `.spec.ts` extension
  - Visual testing and debugging capabilities
  - Test report generation with `npm run test:e2e:report`

Example test file:

```typescript
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
```

> 💡 **Tip**: When writing tests, follow the AAA (Arrange-Act-Assert) pattern for better test organization and readability.

## 📝 Code Formatting & Linting

The project uses ESLint and Prettier for consistent code formatting and linting. We've configured Prettier with the TailwindCSS plugin (`prettier-plugin-tailwindcss`) which automatically sorts Tailwind CSS classes following the recommended class order. This ensures:

- 🎯 Consistent class ordering across all files
- 🔄 Automatic sorting on format
- 🚀 Better conflict resolution in version control
- ✨ Improved code readability

For example, classes will be automatically sorted from most important to least important:

```html
<!-- Before formatting -->
<div class="flex items-center bg-white p-4 hover:bg-gray-100">
  <!-- content -->
</div>

<!-- After formatting with prettier-plugin-tailwindcss -->
<div class="flex items-center bg-white p-4 hover:bg-gray-100">
  <!-- content -->
</div>
```

### IDE Configuration

For the best development experience, configure your IDE with the following settings:

#### VS Code

1. Install recommended extensions:
   - ESLint
   - Prettier
   - Angular Language Service
2. Configure Prettier as default formatter:
   ```json
   {
     "editor.defaultFormatter": "esbenp.prettier-vscode",
     "editor.formatOnSave": true,
     "editor.codeActionsOnSave": {
       "source.fixAll.eslint": true
     }
   }
   ```

#### WebStorm/IntelliJ

1. Enable Prettier:
   - Go to Settings → Languages & Frameworks → JavaScript → Prettier
   - Check "On code reformat" and "On save"
2. Enable ESLint:
   - Go to Settings → Languages & Frameworks → JavaScript → Code Quality Tools → ESLint
   - Enable "Automatic ESLint configuration"
   - Check "Run eslint --fix on save"

> 💡 **Tip**: Enabling format on save and ESLint autofix will help maintain consistent code style across the team.

## 📚 Additional Resources

- 🅰️ [Angular Documentation](https://angular.dev/) - Angular 19.2 framework docs
- 🎨 [PrimeNG Documentation](https://primeng.org/) - UI component library
- 💅 [TailwindCSS Documentation](https://tailwindcss.com/) - Utility-first CSS framework
- 📱 [Capacitor Documentation](https://capacitorjs.com/docs) - Mobile app development
- 🌐 [Transloco Documentation](https://jsverse.gitbook.io/transloco) - Internationalization library
- 🔧 [ESLint Documentation](https://eslint.org/) - Code linting
- 📝 [Prettier Documentation](https://prettier.io/) - Code formatting
- 🧪 [Jest Documentation](https://jestjs.io/) - Testing framework
- 🎭 [Playwright Documentation](https://playwright.dev/) - E2E testing framework

> 💡 **Tip**: Bookmark these resources for quick reference during development

## 👥 Contributing

1. 🌿 Create a new branch for your feature
2. ✍️ Make your changes
3. 🚀 Submit a pull request

## 📄 License

MIT License

Copyright (c) 2025 Another Angular Template

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
