import clc from 'cli-color';
import commander from 'commander';
import { checkForUpdate } from '../checkForUpdate';
import { errorAndExit } from '../errorAndExit';
import { getDeveloper } from '../getDeveloper';
import { getPassword } from '../getPassword';
import { getToken } from '../getToken';
import { log } from '../log';
import { trackActivity } from '../trackActivity';
import Table from 'cli-table3';
import { contains, each, isEmpty } from 'underscore';

export async function handleAlksDeveloperInfo(
  _options: commander.OptionValues,
  _program: commander.Command
) {
  const table = new Table({
    head: [clc.white.bold('Key'), clc.white.bold('Value')],
    colWidths: [25, 50],
  });

  try {
    log('getting developer');
    const developer = await getDeveloper();

    log('getting password');
    const password = await getPassword(null); // null means dont prompt

    log('getting 2fa token');
    const token = await getToken();

    const ignores = ['lastVersion'];
    const mapping: Record<string, string> = {
      server: 'ALKS Server',
      userid: 'Network Login',
      alksAccount: 'Default ALKS Account',
      alksRole: 'Default ALKS Role',
      outputFormat: 'Default Output Format',
    };

    each(developer, (val, key) => {
      if (!contains(ignores, key)) {
        table.push([mapping[key], isEmpty(val) ? '' : val]);
      }
    });

    const tablePassword = !isEmpty(password)
      ? '**********'
      : clc.red('NOT SET');
    table.push(['Password', tablePassword]);

    const tableToken = !isEmpty(token)
      ? token.substring(0, 4) + '**********'
      : clc.red('NOT SET');
    table.push(['2FA Token', tableToken]);

    console.error(clc.white.underline.bold('\nDeveloper Configuration'));
    console.log(clc.white(table.toString()));

    log('checking for update');
    await checkForUpdate();
    await trackActivity();
  } catch (err) {
    errorAndExit(err.message, err);
  }
}
