import * as fs from 'fs';
import iso from 'iso-3166-1';

describe(`get-flag-svgs`, () => {
  afterEach(() => {
    fs.rmdirSync('tmp', { recursive: true });
  });

  it(`Should download icons to the specified location at the specified width`, async () => {
    await runCommand('get-flag-svgs --destination=tmp');

    expect(fs.existsSync('tmp')).toEqual(true);

    iso
      .all()
      .map(({ alpha2 }) => alpha2.toLowerCase())
      .forEach(code => expect(fs.existsSync(`tmp/${code}.svg`)).toEqual(true));
  });
});

/**
 * Programmatically set arguments and execute the CLI script
 */
async function runCommand(args: string): Promise<unknown> {
  // return exec(`node dist/index.js ${args}`);
  process.argv = [
    'node', // Not used but a value is required at this index in the array
    'cli.js', // Not used but a value is required at this index in the array
    ...args.split(' '),
  ];

  // Require the yargs CLI script
  return import('../src/index');
}
