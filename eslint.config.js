// @ts-check
const eslint = require('@eslint/js');
const tseslint = require('typescript-eslint');
const angular = require('angular-eslint');
const importPlugin = require('eslint-plugin-import');
const fs = require('fs');
const path = require('path');

function getFeatureFolderRules() {
  const appPath = path.join(__dirname, 'src', 'app');
  const featureFolders = fs.readdirSync(appPath).filter((folder) => {
    const stats = fs.statSync(path.join(appPath, folder));
    return stats.isDirectory() && !['shared', 'core'].includes(folder);
  });

  const rules = [];
  featureFolders.forEach((sourceFolder) => {
    featureFolders.forEach((targetFolder) => {
      if (sourceFolder !== targetFolder) {
        rules.push({
          target: `./src/app/${targetFolder}/**`,
          from: `./src/app/${sourceFolder}/**`,
          message: `Import from '${sourceFolder}' to '${targetFolder}' is not allowed. Cross-feature imports are not permitted.`,
        });
      }
    });
  });

  return rules;
}

module.exports = tseslint.config(
  {
    files: ['**/*.ts'],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
      importPlugin.flatConfigs?.recommended,
      importPlugin.flatConfigs?.typescript,
    ],
    settings: {
      'import/parsers': {
        '@typescript-eslint/parser': ['.ts', '.tsx'],
      },
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.json',
        },
        node: {
          extensions: ['.ts', '.js', '.json'],
        },
      },
    },
    processor: angular.processInlineTemplates,
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/generated/**',
    ],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case',
        },
      ],
      'import/no-restricted-paths': [
        'error',
        {
          basePath: './',
          zones: [
            // Rules for clean architecture
            {
              target: './src/app/**/domain/**',
              from: './src/app/**/application/**',
              message:
                "Import from 'application' to 'domain' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/domain/**',
              from: './src/app/**/infrastructure/**',
              message:
                "Import from 'infrastructure' to 'domain' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/domain/**',
              from: './src/app/**/presentation/**',
              message:
                "Import from 'presentation' to 'domain' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/domain/**',
              from: './src/app/**/generated/**',
              message:
                "Import from 'generated' to 'domain' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/application/**',
              from: './src/app/**/infrastructure/**',
              message:
                "Import from 'infrastructure' to 'application' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/application/**',
              from: './src/app/**/presentation/**',
              message:
                "Import from 'presentation' to 'application' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/application/**',
              from: './src/app/**/generated/**',
              message:
                "Import from 'generated' to 'application' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/presentation/**',
              from: './src/app/**/generated/**',
              message:
                "Import from 'generated' to 'presentation' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/presentation/**',
              from: './src/app/**/infrastructure/**',
              message:
                "Import from 'infrastructure' to 'presentation' is not allowed. It breaks the architecture.",
            },
            {
              target: './src/app/**/infrastructure/**',
              from: './src/app/**/presentation/**',
              message:
                "Import from 'presentation' to 'infrastructure' is not allowed. It breaks the architecture.",
            },
            // Rules for feature folders
            ...getFeatureFolderRules(),
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.html'],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  },
);
