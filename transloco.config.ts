import { TranslocoGlobalConfig } from '@jsverse/transloco-utils';

const config: TranslocoGlobalConfig = {
  rootTranslationsPath: 'public/i18n/',
  langs: ['en', 'es'],
  keysManager: {
    addMissingKeys: true,
    unflat: true,
  },
};

export default config;
