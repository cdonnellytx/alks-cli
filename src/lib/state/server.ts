import { isEmpty } from 'underscore';
import { log } from '../log';
import { getDeveloper, updateDeveloper } from './developer';

const SERVER_ENV_VAR_NAME = 'ALKS_SERVER';

export async function getServer() {
  const serverFromEnv = process.env[SERVER_ENV_VAR_NAME];
  if (!isEmpty(serverFromEnv)) {
    log('using server url from environment variable');
    return serverFromEnv;
  }

  const developer = await getDeveloper();
  if (developer.server) {
    log('using stored server url');
    return developer.server;
  }

  throw new Error(
    'ALKS CLI is not configured. Please run: alks developer configure'
  );
}

export async function setServer(server: string) {
  await updateDeveloper({ server });
}
