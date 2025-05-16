import { ConfigExternal, defineConfig } from 'orval';
import { readdirSync, readFileSync, writeFileSync } from 'fs';

// Function to convert file names to camelCase
// This is useful for generating consistent file names from schema files
export const normalizeFileName = (fileName: string): string => {
  return fileName
    .toLowerCase()
    .replace(/[^a-z0-9]+(.)/g, (_, char) => char.toUpperCase())
    .replace(/^[A-Z]/, (c) => c.toLowerCase());
};

// Read all YAML files from the schemas directory
// and generate an array of tuples containing the normalized file name and its path
export const schemaFiles = readdirSync('./schemas/openapi')
  .filter((file) => file.endsWith('.yaml') || file.endsWith('.yml'))
  .map(
    (file) =>
      [
        normalizeFileName(file.replace(/\.(yaml|yml)$/, '')),
        `./schemas/openapi/${file}`,
      ] as [string, string],
  );

// Generate an array of imports for each schema file
// Each import includes the input target, output target, and hooks
const schemaImports = schemaFiles.map((file) => ({
  input: {
    target: file[1],
  },
  output: {
    mode: 'split',
    target: `./src/generated/api/${file[0]}/service/${file[0]}.ts`,
    schemas: `./src/generated/api/${file[0]}/model`,
    client: 'angular',
    mock: true,
    baseUrl: `$${file[0]}-client$`,
    override: {
      components: {
        schemas: {
          suffix: 'DTO',
          mode: 'split',
        },
      },
    },
  },
  hooks: {
    afterAllFilesWrite: 'prettier --write',
  },
}));

// Read all environment files from the environments directory
// and update the clientUrls property for each environment
const environments = readdirSync('./src/environments')
  .filter((file) => file.endsWith('.ts'))
  .map((file) => file.replace('.ts', ''));

// For each environment file, read its content, parse it as an object,
// and update the clientUrls property with the URLs for each schema file
environments.forEach((env) => {
  const environment = readFileSync(`./src/environments/${env}.ts`);
  const environmentContent = environment
    .toString()
    .replace(/export const environment = /, '')
    .replace(/;$/, '');

  try {
    const environmentObject = new Function(`return ${environmentContent}`)();

    if (typeof environmentObject === 'object' && environmentObject !== null) {
      environmentObject.clientUrls = {
        ...environmentObject.clientUrls,
        ...Object.fromEntries(
          schemaFiles
            .filter((file) => !environmentObject.clientUrls?.[file[0]])
            .map((file) => [file[0], null]),
        ),
      };

      const existingClientUrls = Object.keys(
        environmentObject.clientUrls || {},
      );
      const schemaNames = schemaFiles.map((file) => file[0]);
      const unusedClientUrls = existingClientUrls.filter(
        (url) => !schemaNames.includes(url),
      );

      if (unusedClientUrls.length > 0) {
        console.warn(
          `‼️  Warning: Found unused clientUrls in ${env}: ${unusedClientUrls.join(', ')}`,
        );
      }

      const updatedEnvironment = `export const environment = ${JSON.stringify(environmentObject, null, 2)};`;
      writeFileSync(`./src/environments/${env}.ts`, updatedEnvironment);
    }
  } catch (error) {
    console.error(`Error processing environment ${env}:`, error);
  }
});

// Define the configuration for Orval using the schema imports
// Each schema import is added to the configuration with its input, output, and hooks
export default defineConfig(
  schemaImports.reduce(
    (acc, { input, output, hooks }) => ({
      ...acc,
      [input.target]: {
        input,
        output,
        hooks,
      },
    }),
    {} as ConfigExternal,
  ) as ConfigExternal,
);
