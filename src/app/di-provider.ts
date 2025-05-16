import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { TASKS_CLIENT } from './task/application/ports/tasks-client.port';
import { TasksAPIClient } from './task/infrastructure/tasks-client/tasks-api-client.service';

export const provideDI = (): EnvironmentProviders => {
  return makeEnvironmentProviders([
    { provide: TASKS_CLIENT, useClass: TasksAPIClient },
  ]);
};
