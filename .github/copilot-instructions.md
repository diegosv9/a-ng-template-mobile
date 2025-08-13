# Another Angular Template (Mobile)

Another Angular Template is an Angular 19.2-based web and mobile application with Capacitor integration for native mobile platforms. The project features PrimeNG UI components, TailwindCSS styling, internationalization, and comprehensive testing.

Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.

## Working Effectively

### Initial Setup & Dependencies
- **CRITICAL**: Use Node.js v22.15.0 as specified in `.nvmrc`. Current environment uses v20.19.4 which works but may cause compatibility issues.
- Install dependencies: `npm install` -- takes 4 minutes. NEVER CANCEL. Set timeout to 10+ minutes.
- **API Generation Required**: Always run `npm run generate:api` before building -- takes 2 seconds. This generates API clients from OpenAPI schemas.

### Build Process  
- Build the application: `npm run build` -- takes 9 seconds. NEVER CANCEL. Set timeout to 30+ minutes.
- **WARNING**: Build produces bundle size warning (686.04 kB vs 500 kB budget) - this is expected and non-blocking.
- Build output goes to `dist/a-ng-template/`

### Testing
- **Unit Tests**: `npm test` -- takes 7.5 seconds. NEVER CANCEL. Set timeout to 15+ minutes.
  - Uses Jest with jest-preset-angular
  - Tests run successfully with some deprecation warnings (expected)
  - Tests located next to implementation files with `.spec.ts` extension
- **E2E Tests**: `npm run test:e2e` -- requires browser installation first
  - **CRITICAL**: Must run `npx playwright install` before first E2E test run -- takes 45+ minutes in CI environments. NEVER CANCEL. Set timeout to 90+ minutes.
  - E2E tests may fail due to browser download issues in restricted environments
  - Test report: `npm run test:e2e:report`

### Development Server
- Start development server: `npm start` -- ready in 8 seconds
  - Runs on `http://localhost:4200/`
  - Hot Module Replacement (HMR) enabled
  - Application shows task management interface
  - Backend API calls will fail (expected - no backend server)

### Code Quality
- **Linting**: `npm run lint` -- takes 5.5 seconds. Always run before committing.
- **Formatting**: 
  - Check: `npm run prettier:check` -- takes 1.5 seconds
  - Fix: `npm run prettier:write` -- auto-sorts TailwindCSS classes
- **Pre-commit hook**: `npm run husky:pre-commit` -- runs lint + prettier check, takes 7 seconds
- **Pre-push hook**: `npm run husky:pre-push` -- runs all tests (unit + E2E)

### Mobile Development (Capacitor)
- **Sync both platforms**: `npm run capacitor:sync` -- takes 10 seconds (includes build)
- **Android only**: `npm run capacitor:sync:android`
- **iOS only**: `npm run capacitor:sync:ios` 
- **Asset generation**: `npm run capacitor:assets:generate`
- **Note**: iOS operations show warnings about missing CocoaPods/Xcode (expected in non-macOS environments)

### API Development (Orval)
- **Generate API clients**: `npm run generate:api` -- takes 2 seconds
- OpenAPI schemas in `schemas/openapi/` (currently: `tasks.yaml`)
- Generated clients in `src/generated/api/`
- Environment URLs configured in `src/environments/`

### Internationalization (Transloco)
- **Extract translation keys**: `npm run i18n:extract` -- takes 2 seconds
- **Find missing keys**: `npm run i18n:find` -- takes 1.5 seconds
- Translation files in `public/i18n/`
- Currently supports English (en) and Spanish (es)

## Manual Validation Scenarios

**ALWAYS** run through these scenarios after making changes:

1. **Complete Development Workflow**:
   ```bash
   npm install && npm run generate:api && npm run build && npm test
   ```

2. **Development Server Testing**:
   - Start server: `npm start`
   - Navigate to `http://localhost:4200/`
   - Verify: Task list page loads with input field and add button
   - Test: Enter text in "Add a new task" field and click add button
   - Expected: API error (connection refused) - this is normal without backend

3. **Code Quality Validation**:
   - Run: `npm run husky:pre-commit`
   - Verify: All linting and formatting checks pass

4. **Mobile Build Testing**:
   - Run: `npm run capacitor:sync`
   - Verify: Build completes and syncs to both platforms

## Critical Warnings & Timing

- **NEVER CANCEL** any build or install commands
- **npm install**: 4 minutes - use 10+ minute timeout
- **npm run build**: 9 seconds - use 30+ minute timeout for safety
- **npm test**: 7.5 seconds - use 15+ minute timeout
- **npx playwright install**: 45+ minutes - use 90+ minute timeout
- **npm run capacitor:sync**: 10 seconds - use 30+ minute timeout

## Project Structure

```
src/
├── app/
│   ├── core/                 # Core module with global services
│   ├── shared/               # Shared components, services, interceptors
│   │   ├── components/       # Reusable UI components (theme-selector, theme-toggle)
│   │   ├── services/         # Shared services (local storage, transloco loader)
│   │   └── interceptors/     # HTTP interceptors (client URL interceptor)
│   ├── task/                 # Task feature module (Clean Architecture)
│   │   ├── application/      # Use cases and application services
│   │   ├── domain/           # Domain entities and interfaces
│   │   ├── infrastructure/   # External adapters (API clients, mappers)
│   │   └── presentation/     # UI components and pages
│   ├── app.component.ts      # Root component
│   ├── app.config.ts         # App configuration and providers
│   ├── app.routes.ts         # Route definitions
│   └── di-provider.ts        # Dependency injection providers
├── environments/             # Environment configurations (dev/prod)
├── themes/                   # Custom PrimeNG themes
└── generated/                # Auto-generated API clients (from Orval)
```

## Common Issues & Solutions

1. **Build Failure**: "Cannot find module 'src/generated/api/tasks/model'"
   - **Solution**: Run `npm run generate:api` first

2. **E2E Test Failure**: "Executable doesn't exist"
   - **Solution**: Run `npx playwright install` (takes 45+ minutes)

3. **API Connection Refused**: Expected when no backend server is running
   - **Frontend validation**: Application should still render and accept input

4. **Bundle Size Warning**: Expected behavior, application builds successfully

## Technology Stack Reference

- **Framework**: Angular 19.2.10
- **Mobile**: Capacitor 7.2.0  
- **UI**: PrimeNG 19.1.2 + TailwindCSS 4.1.5
- **Testing**: Jest 29.7.0 + Playwright 1.52.0
- **i18n**: Transloco 7.6.1
- **API Generation**: Orval 7.9.0
- **Code Quality**: ESLint + Prettier + Husky

Always check the `package.json` scripts section for the complete list of available commands.