module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/config.jest.ts'],
  moduleNameMapper: {
    '@app/(.*)': '<rootDir>/src/app/$1',
    '@src/(.*)': '<rootDir>/src/$1',
    'src/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['./node_modules/', './e2e/'],
};
